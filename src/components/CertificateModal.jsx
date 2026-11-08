import React, { useEffect, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Tablet,
  Smartphone,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { CERTIFICATES, PROFILE } from '../data/site';

export default function CertificateModal({ certIndex, onSelectIndex, onClose }) {
  const [device, setDevice] = useState('desktop');
  const [copied, setCopied] = useState(false);

  const cert = certIndex !== null && certIndex >= 0 ? CERTIFICATES[certIndex] : null;

  useEffect(() => {
    if (!cert) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onSelectIndex((certIndex + 1) % CERTIFICATES.length);
      if (e.key === 'ArrowLeft') {
        onSelectIndex((certIndex - 1 + CERTIFICATES.length) % CERTIFICATES.length);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [cert, certIndex, onClose, onSelectIndex]);

  if (!cert) return null;

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(cert.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable
    }
  };

  return (
    <div className="pmodal" onClick={onClose} role="presentation">
      <div
        className="ppanel ppanel--window cmodal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cmodal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ppanel__bar">
          <span className="ppanel__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>

          <div className="cmodal__devices" role="group" aria-label="Preview device frame">
            {[
              { id: 'desktop', label: 'Desktop', Icon: Monitor },
              { id: 'tablet', label: 'Tablet', Icon: Tablet },
              { id: 'phone', label: 'Phone', Icon: Smartphone }
            ].map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                className={`cmodal__dev-btn ${device === id ? 'is-active' : ''}`}
                onClick={() => setDevice(id)}
              >
                <Icon size={13} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          <a
            href={cert.image}
            target="_blank"
            rel="noopener noreferrer"
            className="ppanel__ext"
          >
            <span>Full Image</span>
            <ExternalLink size={12} />
          </a>

          <button
            type="button"
            className="pmodal__close-inline"
            onClick={onClose}
            aria-label="Close certificate viewer"
          >
            <X size={17} />
          </button>
        </div>

        <div className="ppanel__tabs" role="tablist" aria-label="Switch certificate">
          {CERTIFICATES.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={idx === certIndex}
              className="ppanel__tab"
              onClick={() => onSelectIndex(idx)}
            >
              <span>#{item.num} {item.short}</span>
            </button>
          ))}
        </div>

        <div className="ppanel__scroll">
          <div className="cmodal__body">
            <div className="cmodal__stage">
              <button
                type="button"
                className="cmodal__nav"
                onClick={() => onSelectIndex((certIndex - 1 + CERTIFICATES.length) % CERTIFICATES.length)}
                aria-label="Previous certificate"
              >
                <ChevronLeft size={20} />
              </button>

              <div className={`cmodal__frame cmodal__frame--${device}`}>
                <img src={cert.image} alt={cert.title} />
              </div>

              <button
                type="button"
                className="cmodal__nav"
                onClick={() => onSelectIndex((certIndex + 1) % CERTIFICATES.length)}
                aria-label="Next certificate"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="cmodal__meta">
              <div className="cmodal__meta-top">
                <span className="cmodal__verified">
                  <ShieldCheck size={14} /> Verified Credential · #{cert.num} of {String(CERTIFICATES.length).padStart(2, '0')}
                </span>
                <span className="cmodal__date">{cert.date}</span>
              </div>

              <h2 id="cmodal-title" className="cmodal__title">{cert.title}</h2>
              <p className="cmodal__issuer">{cert.issuer} · Awarded to {PROFILE.fullName}</p>
              <p className="cmodal__desc">{cert.desc}</p>

              <div className="cmodal__footer">
                <div className="cmodal__skills">
                  {cert.skills.map((s) => (
                    <span key={s} className="pdetail__tag">{s}</span>
                  ))}
                </div>

                <button type="button" className="cmodal__code" onClick={copyCode}>
                  <span>ID: {cert.code}</span>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
