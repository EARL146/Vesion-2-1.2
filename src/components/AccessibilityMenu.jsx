import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../lib/theme';

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const { theme, toggleTheme, textSize, setTextSize, reduceMotion, setReduceMotion, resetPrefs } = useTheme();

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('open-a11y', onOpen);
    return () => window.removeEventListener('open-a11y', onOpen);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className={`a11y ${open ? 'is-open' : ''}`}>
      <button
        type="button"
        className="a11y__button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Accessibility options"
        aria-expanded={open}
        title="Accessibility"
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="4.8" r="2.1" fill="currentColor" />
          <path
            d="M5 8.5c4.6.75 9.4.75 14 0M12 9.2v4.8m0 0l-2.8 6.2M12 14l2.8 6.2"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="a11y__panel" role="dialog" aria-label="Accessibility settings">
          <div className="a11y__head">
            <span className="a11y__title">Accessibility</span>
            <button
              type="button"
              className="a11y__close"
              onClick={() => setOpen(false)}
              aria-label="Close accessibility menu"
            >
              <X size={16} />
            </button>
          </div>

          <div className="a11y__section">
            <span className="a11y__label">Text size</span>
            <div className="a11y__sizes" role="group" aria-label="Select text size">
              {[
                { key: 'default', label: 'A', desc: 'Default' },
                { key: 'large', label: 'A+', desc: 'Large' },
                { key: 'xl', label: 'A++', desc: 'Extra' }
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  className={`a11y__size ${textSize === opt.key ? 'is-active' : ''}`}
                  aria-pressed={textSize === opt.key}
                  onClick={() => setTextSize(opt.key)}
                >
                  <strong>{opt.label}</strong>
                  <span>{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="a11y__list">
            <button
              type="button"
              className="a11y__switch"
              role="switch"
              aria-checked={theme === 'dark'}
              onClick={toggleTheme}
            >
              <span className="a11y__switch-text">
                <span className="a11y__switch-label">Dark theme</span>
                <span className="a11y__switch-desc">High-contrast deep navy</span>
              </span>
              <span className={`a11y__toggle ${theme === 'dark' ? 'is-on' : ''}`} aria-hidden="true">
                <i />
              </span>
            </button>

            <button
              type="button"
              className="a11y__switch"
              role="switch"
              aria-checked={reduceMotion}
              onClick={() => setReduceMotion(!reduceMotion)}
            >
              <span className="a11y__switch-text">
                <span className="a11y__switch-label">Reduce motion</span>
                <span className="a11y__switch-desc">Pause background &amp; spring fx</span>
              </span>
              <span className={`a11y__toggle ${reduceMotion ? 'is-on' : ''}`} aria-hidden="true">
                <i />
              </span>
            </button>
          </div>

          <button type="button" className="a11y__reset" onClick={resetPrefs}>
            Reset to default
          </button>
        </div>
      )}
    </div>
  );
}
