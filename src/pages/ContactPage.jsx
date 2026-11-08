import React, { useState } from 'react';
import { ChevronDown, Check, Copy, Send, FileText, Mail } from 'lucide-react';
import { FAQS, PROFILE } from '../data/site';
import {
  ArrowUpRightIcon,
  GitHubIcon,
  LinkedInIcon,
  MailSolidIcon
} from '../components/Icons';

export default function ContactPage({ onOpenResume }) {
  const [openIdx, setOpenIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [sentMode, setSentMode] = useState(null); // 'web3' | 'gmail' | null
  const [errorMsg, setErrorMsg] = useState('');
  const [lastSentAt, setLastSentAt] = useState(0);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Ignore if clipboard unavailable
    }
  };

  const openGmailDraft = () => {
    const fullName = `${form.firstName} ${form.lastName}`.trim().slice(0, 120) || 'Visitor';
    const cleanEmail = form.email.trim().slice(0, 120);
    const cleanMsg = form.message.trim().slice(0, 2000);
    const url = new URL(PROFILE.gmail);
    url.searchParams.set('su', `Project Inquiry from ${fullName}`);
    url.searchParams.set(
      'body',
      `Hi Earl,\n\nName: ${fullName}\nEmail: ${cleanEmail}\n\nProject details:\n${cleanMsg}`
    );
    window.open(url.toString(), '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // 1. Honeypot anti-bot check
    const honey = e.currentTarget.elements?.namedItem('botcheck')?.value;
    if (honey) {
      setSentMode('web3');
      return;
    }

    // 2. Client-side cooldown (30s between submissions)
    const now = Date.now();
    if (now - lastSentAt < 30000) {
      setErrorMsg('Please wait 30 seconds before sending another message.');
      return;
    }

    // 3. Input sanitization & validation
    const firstName = form.firstName.trim().slice(0, 60);
    const lastName = form.lastName.trim().slice(0, 60);
    const email = form.email.trim().slice(0, 120);
    const message = form.message.trim().slice(0, 2000);

    if (!firstName || !lastName || !email || !message) {
      setErrorMsg('Please fill out all required fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    const rawKey = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '').trim();
    const hasRealKey = rawKey && rawKey !== 'YOUR_WEB3FORMS_ACCESS_KEY';

    if (!hasRealKey) {
      setLastSentAt(now);
      openGmailDraft();
      setSentMode('gmail');
      return;
    }

    setSending(true);
    try {
      const fullName = `${firstName} ${lastName}`.trim();
      const payload = new FormData();
      payload.set('access_key', rawKey);
      payload.set('botcheck', '');
      payload.set('name', fullName);
      payload.set('email', email);
      payload.set('subject', `Portfolio Inquiry — ${fullName}`);
      payload.set('message', message);

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' }
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Could not submit form right now.');
      }
      setLastSentAt(Date.now());
      setSentMode('web3');
      setForm({ firstName: '', lastName: '', email: '', message: '' });
    } catch (err) {
      setErrorMsg(err.message || 'Delivery failed. Opening Gmail draft instead.');
      openGmailDraft();
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="page-view page-contact" aria-label="FAQs and Contact">
      <header className="view__head">
        <span className="view__eyebrow">FAQS / CONTACT</span>
        <h2 className="view__title">Work worth doing. Tools worth building.</h2>
        <p className="view__lede">
          Tell me what you want to build. Share a short outline and I will reply with a realistic plan.
        </p>
      </header>

      <div className="sweep-glass cgrid__shell">
        {/* Left Dark Navy FAQ Card */}
        <aside className="cgrid__aside">
          <div className="cgrid__aside-head">
            <span className="cgrid__eyebrow">FAQS</span>
            <h3 className="cgrid__aside-title">
              <strong>Quick answers.</strong>
              <span className="only-desktop">Still have one? Write on the right.</span>
              <span className="only-mobile">Still have one? Use the form above.</span>
            </h3>
          </div>

          <div className="cgrid__faqs">
            {FAQS.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={item.q} className={`cgrid__faq ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="cgrid__faq-q"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  >
                    <span className="cgrid__step-index">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="cgrid__faq-text">{item.q}</span>
                    <ChevronDown size={15} className="cgrid__faq-caret" />
                  </button>
                  {isOpen && <p className="cgrid__faq-a">{item.a}</p>}
                </div>
              );
            })}
          </div>

          <div className="cgrid__direct">
            <button
              type="button"
              className="cgrid__mail"
              onClick={handleCopyEmail}
              title="Click to copy email address"
            >
              <Mail size={14} className="cgrid__mail-icon" />
              <span>{copied ? 'Copied earlypajo@gmail.com!' : PROFILE.email}</span>
              {copied ? <Check size={13} /> : <Copy size={13} className="cgrid__mail-copy" />}
            </button>

            <div className="cgrid__socials">
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="cgrid__social"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <LinkedInIcon size={16} />
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="cgrid__social"
                aria-label="GitHub"
                title="GitHub"
              >
                <GitHubIcon size={16} />
              </a>
              <a
                href={PROFILE.gmail}
                target="_blank"
                rel="noopener noreferrer"
                className="cgrid__social"
                aria-label="Open Gmail Compose"
                title="Open Gmail Compose"
              >
                <MailSolidIcon size={16} />
              </a>
              <button
                type="button"
                className="cgrid__social"
                onClick={onOpenResume}
                aria-label="Open Resume / CV"
                title="View Resume / CV"
              >
                <FileText size={16} />
              </button>
            </div>
          </div>
        </aside>

        {/* Right Form Panel */}
        <div className="cgrid__panel">
          {sentMode ? (
            <div className="cgrid__done" role="status" aria-live="polite">
              <span className="cgrid__done-mark">
                <Check size={28} />
              </span>
              <h3 className="cgrid__done-title">
                {sentMode === 'web3' ? 'Message sent!' : 'Gmail draft opened!'}
              </h3>
              <p className="cgrid__done-body">
                {sentMode === 'web3'
                  ? 'Thank you for reaching out. Earl will review your project note and reply soon.'
                  : 'Your project details were pre-filled in Gmail so you can send them directly to earlypajo@gmail.com.'}
              </p>
              <button
                type="button"
                className="cgrid__again"
                onClick={() => setSentMode(null)}
              >
                Write another message
              </button>
            </div>
          ) : (
            <form className="cgrid__form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                className="cgrid__trap"
                aria-hidden="true"
              />

              <div className="cgrid__row">
                <label className="cgrid__field">
                  <span className="cgrid__label">FIRST NAME</span>
                  <input
                    type="text"
                    required
                    maxLength={60}
                    autoComplete="given-name"
                    placeholder="Maria"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  />
                </label>

                <label className="cgrid__field">
                  <span className="cgrid__label">LAST NAME</span>
                  <input
                    type="text"
                    required
                    maxLength={60}
                    autoComplete="family-name"
                    placeholder="Santos"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  />
                </label>
              </div>

              <label className="cgrid__field">
                <span className="cgrid__label">EMAIL</span>
                <input
                  type="email"
                  required
                  maxLength={120}
                  autoComplete="email"
                  placeholder="you@yourbusiness.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>

              <label className="cgrid__field cgrid__field--grow">
                <span className="cgrid__label">TELL ME MORE ABOUT YOUR PROJECT</span>
                <textarea
                  required
                  rows={6}
                  maxLength={2000}
                  placeholder="What are we building? Which features matter most? What is your target timeline?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </label>

              {errorMsg && <p className="cgrid__status">{errorMsg}</p>}

              <div className="cgrid__actions">
                <button
                  type="submit"
                  className={`cgrid__submit ${sending ? 'is-sending' : ''}`}
                  disabled={sending}
                >
                  <span className="cgrid__submit-plane" aria-hidden="true">
                    <Send size={15} />
                  </span>
                  <span className="cgrid__submit-label">
                    {sending ? 'Sending...' : 'Send message'}
                  </span>
                  <span className="cgrid__submit-arrow" aria-hidden="true">
                    <ArrowUpRightIcon size={14} />
                  </span>
                </button>

                <span className="cgrid__hint">
                  Replies within 24h · Direct to inbox
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
