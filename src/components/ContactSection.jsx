import React, { useState } from 'react';
import {
  Mail,
  Send,
  Check,
  Copy,
  HelpCircle,
  ChevronDown,
  MapPin,
  Clock,
  ExternalLink,
  Linkedin,
  FileText
} from 'lucide-react';

const EMAIL = 'earlypajo@gmail.com';
const GMAIL_COMPOSE_URL = 'https://mail.google.com/mail/?view=cm&fs=1&to=earlypajo@gmail.com&su=Project%20Inquiry%20via%20Portfolio';

const FAQS = [
  {
    q: 'How do project timelines work?',
    a: 'Timelines depend on the agreed scope, features, and review steps. Share a short project outline and target date so we can discuss a realistic schedule.'
  },
  {
    q: 'Which technologies do you work with?',
    a: 'Core work includes responsive HTML, CSS, and JavaScript; Java 21 and Spring Boot; Node.js and Express; MySQL and phpMyAdmin; and Flutter with Dart. PHP is also part of the backend stack.'
  },
  {
    q: 'How can I use the contact form?',
    a: 'The form can send through Web3Forms once its access key is configured for earlypajo@gmail.com. Until then, the form opens a Gmail draft with your details so you can still reach Earl.'
  },
  {
    q: 'How do you approach deployment?',
    a: 'This portfolio includes an optimized Vite static build with SPA routing for fast cloud deployment. Other projects are configured around their specific production hosting requirements.'
  },
  {
    q: 'Do you offer n8n or AI automation services?',
    a: 'n8n and AI integrations are currently foundational and exploratory workflows. Earl’s main focus is full-stack web development, backend applications, databases, and mobile apps.'
  }
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  const openGmailWithForm = () => {
    const subject = formData.subject || 'Project Inquiry via Portfolio';
    const body = `Hi Earl,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const url = new URL(GMAIL_COMPOSE_URL);
    url.searchParams.set('su', subject);
    url.searchParams.set('body', body);
    window.open(url.toString(), '_blank', 'noopener,noreferrer');
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setFormStatus({ type: 'error', message: 'Clipboard access is unavailable. You can select and copy the email address.' });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      openGmailWithForm();
      setFormStatus({
        type: 'info',
        message: 'Web3Forms is not configured on this build, so a Gmail draft was opened with your message.'
      });
      return;
    }

    setIsSending(true);
    setFormStatus({ type: 'info', message: 'Sending your message…' });

    try {
      const payload = new FormData(event.currentTarget);
      payload.set('access_key', accessKey);
      payload.set('subject', formData.subject || 'Project Inquiry via Portfolio');
      payload.set('from_name', formData.name);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' }
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'The form could not be sent. Please try Gmail instead.');
      }

      setFormData({ name: '', email: '', subject: '', message: '' });
      setFormStatus({ type: 'success', message: 'Message sent. Thank you for reaching out!' });
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please use the Gmail button below.'
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-tag">
        <Mail size={14} /> 07 / Contact
      </div>
      <h2 className="section-title">Let’s Build Something Meaningful</h2>
      <p className="section-desc">
        Have an idea for a web app, mobile project, or client website? Send a note or open a Gmail draft directly.
      </p>

      <div className="contact-grid-container">
        <div className="contact-form-card glass-card">
          <h3 className="contact-card-title">Send a Message</h3>
          <p className="contact-card-sub">The form uses Web3Forms when configured, with Gmail compose as a fallback.</p>

          <form onSubmit={handleSubmit} className="contact-actual-form">
            <input type="checkbox" name="botcheck" className="contact-honeypot" tabIndex={-1} aria-hidden="true" />
            <div className="form-group-row">
              <div className="form-group">
                <label htmlFor="contact-name">Your Name</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="e.g. Maria Santos"
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email">Your Email</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="maria@example.com"
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject">Subject / Project Idea</label>
              <input
                type="text"
                id="contact-subject"
                name="subject"
                required
                placeholder="e.g. Business website"
                value={formData.subject}
                onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                required
                placeholder="Tell me what you’d like to build..."
                value={formData.message}
                onChange={(event) => setFormData({ ...formData, message: event.target.value })}
              />
            </div>

            <button type="submit" className="btn btn--primary btn--full" disabled={isSending}>
              <span>{isSending ? 'Sending…' : 'Send Message'}</span>
              <Send size={16} />
            </button>
          </form>

          {formStatus && (
            <p className={`form-status form-status--${formStatus.type}`} role="status" aria-live="polite">
              {formStatus.message}
            </p>
          )}

          <div className="quick-copy-strip">
            <span className="email-display">{EMAIL}</span>
            <div className="strip-buttons">
              <a href={GMAIL_COMPOSE_URL} target="_blank" rel="noopener noreferrer" className="copy-email-btn">
                <Mail size={14} /> <span>Open in Gmail</span>
              </a>
              <button type="button" className="copy-email-btn" onClick={handleCopyEmail} title="Copy email address">
                {copied ? <Check size={14} className="copied-check" /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
          <p className="web3forms-note">
            Web3Forms is a no-backend form service. Add an access key linked to {EMAIL} to enable direct form delivery.
          </p>
        </div>

        <div className="contact-faq-col">
          <div className="location-info-card glass-card">
            <div className="loc-item">
              <MapPin size={18} className="loc-icon" />
              <div><span className="loc-label">Location</span><span className="loc-value">Compostela, Davao de Oro, Philippines</span></div>
            </div>
            <div className="loc-item">
              <Clock size={18} className="loc-icon" />
              <div><span className="loc-label">Timezone</span><span className="loc-value">Philippine Time (GMT+8)</span></div>
            </div>
            <div className="loc-item">
              <Linkedin size={18} className="loc-icon" />
              <div>
                <span className="loc-label">LinkedIn</span>
                <a 
                  href="https://www.linkedin.com/in/earlnis-pajo-272840432" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="loc-link"
                >
                  linkedin.com/in/earlnis-pajo-272840432 <ExternalLink size={12} />
                </a>
              </div>
            </div>
            <div className="loc-item">
              <FileText size={18} className="loc-icon" />
              <div>
                <span className="loc-label">Curriculum Vitae</span>
                <button 
                  type="button" 
                  onClick={() => window.dispatchEvent(new CustomEvent('open-resume'))}
                  className="loc-resume-btn"
                >
                  View &amp; Print Resume <ExternalLink size={12} />
                </button>
              </div>
            </div>
          </div>

          <div className="free-api-card glass-card">
            <span className="api-pill">Contact Form</span>
            <h4 className="api-title">Web3Forms integration</h4>
            <p className="api-copy">Create an access key for Earl’s email, then add it to the production build settings. A Gmail compose link is available while the key is unset.</p>
            <a href="https://web3forms.com/" target="_blank" rel="noopener noreferrer" className="api-doc-link">
              Set up Web3Forms <ExternalLink size={13} />
            </a>
          </div>

          <div className="faq-wrapper glass-card">
            <div className="faq-header">
              <HelpCircle size={18} className="faq-icon" />
              <h3>Frequently Asked Questions</h3>
            </div>
            <div className="faq-items-list">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={faq.q} className={`faq-row ${isOpen ? 'is-open' : ''}`}>
                    <button
                      type="button"
                      className="faq-question-btn"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown size={16} className={`faq-chevron ${isOpen ? 'rotate' : ''}`} />
                    </button>
                    {isOpen && <div className="faq-answer-panel"><p>{faq.a}</p></div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
