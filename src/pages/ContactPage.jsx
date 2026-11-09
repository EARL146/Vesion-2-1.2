import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  Send,
  Mail,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Loader2,
  Sparkles,
  Linkedin,
  Github,
  Code2,
  KeyRound,
  ArrowLeft,
  RotateCw
} from 'lucide-react';
import { PROFILE, FAQS } from '../data/site';
import { verifyEmailAccount } from '../lib/emailVerify';
import { sendVerificationCode, verifyAndSendInquiry } from '../services/contactApi';

const MAX_NAME = 80;
const MAX_EMAIL = 254;
const MAX_SUBJECT = 150;
const MAX_MESSAGE = 5000;
const RESEND_COOLDOWN_SEC = 60;

const CTRL_SINGLE_LINE = new RegExp('[\\u0000-\\u001F\\u007F]', 'g');
const CTRL_MULTI_LINE = new RegExp('[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F]', 'g');
const BIDI_CHARS = new RegExp('[\\u200B-\\u200F\\u202A-\\u202E\\u2060\\uFEFF]', 'g');

function sanitizeText(value, multiline = false) {
  const ctrl = multiline ? CTRL_MULTI_LINE : CTRL_SINGLE_LINE;
  return String(value ?? '').replace(ctrl, '').replace(BIDI_CHARS, '');
}

