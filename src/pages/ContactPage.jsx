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
  Code2
} from 'lucide-react';
import { PROFILE, FAQS } from '../data/site';
import { verifyEmailAccount } from '../lib/emailVerify';

const MAX_NAME = 80;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;
const SEND_DELAY_MS = 650;

const CTRL_SINGLE_LINE = new RegExp('[\\u0000-\\u001F\\u007F]', 'g');
const CTRL_MULTI_LINE = new RegExp('[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F]', 'g');
const BIDI_CHARS = new RegExp('[\\u200B-\\u200F\\u202A-\\u202E\\u2060\\uFEFF]', 'g');

function sanitizeText(value, multiline = false) {
  const ctrl = multiline ? CTRL_MULTI_LINE : CTRL_SINGLE_LINE;
  return String(value ?? '').replace(ctrl, '').replace(BIDI_CHARS, '');
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [state, setState] = useState({ kind: 'idle', via: 'mailto', note: '' });
  const [shakeKey, setShakeKey] = useState(0);

  // Live real-email DNS MX check
  const [emailState, setEmailState] = useState({
    status: 'idle', // 'idle' | 'checking' | 'valid' | 'typo' | 'invalid'
    message: '',
    suggestion: '',
    mx: ''
  });

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
    setState((prev) => (prev.kind === 'error' ? { kind: 'idle', via: 'mailto', note: '' } : prev));
  };

  async function deliverInquiry(clean) {
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

    // 1. Optional Web3Forms webhook if configured in .env
    if (accessKey) {
      const payload = new FormData();
      payload.append('access_key', accessKey);
      payload.append('name', `${clean.firstName} ${clean.lastName}`);
      payload.append('email', clean.email);
      payload.append('subject', `Project inquiry from ${clean.firstName} ${clean.lastName}`);
      payload.append('message', clean.message);
      payload.append('botcheck', '');

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return { via: 'webhook' };
      }
    }

    // 2. Sir Kenneth Villar's exact mailto delivery to earlypajo@gmail.com
    const subject = `Project inquiry from ${clean.firstName} ${clean.lastName}`;
    const body = [
      `Name: ${clean.firstName} ${clean.lastName}`,
      `Email: ${clean.email}`,
      '',
      clean.message
    ].join('\n');

    window.location.href = `mailto:${encodeURIComponent(PROFILE.email)}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    return { via: 'mailto' };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const trap = String(formData.get('website') ?? '');
    if (trap) return;

    const firstName = sanitizeText(form.firstName).trim().slice(0, MAX_NAME);
    const lastName = sanitizeText(form.lastName).trim().slice(0, MAX_NAME);
    const email = sanitizeText(form.email).trim().toLowerCase().slice(0, MAX_EMAIL);
    const message = sanitizeText(form.message, true).trim().slice(0, MAX_MESSAGE);

    if (!firstName || !lastName || !email || !message) {
      setState({
        kind: 'error',
        via: 'mailto',
        note: 'Add your name, a real email, and a short note.'
      });
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
      setState({
        kind: 'error',
        via: 'mailto',
        note: emailCheck.reason || 'Add your name, a real email, and a short note.'
      });
      setShakeKey((k) => k + 1);
      return;
    }

    setState({ kind: 'sending', via: 'mailto', note: '' });
    try {
      const [result] = await Promise.all([
        deliverInquiry({ firstName, lastName, email, message }),
        sleep(SEND_DELAY_MS)
      ]);
      setState({ kind: 'sent', via: result.via, note: '' });
    } catch {
      setState({
        kind: 'error',
        via: 'mailto',
        note: 'That did not go through. Email me directly instead.'
      });
      setShakeKey((k) => k + 1);
    }
  };

  const isSending = state.kind === 'sending';

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

        {/* Right Contact Form Panel (Matches Sir Kenneth Villar's ContactGrid 1:1) */}
        <div className="cgrid__panel">
          {state.kind === 'sent' ? (
            <div className="cgrid__done" role="status">
              <span className="cgrid__done-mark" aria-hidden="true">
                <CheckCircle2 size={30} />
              </span>
              <h2 className="cgrid__done-title">
                {state.via === 'webhook' ? 'Got it.' : 'Your mail app has it.'}
              </h2>
              <p className="cgrid__done-body">
                {state.via === 'webhook'
                  ? 'It is in my inbox and on my phone. You will hear back within one business day.'
                  : 'The message is laid out and addressed. Press send there and you will hear back within one business day.'}
              </p>
              <button
                type="button"
                className="cgrid__again"
                onClick={() => {
                  setForm({ firstName: '', lastName: '', email: '', message: '' });
                  setEmailState({ status: 'idle', message: '', suggestion: '', mx: '' });
                  setState({ kind: 'idle', via: 'mailto', note: '' });
                }}
              >
                Write another
              </button>
            </div>
          ) : (
            <form
              className={`cgrid__form${isSending ? ' is-sending' : ''}`}
              onSubmit={handleSubmit}
              noValidate
            >
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
                      if (state.kind === 'error') setState({ kind: 'idle', via: 'mailto', note: '' });
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
                      if (state.kind === 'error') setState({ kind: 'idle', via: 'mailto', note: '' });
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
                    if (state.kind === 'error') setState({ kind: 'idle', via: 'mailto', note: '' });
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
                    if (state.kind === 'error') setState({ kind: 'idle', via: 'mailto', note: '' });
                  }}
                />
              </label>

              <div className="cgrid__actions">
                <button
                  key={shakeKey}
                  type="submit"
                  className={`cgrid__submit${isSending ? ' is-sending' : ''}${
                    state.kind === 'error' ? ' is-shaking' : ''
                  }`}
                  disabled={isSending}
                >
                  <span className="cgrid__submit-plane" aria-hidden="true">
                    <Send size={16} />
                  </span>
                  <span className="cgrid__submit-label">
                    {isSending ? 'Sending' : 'Send message'}
                  </span>
                  <ArrowUpRightIcon size={15} className="cgrid__submit-arrow" />
                </button>

                {state.kind === 'error' ? (
                  <span className="cgrid__status" role="alert">
                    <AlertCircle size={15} aria-hidden="true" />
                    <span>{state.note}</span>
                  </span>
                ) : (
                  <span className="cgrid__hint">One business day. No newsletter, no drip.</span>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
