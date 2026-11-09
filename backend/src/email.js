/**
 * Resend email delivery service.
 * Handles visitor OTP dispatch and verified inquiry delivery to owner's Gmail.
 */

const RESEND_API_URL = 'https://api.resend.com/emails';

export async function sendOtpEmail({ apiKey, toEmail, name, otp, fromAddress }) {
  if (!apiKey) {
    throw new Error('Secret "RESEND_API_KEY" is missing.');
  }

  // Use custom domain or fallback to Resend's default onboarding sender
  const sender = fromAddress || 'Earlnis Portfolio <onboarding@resend.dev>';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Code</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f8fb; margin: 0; padding: 24px;">
  <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e9f0; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
    <div style="background: #0B1120; padding: 28px 24px; text-align: center;">
      <h1 style="color: #ffffff; font-size: 20px; margin: 0; font-weight: 700;">Earlnis Willan Pajo · Portfolio</h1>
      <p style="color: #94a3b8; font-size: 13px; margin: 6px 0 0;">Email Verification</p>
    </div>
    <div style="padding: 32px 28px; text-align: center;">
      <p style="font-size: 15px; color: #1e293b; margin: 0 0 16px; line-height: 1.5;">
        Hello <strong>${escapeHtml(name)}</strong>,
      </p>
      <p style="font-size: 14px; color: #475569; margin: 0 0 24px; line-height: 1.5;">
        To protect against spam and ensure we can reply to you directly, please enter the following 6-digit verification code:
      </p>
      <div style="background: #f1f5f9; border-radius: 12px; padding: 18px; margin: 0 auto 24px; display: inline-block; letter-spacing: 0.3em; font-family: monospace; font-size: 32px; font-weight: 700; color: #0f172a; border: 1px solid #cbd5e1;">
        ${otp}
      </div>
      <p style="font-size: 12.5px; color: #64748b; margin: 0 0 8px;">
        ⏱️ This code will expire in <strong>10 minutes</strong>.
      </p>
      <p style="font-size: 12px; color: #94a3b8; margin: 0;">
        If you did not request this inquiry on <a href="https://earlnis.dev" style="color: #3b82f6; text-decoration: none;">earlnis.dev</a>, you can safely ignore this email.
      </p>
    </div>
  </div>
</body>
</html>
  `;

  const res = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: sender,
      to: [toEmail],
      subject: `Your Verification Code: ${otp}`,
      html,
      text: `Hello ${name},\n\nYour portfolio verification code is: ${otp}\nThis code will expire in 10 minutes.\n\nEarlnis Portfolio (earlnis.dev)`
    })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Resend API error (${res.status}): ${errorText}`);
  }

  return await res.json();
}

export async function sendInquiryEmail({ apiKey, ownerEmail, visitorName, visitorEmail, subject, message, fromAddress }) {
  if (!apiKey) {
    throw new Error('Secret "RESEND_API_KEY" is missing.');
  }

  const recipient = ownerEmail || 'earlypajo@gmail.com';
  const sender = fromAddress || 'Earlnis Contact <onboarding@resend.dev>';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Verified Inquiry</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f8fb; margin: 0; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e9f0; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
    <div style="background: #0B1120; padding: 24px; color: #ffffff;">
      <span style="background: rgba(34, 197, 94, 0.2); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.4); padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; letter-spacing: 0.05em; display: inline-block; margin-bottom: 8px;">
        ✓ VERIFIED EMAIL
      </span>
      <h2 style="margin: 0; font-size: 20px; color: #ffffff;">${escapeHtml(subject)}</h2>
      <p style="margin: 6px 0 0; color: #94a3b8; font-size: 13px;">Inquiry received via earlnis.dev</p>
    </div>
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 110px;"><strong>Sender Name:</strong></td>
          <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${escapeHtml(visitorName)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-size: 13px;"><strong>Sender Email:</strong></td>
          <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">
            <a href="mailto:${encodeURIComponent(visitorEmail)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(visitorEmail)}</a>
            <span style="color: #16a34a; font-size: 12px; margin-left: 6px;">(Verified via OTP)</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-size: 13px;"><strong>Date:</strong></td>
          <td style="padding: 8px 0; color: #475569; font-size: 13px;">${new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })} (PHT)</td>
        </tr>
      </table>

      <div style="border-top: 1px solid #e2e8f0; padding-top: 18px;">
        <h3 style="margin: 0 0 10px; font-size: 13px; color: #64748b; letter-spacing: 0.05em; text-transform: uppercase;">Message:</h3>
        <div style="background: #f8fafc; border-radius: 12px; padding: 16px; border: 1px solid #e2e8f0; color: #1e293b; font-size: 14.5px; line-height: 1.6; white-space: pre-wrap;">
${escapeHtml(message)}
        </div>
      </div>

      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f1f5f9; text-align: center;">
        <a href="mailto:${encodeURIComponent(visitorEmail)}?subject=${encodeURIComponent('Re: ' + subject)}" style="display: inline-block; background: #0B1120; color: #ffffff; font-size: 13px; font-weight: 600; padding: 10px 22px; border-radius: 999px; text-decoration: none;">
          Reply to ${escapeHtml(visitorName)} (${escapeHtml(visitorEmail)})
        </a>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  const res = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: sender,
      to: [recipient],
      reply_to: visitorEmail,
      subject: `[Verified Portfolio] ${subject} - from ${visitorName}`,
      html,
      text: `Verified Inquiry from ${visitorName} (${visitorEmail})\n\nSubject: ${subject}\n\nMessage:\n${message}`
    })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Resend API error (${res.status}): ${errorText}`);
  }

  return await res.json();
}

function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