const ArrowUpRightIcon = ({ size = 15, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

export default function ContactPage() {
  const [openIdx, setOpenIdx] = useState(0);

  // Form fields
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  // Flow stage: 'compose' | 'verify' | 'done'
  const [stage, setStage] = useState('compose');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [shakeKey, setShakeKey] = useState(0);

  // Cooldown countdown for resending code
  const [cooldown, setCooldown] = useState(0);

  // Live DNS-over-HTTPS real-email check
  const [emailState, setEmailState] = useState({
    status: 'idle', // 'idle' | 'checking' | 'valid' | 'typo' | 'invalid'
    message: '',
    suggestion: '',
    mx: ''
  });

  // Cooldown timer interval
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((c) => Math.max(0, c - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  // Real-time email validation
  useEffect(() => {
    const raw = form.email.trim();
    if (!raw) {
      setEmailState({ status: 'idle', message: '', suggestion: '', mx: '' });
      return;
    }

    let cancelled = false;
    setEmailState((prev) => ({
      ...prev,
      status: 'checking',
      message: 'Checking mail server...'
    }));

    const timer = setTimeout(async () => {
      const res = await verifyEmailAccount(raw);
      if (cancelled) return;
      if (res.valid) {
        setEmailState({
          status: 'valid',
          message: res.message,
          suggestion: '',
          mx: res.mx || ''
        });
      } else if (res.suggestion) {
        setEmailState({
          status: 'typo',
          message: res.reason,
          suggestion: res.suggestion,
          mx: ''
        });
      } else {
        setEmailState({
          status: 'invalid',
          message: res.reason,
          suggestion: '',
          mx: ''
        });
      }
    }, 320);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [form.email]);

  const handleApplySuggestion = () => {
    if (!emailState.suggestion) return;
    setForm((prev) => ({ ...prev, email: emailState.suggestion }));
    setErrorMsg('');
  };

  /**
   * STAGE 1: Request OTP verification code
   */
  const handleRequestCode = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const trap = String(formData.get('website') ?? '');
    if (trap) return; // bot detected

    const firstName = sanitizeText(form.firstName).trim().slice(0, MAX_NAME);
    const lastName = sanitizeText(form.lastName).trim().slice(0, MAX_NAME);
    const fullName = `${firstName} ${lastName}`.trim();
    const email = sanitizeText(form.email).trim().toLowerCase().slice(0, MAX_EMAIL);
    const subject = sanitizeText(form.subject).trim().slice(0, MAX_SUBJECT);
    const message = sanitizeText(form.message, true).trim().slice(0, MAX_MESSAGE);

    if (!firstName || !lastName || !email || !subject || !message) {
      setErrorMsg('Please fill in your name, email, subject, and message.');
      setShakeKey((k) => k + 1);
      return;
    }

    const emailCheck = await verifyEmailAccount(email);
    if (!emailCheck.valid) {
      setEmailState({
        status: emailCheck.suggestion ? 'typo' : 'invalid',
        message: emailCheck.reason,
        suggestion: emailCheck.suggestion || '',
        mx: ''
      });
      setErrorMsg(emailCheck.reason || 'Please enter a valid email address.');
      setShakeKey((k) => k + 1);
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      await sendVerificationCode({
        name: fullName,
        email,
        subject,
        message,
        website: trap
      });
      setStage('verify');
      setOtp('');
      setCooldown(RESEND_COOLDOWN_SEC);
    } catch (err) {
      setErrorMsg(err.message || 'Could not send verification code. Please try again.');
      setShakeKey((k) => k + 1);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Resend OTP code
   */
  const handleResendCode = async () => {
    if (cooldown > 0 || loading) return;
    setLoading(true);
    setErrorMsg('');

    const fullName = `${form.firstName} ${form.lastName}`.trim();
    try {
      await sendVerificationCode({
        name: fullName,
        email: form.email.trim().toLowerCase(),
        subject: form.subject.trim(),
        message: form.message.trim()
      });
      setCooldown(RESEND_COOLDOWN_SEC);
      setErrorMsg('');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to resend code.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * STAGE 2: Verify OTP and deliver message to Gmail
   */
  const handleVerifyAndSend = async (e) => {
    e.preventDefault();
    const cleanOtp = otp.trim();

    if (!cleanOtp || !/^\d{6}$/.test(cleanOtp)) {
      setErrorMsg('Please enter the 6-digit verification code.');
      setShakeKey((k) => k + 1);
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const fullName = `${form.firstName} ${form.lastName}`.trim();
    try {
      await verifyAndSendInquiry({
        name: fullName,
        email: form.email.trim().toLowerCase(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        otp: cleanOtp
      });
      setStage('done');
    } catch (err) {
      setErrorMsg(err.message || 'Verification failed. Please check the code and try again.');
      setShakeKey((k) => k + 1);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ firstName: '', lastName: '', email: '', subject: '', message: '' });
    setOtp('');
    setErrorMsg('');
    setEmailState({ status: 'idle', message: '', suggestion: '', mx: '' });
    setStage('compose');
  };

  return (
    <section className="page-view page-contact" aria-labelledby="contact-title">
      <header className="view__head">
        <span className="view__eyebrow">FAQs / Contact</span>
        <h1 className="view__title" id="contact-title">
          Work worth doing. Tools worth building.
        </h1>
        <p className="view__lede">
          Tell me what you want to build. Share a short outline and I will reply with a realistic plan.
        </p>
      </header>

      <div className="sweep-glass cgrid__shell">
        {/* Left Dark Navy FAQ Card */}
        <aside className="cgrid__aside" aria-labelledby="contact-faq">
          <div className="cgrid__aside-head">
            <span className="cgrid__eyebrow">FAQs</span>
            <h2 className="cgrid__aside-title" id="contact-faq">
              <strong>Quick answers.</strong>
              <span>Still have one? Write below.</span>
            </h2>
          </div>

          <ul className="cgrid__faqs" role="list">
            {FAQS.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <li key={item.q} className={`cgrid__faq${isOpen ? ' is-open' : ''}`}>
                  <button
                    type="button"
                    className="cgrid__faq-q"
                    aria-expanded={isOpen}
                    aria-controls={`cfaq-${idx}`}
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                  >
                    <span className="cgrid__step-index" aria-hidden="true">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="cgrid__faq-text">{item.q}</span>
                    <ChevronDown size={15} className="cgrid__faq-caret" aria-hidden="true" />
                  </button>
                  <div className="cgrid__faq-a" id={`cfaq-${idx}`} hidden={!isOpen}>
                    <p>{item.a}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="cgrid__direct">
            <a className="cgrid__mail" href={`mailto:${PROFILE.email}`}>
              <Mail size={15} className="cgrid__mail-icon" aria-hidden="true" />
              <span>{PROFILE.email}</span>
            </a>

            <ul className="cgrid__socials" role="list">
              <li>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cgrid__social"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={15} />
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cgrid__social"
                  aria-label="GitHub"
                >
                  <Github size={15} />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="cgrid__social"
                  aria-label="Email"
                >
                  <Mail size={15} />
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.v1}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cgrid__social"
                  aria-label="Portfolio v1"
                >
                  <Code2 size={15} />
                </a>
              </li>
            </ul>
          </div>
        </aside>

        {/* Right Contact Form Card with Verified Flow */}
        <div className="cgrid__panel">
          {stage === 'done' ? (
            <div className="cgrid__done" role="status">
              <span className="cgrid__done-mark" aria-hidden="true">
                <CheckCircle2 size={32} />
              </span>
              <h2 className="cgrid__done-title">Got it. Your message is on its way.</h2>
              <p className="cgrid__done-body">
                Your verified inquiry has been delivered directly to Earl's inbox at{' '}
                <strong>{PROFILE.email}</strong> with your email set as Reply-To. You will hear back within one business day.
              </p>
              <button type="button" className="cgrid__again" onClick={handleReset}>
                Write another
              </button>
            </div>
          ) : stage === 'verify' ? (
            <form className="cgrid__form cgrid__otp-card" onSubmit={handleVerifyAndSend} noValidate>
              <div className="cgrid__otp-info">
                <ShieldCheck size={20} className="cgrid__otp-info-icon" />
                <p>
                  We sent a 6-digit verification code to <strong>{form.email}</strong>. Enter it below to verify your email and send your message.
                </p>
              </div>

              <div className="cgrid__otp-field">
                <label className="cgrid__label" htmlFor="otp-input">
                  ENTER 6-DIGIT VERIFICATION CODE
                </label>
                <input
                  id="otp-input"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="one-time-code"
                  maxLength={6}
                  placeholder="000000"
                  autoFocus
                  required
                  className="cgrid__otp-input"
                  value={otp}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setOtp(val);
                    if (errorMsg) setErrorMsg('');
                  }}
                />
                <span className="cgrid__otp-subtext">
                  Code expires in <strong>10 minutes</strong>. Limit 5 attempts.
                </span>
              </div>

              <div className="cgrid__otp-actions">
                <button
                  type="button"
                  className="cgrid__back-btn"
                  onClick={() => {
                    setStage('compose');
                    setErrorMsg('');
                  }}
                >
                  <ArrowLeft size={14} />
                  <span>Edit message</span>
                </button>

                <button
                  type="button"
                  className="cgrid__resend-btn"
                  disabled={cooldown > 0 || loading}
                  onClick={handleResendCode}
                >
                  <RotateCw size={13} className={loading ? 'cgrid__spin' : ''} />
                  <span>
                    {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend code'}
                  </span>
                </button>
              </div>

              <div className="cgrid__actions">
                <button
                  key={shakeKey}
                  type="submit"
                  className={`cgrid__submit${loading ? ' is-sending' : ''}${
                    errorMsg ? ' is-shaking' : ''
                  }`}
                  disabled={loading || otp.trim().length !== 6}
                >
                  <span className="cgrid__submit-plane" aria-hidden="true">
                    {loading ? <Loader2 size={16} className="cgrid__spin" /> : <ShieldCheck size={16} />}
                  </span>
                  <span className="cgrid__submit-label">
                    {loading ? 'Verifying & Sending...' : 'Verify & Send Inquiry'}
                  </span>
                  <ArrowUpRightIcon size={15} className="cgrid__submit-arrow" />
                </button>

                {errorMsg && (
                  <span className="cgrid__status" role="alert">
                    <AlertCircle size={15} aria-hidden="true" />
                    <span>{errorMsg}</span>
                  </span>
                )}
              </div>
            </form>
          ) : (
            <form className="cgrid__form" onSubmit={handleRequestCode} noValidate>
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="cgrid__trap"
              />

              <div className="cgrid__row">
                <label className="cgrid__field">
                  <span className="cgrid__label">FIRST NAME</span>
                  <input
                    type="text"
                    name="firstName"
                    autoComplete="given-name"
                    required
                    maxLength={MAX_NAME}
                    placeholder="Earl"
                    value={form.firstName}
                    onChange={(e) => {
                      setForm({ ...form, firstName: e.target.value });
                      if (errorMsg) setErrorMsg('');
                    }}
                  />
                </label>

                <label className="cgrid__field">
                  <span className="cgrid__label">LAST NAME</span>
                  <input
                    type="text"
                    name="lastName"
                    autoComplete="family-name"
                    required
                    maxLength={MAX_NAME}
                    placeholder="Pajo"
                    value={form.lastName}
                    onChange={(e) => {
                      setForm({ ...form, lastName: e.target.value });
                      if (errorMsg) setErrorMsg('');
                    }}
                  />
                </label>
              </div>

              <label className="cgrid__field">
                <div className="cgrid__label-row">
                  <span className="cgrid__label">EMAIL</span>
                  {emailState.status === 'checking' && (
                    <span className="cgrid__email-badge is-checking">
                      <Loader2 size={12} className="cgrid__spin" /> Checking mail server...
                    </span>
                  )}
                  {emailState.status === 'valid' && (
                    <span className="cgrid__email-badge is-valid">
                      <ShieldCheck size={12} /> {emailState.message}
                    </span>
                  )}
                  {(emailState.status === 'invalid' || emailState.status === 'typo') && (
                    <span className="cgrid__email-badge is-error">
                      <AlertCircle size={12} /> Unverified email
                    </span>
                  )}
                </div>

                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  maxLength={MAX_EMAIL}
                  placeholder="you@yourbusiness.com"
                  className={`cgrid__email-input ${
                    emailState.status === 'valid'
                      ? 'is-valid'
                      : emailState.status === 'invalid' || emailState.status === 'typo'
                      ? 'is-error'
                      : ''
                  }`}
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    if (errorMsg) setErrorMsg('');
                  }}
                />

                {(emailState.status === 'invalid' || emailState.status === 'typo') && (
                  <div className="cgrid__email-feedback" role="alert">
                    <span>{emailState.message}</span>
                    {emailState.suggestion && (
                      <button
                        type="button"
                        className="cgrid__email-fix"
                        onClick={handleApplySuggestion}
                      >
                        <Sparkles size={12} /> Use {emailState.suggestion}
                      </button>
                    )}
                  </div>
                )}
              </label>

              <label className="cgrid__field">
                <span className="cgrid__label">SUBJECT</span>
                <input
                  type="text"
                  name="subject"
                  required
                  maxLength={MAX_SUBJECT}
                  placeholder="Project inquiry / Full-stack app build"
                  value={form.subject}
                  onChange={(e) => {
                    setForm({ ...form, subject: e.target.value });
                    if (errorMsg) setErrorMsg('');
                  }}
                />
              </label>

              <label className="cgrid__field cgrid__field--grow">
                <span className="cgrid__label">TELL ME MORE ABOUT YOUR PROJECT</span>
                <textarea
                  name="message"
                  required
                  maxLength={MAX_MESSAGE}
                  placeholder="What are we building? Which features matter most? What is your target timeline?"
                  value={form.message}
                  onChange={(e) => {
                    setForm({ ...form, message: e.target.value });
                    if (errorMsg) setErrorMsg('');
                  }}
                />
              </label>

              <div className="cgrid__actions">
                <button
                  key={shakeKey}
                  type="submit"
                  className={`cgrid__submit${loading ? ' is-sending' : ''}${
                    errorMsg ? ' is-shaking' : ''
                  }`}
                  disabled={loading}
                >
                  <span className="cgrid__submit-plane" aria-hidden="true">
                    {loading ? <Loader2 size={16} className="cgrid__spin" /> : <KeyRound size={16} />}
                  </span>
                  <span className="cgrid__submit-label">
                    {loading ? 'Sending Code...' : 'Send Verification Code'}
                  </span>
                  <ArrowUpRightIcon size={15} className="cgrid__submit-arrow" />
                </button>

                {errorMsg ? (
                  <span className="cgrid__status" role="alert">
                    <AlertCircle size={15} aria-hidden="true" />
                    <span>{errorMsg}</span>
                  </span>
                ) : (
                  <span className="cgrid__hint">We verify your email with a 6-digit OTP before delivering to Gmail.</span>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
