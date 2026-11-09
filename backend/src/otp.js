/**
 * Cryptographic OTP generation, secure hashing, rate limiting, and verification logic.
 */

const OTP_TTL_SECONDS = 600; // 10 minutes
const MAX_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW_SECONDS = 600; // 10 minutes
const MAX_SEND_REQUESTS = 3; // Max 3 code requests per window per email/IP

export function generateOtp() {
  const buffer = new Uint32Array(1);
  crypto.getRandomValues(buffer);
  // Generate a uniform 6-digit code: 100000 to 999999
  const otp = (100000 + (buffer[0] % 900000)).toString();
  return otp;
}

export function generateSalt() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export async function hashOtp(email, otp, salt) {
  const payload = `${email.toLowerCase()}:${otp}:${salt}`;
  const encoded = new TextEncoder().encode(payload);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(hashBuffer), (b) => b.toString(16).padStart(2, '0')).join('');
}

export async function checkRateLimit(kv, identifier) {
  if (!kv) return { allowed: true };
  const key = `ratelimit:${identifier}`;
  const current = await kv.get(key);
  const count = current ? parseInt(current, 10) : 0;

  if (count >= MAX_SEND_REQUESTS) {
    return {
      allowed: false,
      error: 'Too many verification code requests. Please wait 10 minutes before requesting again.'
    };
  }

  await kv.put(key, (count + 1).toString(), { expirationTtl: RATE_LIMIT_WINDOW_SECONDS });
  return { allowed: true };
}

export async function saveOtp(kv, email, otp) {
  if (!kv) {
    throw new Error('Cloudflare KV binding "CONTACT_OTP" is missing or unconfigured.');
  }

  const salt = generateSalt();
  const hash = await hashOtp(email, otp, salt);

  const record = {
    hash,
    salt,
    attempts: 0,
    createdAt: Date.now()
  };

  const key = `otp:${email.toLowerCase()}`;
  await kv.put(key, JSON.stringify(record), { expirationTtl: OTP_TTL_SECONDS });
}

export async function verifyOtp(kv, email, inputOtp) {
  if (!kv) {
    throw new Error('Cloudflare KV binding "CONTACT_OTP" is missing or unconfigured.');
  }

  const key = `otp:${email.toLowerCase()}`;
  const raw = await kv.get(key);

  if (!raw) {
    return {
      valid: false,
      error: 'Verification code expired or not found. Please request a new code.',
      status: 400
    };
  }

  let record;
  try {
    record = JSON.parse(raw);
  } catch {
    await kv.delete(key);
    return { valid: false, error: 'Invalid verification record.', status: 400 };
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    await kv.delete(key);
    return {
      valid: false,
      error: 'Too many failed attempts. This code has been invalidated. Please request a new code.',
      status: 429
    };
  }

  const computedHash = await hashOtp(email, inputOtp.trim(), record.salt);

  if (computedHash !== record.hash) {
    record.attempts += 1;
    const remaining = MAX_ATTEMPTS - record.attempts;

    if (remaining <= 0) {
      await kv.delete(key);
      return {
        valid: false,
        error: 'Too many failed attempts. Code has been invalidated. Please request a new one.',
        status: 429
      };
    }

    // Update attempts count with remaining TTL
    const elapsed = Math.floor((Date.now() - record.createdAt) / 1000);
    const ttl = Math.max(60, OTP_TTL_SECONDS - elapsed);
    await kv.put(key, JSON.stringify(record), { expirationTtl: ttl });

    return {
      valid: false,
      error: `Incorrect verification code. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`,
      status: 400
    };
  }

  // Verification succeeded: delete OTP immediately to prevent replay / reuse
  await kv.delete(key);
  return { valid: true };
}
