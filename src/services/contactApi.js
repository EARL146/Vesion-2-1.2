/**
 * API service for communicating with the Cloudflare Worker backend.
 */

const API_BASE_URL = (
  import.meta.env.VITE_CONTACT_API_URL ||
  'https://earlnis-contact-worker.shizunyan0146.workers.dev'
).replace(/\/+$/, '');

export async function sendVerificationCode({ name, email, subject, message, website }) {
  const res = await fetch(`${API_BASE_URL}/api/send-code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      subject,
      message,
      website: website || ''
    })
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) {
    throw new Error(data.error || `Failed to send code (${res.status}).`);
  }

  return data;
}

export async function verifyAndSendInquiry({ name, email, subject, message, otp, website }) {
  const res = await fetch(`${API_BASE_URL}/api/verify-and-send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      subject,
      message,
      otp,
      website: website || ''
    })
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) {
    throw new Error(data.error || `Verification failed (${res.status}).`);
  }

  return data;
}
