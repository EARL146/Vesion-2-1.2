/**
 * Input sanitization, validation rules, and origin verification.
 */

const CTRL_SINGLE_LINE = new RegExp('[\\u0000-\\u001F\\u007F]', 'g');
const CTRL_MULTI_LINE = new RegExp('[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F]', 'g');
const BIDI_CHARS = new RegExp('[\\u200B-\\u200F\\u202A-\\u202E\\u2060\\uFEFF]', 'g');

export function sanitizeText(value, multiline = false) {
  const ctrl = multiline ? CTRL_MULTI_LINE : CTRL_SINGLE_LINE;
  return String(value ?? '').replace(ctrl, '').replace(BIDI_CHARS, '').trim();
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const clean = email.trim().toLowerCase();
  if (clean.length < 5 || clean.length > 254) return false;
  return EMAIL_REGEX.test(clean);
}

export function validateInquiryInput({ name, email, subject, message, website }) {
  // Honeypot check: automated bots will often fill hidden input fields
  if (website && String(website).trim().length > 0) {
    return { valid: false, error: 'Spam detected.', status: 400 };
  }

  const cleanName = sanitizeText(name);
  if (!cleanName || cleanName.length < 2 || cleanName.length > 100) {
    return { valid: false, error: 'Please enter your full name (2-100 characters).', status: 400 };
  }

  const cleanEmail = sanitizeText(email).toLowerCase();
  if (!validateEmail(cleanEmail)) {
    return { valid: false, error: 'Please enter a valid email address.', status: 400 };
  }

  const cleanSubject = sanitizeText(subject);
  if (!cleanSubject || cleanSubject.length < 2 || cleanSubject.length > 150) {
    return { valid: false, error: 'Please enter a subject (2-150 characters).', status: 400 };
  }

  const cleanMessage = sanitizeText(message, true);
  if (!cleanMessage || cleanMessage.length < 10 || cleanMessage.length > 5000) {
    return { valid: false, error: 'Please enter a message (10-5000 characters).', status: 400 };
  }

  return {
    valid: true,
    data: {
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage
    }
  };
}

export function checkOrigin(request, allowedOrigin) {
  const origin = request.headers.get('Origin');
  if (!origin) return true; // Non-browser / same-origin

  const allowed = [
    allowedOrigin,
    'https://earlnis.dev',
    'https://www.earlnis.dev',
    'http://localhost:3000',
    'http://localhost:5173'
  ].filter(Boolean);

  return allowed.includes(origin);
}

export function getCorsHeaders(request, allowedOrigin) {
  const origin = request.headers.get('Origin') || allowedOrigin || 'https://earlnis.dev';
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Max-Age': '86400'
  };
}
