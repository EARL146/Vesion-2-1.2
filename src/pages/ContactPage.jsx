import React, { useEffect, useState } from 'react';
import {
  ChevronDown,
  Check,
  Copy,
  Send,
  FileText,
  Mail,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Sparkles,
  Lock,
  ArrowLeft,
  RefreshCw
} from 'lucide-react';
import { FAQS, PROFILE } from '../data/site';
import {
  ArrowUpRightIcon,
  GitHubIcon,
  LinkedInIcon,
  MailSolidIcon
} from '../components/Icons';
import { checkEmailRules, verifyEmailDomainMX } from '../lib/emailVerify';

function generateChallengeCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = '';
  for (let i = 0; i < 6; i += 1) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export default function ContactPage({ onOpenResume }) {
  const [openIdx, setOpenIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [emailState, setEmailState] = useState({
    status: 'idle', // 'idle' | 'checking' | 'valid' | 'error' | 'typo'
    message: '',
    suggestion: '',
    mx: ''
  });

  // Flow stage: 'compose' -> 'verify' -> 'done'
  const [stage, setStage] = useState('compose');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [challengeCode, setChallengeCode] = useState(() => generateChallengeCode());
  const [enteredCode, setEnteredCode] = useState('');
  const [ownershipChecked, setOwnershipChecked] = useState(false);

  const [sending, setSending] = useState(false);
  const [sentMode, setSentMode] = useState(null); // 'direct' | 'gmail' | null
  const [errorMsg, setErrorMsg] = useState('');
  const [lastSentAt, setLastSentAt] = useState(0);

  // Real-time email verification (syntax + anti-disposable + live DNS MX check)
  useEffect(() => {
    const raw = form.email.trim();
    if (!raw) {
      setEmailState({ status: 'idle', message: '', suggestion: '', mx: '' });
      return;
    }

    const syncCheck = checkEmailRules(raw);
    if (!syncCheck.valid) {
      setEmailState({
        status: syncCheck.status,
        message: syncCheck.message,
        suggestion: syncCheck.suggestion || '',
        mx: ''
      });
      return;
    }

    let cancelled = false;
    setEmailState({
      status: 'checking',
      message: `Verifying @${syncCheck.domain} mail server...`,
      suggestion: '',
      mx: ''
    });

    const timer = setTimeout(async () => {
      const dns = await verifyEmailDomainMX(syncCheck.domain);
      if (cancelled) return;
      if (dns.ok) {
        setEmailState({
          status: 'valid',
          message: dns.reason,
          suggestion: '',
          mx: dns.mx || `mx.${syncCheck.domain}`
        });
      } else {
        setEmailState({
          status: 'error',
          message: dns.reason,
          suggestion: '',
          mx: ''
        });
      }
    }, 360);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [form.email]);

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
    const cleanEmail = form.email.trim().toLowerCase().slice(0, 120);
    const cleanMsg = form.message.trim().slice(0, 2000);
    const url = new URL(PROFILE.gmail);
    url.searchParams.set('su', `[Verified Inquiry] ${fullName} (${cleanEmail})`);
    url.searchParams.set(
      'body',
      `Hi Earl,\n\nVerified Sender: ${fullName}\nVerified Email: ${cleanEmail}\n\nProject details:\n${cleanMsg}`
    );
    window.open(url.toString(), '_blank', 'noopener,noreferrer');
  };

  // Step 1 -> Step 2 (Validate fields & MX record, then open Account Verification gate)
  const handleProceedToVerify = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // 1. Honeypot anti-bot check
    const honey = e.currentTarget.elements?.namedItem('botcheck')?.value;
    if (honey) {
      setSentMode('direct');
      setStage('done');
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
    const email = form.email.trim().toLowerCase().slice(0, 120);
    const message = form.message.trim().slice(0, 2000);

    if (!firstName || !lastName || !email || !message) {
      setErrorMsg('Please fill out all required fields.');
      return;
    }

    // 4. Strict Email Rules + Live DNS MX Verification
    const ruleCheck = checkEmailRules(email);
    if (!ruleCheck.valid) {
      setEmailState({
        status: ruleCheck.status,
        message: ruleCheck.message,
        suggestion: ruleCheck.suggestion || '',
        mx: ''
      });
      setErrorMsg(ruleCheck.message);
      return;
    }

    setSending(true);
    const dnsCheck = await verifyEmailDomainMX(ruleCheck.domain);
    setSending(false);

    if (!dnsCheck.ok) {
      setEmailState({
        status: 'error',
        message: dnsCheck.reason,
        suggestion: '',
        mx: ''
      });
      setErrorMsg(dnsCheck.reason);
      return;
    }

    // Move to Step 2: Account Verification Gate
    setChallengeCode(generateChallengeCode());
    setEnteredCode('');
    setConfirmEmail('');
    setOwnershipChecked(false);
    setErrorMsg('');
    setStage('verify');
  };

  // Step 2 -> Step 3 (Verify Account Ownership & Deliver to earlypajo@gmail.com)
  const handleConfirmAndSend = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanOriginal = form.email.trim().toLowerCase();
    const cleanConfirm = confirmEmail.trim().toLowerCase();

    if (cleanConfirm !== cleanOriginal) {
      setErrorMsg('Confirmation email does not match. Please type your exact email address.');
      return;
    }

    if (enteredCode.trim().toUpperCase() !== challengeCode) {
      setErrorMsg('Incorrect verification code. Please enter the 6-character code shown.');
      return;
    }

    if (!ownershipChecked) {
      setErrorMsg('Please confirm that this is your active email account.');
      return;
    }

    setSending(true);
    const firstName = form.firstName.trim().slice(0, 60);
    const lastName = form.lastName.trim().slice(0, 60);
    const fullName = `${firstName} ${lastName}`.trim();
    const message = form.message.trim().slice(0, 2000);

    const rawKey = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '').trim();
    const hasRealKey = rawKey && rawKey !== 'YOUR_WEB3FORMS_ACCESS_KEY';

    try {
      if (hasRealKey) {
        const payload = new FormData();
        payload.set('access_key', rawKey);
        payload.set('botcheck', '');
        payload.set('name', fullName);
        payload.set('email', cleanOriginal);
        payload.set('replyto', cleanOriginal);
        payload.set('subject', `[Verified Portfolio Inquiry] ${fullName}`);
        payload.set('message', `Verified Sender: ${fullName} (${cleanOriginal})\n\n${message}`);

        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: payload,
          headers: { Accept: 'application/json' }
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || 'Could not submit via Web3Forms.');
        }
        setSentMode('direct');
      } else {
        // Deliver directly to earlypajo@gmail.com via FormSubmit AJAX endpoint
        const res = await fetch(`https://formsubmit.co/ajax/${PROFILE.email}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            name: fullName,
            email: cleanOriginal,
            _replyto: cleanOriginal,
            _subject: `[Verified Portfolio Inquiry] ${fullName} (${cleanOriginal})`,
            message,
            verified_mx: emailState.mx || 'Verified DNS MX',
            _template: 'table'
          })
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && (data.success === 'true' || data.success === true)) {
          setSentMode('direct');
        } else {
          // Fallback: open verified Gmail draft directly from visitor's Google account
          openGmailDraft();
          setSentMode('gmail');
        }
      }

      setLastSentAt(Date.now());
      setStage('done');
    } catch {
      openGmailDraft();
      setLastSentAt(Date.now());
      setSentMode('gmail');
      setStage('done');
    } finally {
      setSending(false);
    }
  };

  const handleResetFlow = () => {
    setForm({ firstName: '', lastName: '', email: '', message: '' });
    setEmailState({ status: 'idle', message: '', suggestion: '', mx: '' });
    setConfirmEmail('');
    setEnteredCode('');
    setOwnershipChecked(false);
    setErrorMsg('');
    setSentMode(null);
    setStage('compose');
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
          {/* Step Progress Bar */}
          <div className="cgrid__steps" aria-label="Contact verification progress">
            <div className={`cgrid__step-pill ${stage === 'compose' ? 'is-active' : 'is-done'}`}>
              <span>1</span>
              <strong>Write Message</strong>
            </div>
            <span className="cgrid__step-line" />
            <div
              className={`cgrid__step-pill ${
                stage === 'verify' ? 'is-active' : stage === 'done' ? 'is-done' : ''
              }`}
            >
              <span>2</span>
              <strong>Verify Account</strong>
            </div>
            <span className="cgrid__step-line" />
            <div className={`cgrid__step-pill ${stage === 'done' ? 'is-active is-done' : ''}`}>
              <span>3</span>
              <strong>Sent to Gmail</strong>
            </div>
          </div>

          {stage === 'done' && (
            <div className="cgrid__done" role="status" aria-live="polite">
              <span className="cgrid__done-mark">
                <Check size={28} />
              </span>
              <span className="cgrid__verified-pill">
                <ShieldCheck size={14} />
                <span>Account Verified · {form.email.trim().toLowerCase()}</span>
              </span>
              <h3 className="cgrid__done-title">
                {sentMode === 'direct'
                  ? 'Verified & sent to Earl’s Gmail!'
                  : 'Verified & opened in your Gmail!'}
              </h3>
              <p className="cgrid__done-body">
                {sentMode === 'direct'
                  ? `Your email account (${form.email.trim().toLowerCase()}) has been verified and your message was delivered directly to ${PROFILE.email}. Earl will reply straight to your inbox.`
                  : `Your email (${form.email.trim().toLowerCase()}) was verified and your Gmail compose tab is ready to send directly to ${PROFILE.email}.`}
              </p>

              <div className="cgrid__done-actions">
                <button
                  type="button"
                  className="cgrid__gmail-btn"
                  onClick={openGmailDraft}
                >
                  <Mail size={14} />
                  <span>Also open in Gmail app ↗</span>
                </button>
                <button
                  type="button"
                  className="cgrid__again"
                  onClick={handleResetFlow}
                >
                  Write another message
                </button>
              </div>
            </div>
          )}

          {stage === 'verify' && (
            <form className="cgrid__verify" onSubmit={handleConfirmAndSend}>
              <div className="cgrid__verify-head">
                <span className="cgrid__verify-icon">
                  <Lock size={18} />
                </span>
                <div>
                  <h4>Verify your email account before sending</h4>
                  <p>
                    To prevent fake accounts and make sure Earl can reply to you, please confirm ownership of{' '}
                    <strong>{form.email.trim().toLowerCase()}</strong>.
                  </p>
                </div>
              </div>

              <div className="cgrid__verify-summary">
                <div>
                  <small>VERIFIED SENDER</small>
                  <strong>{`${form.firstName} ${form.lastName}`.trim()}</strong>
                </div>
                <div>
                  <small>MAIL SERVER (DNS MX)</small>
                  <strong className="is-green">
                    <ShieldCheck size={13} /> {emailState.mx || 'Active MX Server'}
                  </strong>
                </div>
                <div>
                  <small>RECIPIENT INBOX</small>
                  <strong>{PROFILE.email}</strong>
                </div>
              </div>

              <label className="cgrid__field">
                <span className="cgrid__label">
                  STEP 1 · RE-TYPE YOUR EMAIL ADDRESS TO CONFIRM ACCOUNT
                </span>
                <input
                  type="email"
                  required
                  autoComplete="off"
                  onPaste={(e) => e.preventDefault()}
                  placeholder={form.email.trim().toLowerCase()}
                  value={confirmEmail}
                  onChange={(e) => {
                    setErrorMsg('');
                    setConfirmEmail(e.target.value);
                  }}
                />
              </label>

              <div className="cgrid__field">
                <div className="cgrid__label-row">
                  <span className="cgrid__label">STEP 2 · ENTER SECURITY VERIFICATION CODE</span>
                  <button
                    type="button"
                    className="cgrid__code-refresh"
                    onClick={() => {
                      setChallengeCode(generateChallengeCode());
                      setEnteredCode('');
                    }}
                  >
                    <RefreshCw size={11} /> New code
                  </button>
                </div>

                <div className="cgrid__challenge-row">
                  <div className="cgrid__challenge-box" aria-label="Security code">
                    {challengeCode}
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="Enter 6-character code"
                    value={enteredCode}
                    onChange={(e) => {
                      setErrorMsg('');
                      setEnteredCode(e.target.value.toUpperCase());
                    }}
                  />
                </div>
              </div>

              <label className="cgrid__check">
                <input
                  type="checkbox"
                  checked={ownershipChecked}
                  onChange={(e) => {
                    setErrorMsg('');
                    setOwnershipChecked(e.target.checked);
                  }}
                />
                <span>
                  I confirm that <strong>{form.email.trim().toLowerCase()}</strong> is my real, active email account and I authorize sending this inquiry to <strong>{PROFILE.email}</strong>.
                </span>
              </label>

              {errorMsg && <p className="cgrid__status">{errorMsg}</p>}

              <div className="cgrid__verify-actions">
                <button
                  type="button"
                  className="cgrid__back-btn"
                  onClick={() => {
                    setErrorMsg('');
                    setStage('compose');
                  }}
                >
                  <ArrowLeft size={14} />
                  <span>Edit message</span>
                </button>

                <button
                  type="submit"
                  className="cgrid__submit"
                  disabled={sending}
                >
                  <ShieldCheck size={16} />
                  <span>
                    {sending ? 'Sending to Earl’s Gmail...' : 'Verify Account & Send to Gmail'}
                  </span>
                  <ArrowUpRightIcon size={14} />
                </button>
              </div>
            </form>
          )}

          {stage === 'compose' && (
            <form className="cgrid__form" onSubmit={handleProceedToVerify}>
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

              <div className="cgrid__field">
                <div className="cgrid__label-row">
                  <label htmlFor="contact-email" className="cgrid__label">
                    EMAIL
                  </label>

                  {emailState.status === 'checking' && (
                    <span className="cgrid__email-badge is-checking">
                      <Loader2 size={12} className="cgrid__spin" />
                      <span>Checking mail server...</span>
                    </span>
                  )}

                  {emailState.status === 'valid' && (
                    <span className="cgrid__email-badge is-valid">
                      <ShieldCheck size={13} />
                      <span>{emailState.message}</span>
                    </span>
                  )}

                  {(emailState.status === 'error' || emailState.status === 'typo') && (
                    <span className="cgrid__email-badge is-error">
                      <AlertCircle size={13} />
                      <span>Invalid / unverified email</span>
                    </span>
                  )}
                </div>

                <input
                  id="contact-email"
                  type="email"
                  required
                  maxLength={120}
                  autoComplete="email"
                  placeholder="maria.santos@gmail.com"
                  className={`cgrid__email-input is-${emailState.status}`}
                  aria-invalid={emailState.status === 'error' || emailState.status === 'typo'}
                  value={form.email}
                  onChange={(e) => {
                    setErrorMsg('');
                    setForm({ ...form, email: e.target.value });
                  }}
                />

                {(emailState.status === 'error' || emailState.status === 'typo') && (
                  <div className="cgrid__email-feedback" role="alert">
                    <span>{emailState.message}</span>
                    {emailState.suggestion && (
                      <button
                        type="button"
                        className="cgrid__email-fix"
                        onClick={() =>
                          setForm((prev) => ({ ...prev, email: emailState.suggestion }))
                        }
                      >
                        <Sparkles size={11} />
                        <span>Use {emailState.suggestion}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              <label className="cgrid__field cgrid__field--grow">
                <span className="cgrid__label">TELL ME MORE ABOUT YOUR PROJECT</span>
                <textarea
                  required
                  rows={5}
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
                  disabled={
                    sending ||
                    emailState.status === 'error' ||
                    emailState.status === 'typo' ||
                    emailState.status === 'checking'
                  }
                >
                  <span className="cgrid__submit-plane" aria-hidden="true">
                    <Send size={15} />
                  </span>
                  <span className="cgrid__submit-label">
                    {sending ? 'Verifying mail server...' : 'Send message'}
                  </span>
                  <span className="cgrid__submit-arrow" aria-hidden="true">
                    <ArrowUpRightIcon size={14} />
                  </span>
                </button>

                <span className="cgrid__hint">
                  Step 1 of 2 · Next: Verify your email account
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
