/**
 * Cloudflare Worker entry point for Earlnis Portfolio contact form.
 * Handles OTP generation, verification, rate limiting, and Resend delivery.
 */

import { validateInquiryInput, checkOrigin, getCorsHeaders } from './validation.js';
import { generateOtp, saveOtp, verifyOtp, checkRateLimit } from './otp.js';
import { sendOtpEmail, sendInquiryEmail } from './email.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const corsHeaders = getCorsHeaders(request, env.ALLOWED_ORIGIN);

    // 1. Handle CORS Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // 2. Enforce Authorized Origin
    if (!checkOrigin(request, env.ALLOWED_ORIGIN)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized origin.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 3. Route Handlers
    try {
      if (url.pathname === '/api/send-code' && request.method === 'POST') {
        return await handleSendCode(request, env, corsHeaders);
      }

      if (url.pathname === '/api/verify-and-send' && request.method === 'POST') {
        return await handleVerifyAndSend(request, env, corsHeaders);
      }

      return new Response(
        JSON.stringify({ success: false, error: 'Not found.' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (err) {
      console.error('Unhandled Worker error:', err.message);
      return new Response(
        JSON.stringify({
          success: false,
          error: err.message || 'An internal error occurred. Please try again or email directly.'
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  }
};

/**
 * POST /api/send-code
 */
async function handleSendCode(request, env, corsHeaders) {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid JSON body.' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const validation = validateInquiryInput(body);
  if (!validation.valid) {
    return new Response(
      JSON.stringify({ success: false, error: validation.error }),
      { status: validation.status || 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const { name, email } = validation.data;
  const clientIp = request.headers.get('cf-connecting-ip') || 'unknown-ip';

  // Rate Limiting by IP and by Email
  const ipCheck = await checkRateLimit(env.CONTACT_OTP, `ip:${clientIp}`);
  if (!ipCheck.allowed) {
    return new Response(
      JSON.stringify({ success: false, error: ipCheck.error }),
      { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const emailCheck = await checkRateLimit(env.CONTACT_OTP, `email:${email}`);
  if (!emailCheck.allowed) {
    return new Response(
      JSON.stringify({ success: false, error: emailCheck.error }),
      { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Generate & Save OTP (SHA-256 hashed in KV)
  const otp = generateOtp();
  await saveOtp(env.CONTACT_OTP, email, otp);

  // Send OTP to visitor via Resend
  await sendOtpEmail({
    apiKey: env.RESEND_API_KEY,
    toEmail: email,
    name,
    otp,
    fromAddress: env.FROM_EMAIL
  });

  return new Response(
    JSON.stringify({
      success: true,
      message: `A 6-digit verification code has been sent to ${email}.`,
      expiresInSeconds: 600
    }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

/**
 * POST /api/verify-and-send
 */
async function handleVerifyAndSend(request, env, corsHeaders) {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid JSON body.' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const validation = validateInquiryInput(body);
  if (!validation.valid) {
    return new Response(
      JSON.stringify({ success: false, error: validation.error }),
      { status: validation.status || 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const inputOtp = String(body.otp ?? '').trim();
  if (!inputOtp || !/^\d{6}$/.test(inputOtp)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Please enter the 6-digit verification code.' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const { name, email, subject, message } = validation.data;

  // Verify OTP against KV
  const otpResult = await verifyOtp(env.CONTACT_OTP, email, inputOtp);
  if (!otpResult.valid) {
    return new Response(
      JSON.stringify({ success: false, error: otpResult.error }),
      { status: otpResult.status || 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Deliver verified message to owner's Gmail with visitor email as Reply-To
  await sendInquiryEmail({
    apiKey: env.RESEND_API_KEY,
    ownerEmail: env.OWNER_EMAIL || 'earlypajo@gmail.com',
    visitorName: name,
    visitorEmail: email,
    subject,
    message,
    fromAddress: env.FROM_EMAIL
  });

  return new Response(
    JSON.stringify({
      success: true,
      message: 'Your inquiry has been verified and sent directly to Earl.'
    }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
