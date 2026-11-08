import React, { useEffect, useState } from 'react';
import { X, Menu, FileText, Sun, Moon } from 'lucide-react';
import { Link, useRouter } from '../lib/router';
import { useTheme } from '../lib/theme';
import { NAV, PROFILE } from '../data/site';
import { LinkedInIcon, GitHubIcon, MailSolidIcon, CodeBracketIcon } from './Icons';

/* Compact top bar + slide-in drawer used below 1100px (BrewedOps v3 mobile shell) */
export default function MobileNav({ onOpenResume }) {
  const [open, setOpen] = useState(false);
  const { path } = useRouter();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const openA11y = () => {
    setOpen(false);
    window.setTimeout(() => window.dispatchEvent(new Event('open-a11y')), 60);
  };

  return (
    <>
      <header className="pbar">
        <Link to="/" className="pbar__brand" aria-label={`${PROFILE.name} — Home`}>
          <span className="pbar__avatar">
            <img src={PROFILE.avatarSmall} alt="" />
          </span>
          <span className="pbar__who">
            <span className="pbar__name">{PROFILE.name}</span>
            <span className="pbar__handle">{PROFILE.handle}</span>
          </span>
        </Link>

        <button
          type="button"
          className="pbar__menu"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <Menu size={24} strokeWidth={1.6} />
        </button>
      </header>

      <div className={`mdrawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <button
          type="button"
          className="mdrawer__scrim"
          aria-label="Close menu"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
        />

        <aside className="mdrawer__panel" role="dialog" aria-label="Site menu">
          <button
            type="button"
            className="mdrawer__close"
            aria-label="Close menu"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            <X size={22} strokeWidth={1.6} />
          </button>

          <nav className="mdrawer__nav" aria-label="Mobile navigation">
            <ul>
              {NAV.map((item) => {
                const active = item.path === '/' ? path === '/' : path.startsWith(item.path);
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      exact={item.path === '/'}
                      className={`mdrawer__link ${active ? 'is-active' : ''}`}
                      tabIndex={open ? 0 : -1}
                    >
                      <span>{item.label}</span>
                      {active && <i className="mdrawer__dot" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mdrawer__foot">
            <Link to="/contact" className="mdrawer__cta" tabIndex={open ? 0 : -1}>
              Get in touch
            </Link>

            <button
              type="button"
              className="mdrawer__cta mdrawer__cta--ghost"
              tabIndex={open ? 0 : -1}
              onClick={() => {
                setOpen(false);
                onOpenResume();
              }}
            >
              <FileText size={15} />
              <span>Resume / CV</span>
            </button>

            <div className="mdrawer__pills">
              <button type="button" className="mdrawer__pill" tabIndex={open ? 0 : -1} onClick={toggleTheme}>
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                <span>{theme === 'dark' ? 'Light theme' : 'Dark theme'}</span>
              </button>
              <button type="button" className="mdrawer__pill" tabIndex={open ? 0 : -1} onClick={openA11y}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="4.8" r="2.1" fill="currentColor" />
                  <path
                    d="M5 8.5c4.6.75 9.4.75 14 0M12 9.2v4.8m0 0l-2.8 6.2M12 14l2.8 6.2"
                    stroke="currentColor"
                    strokeWidth="2.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Accessibility</span>
              </button>
            </div>

            <ul className="mdrawer__socials" aria-label="Social links">
              <li>
                <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" tabIndex={open ? 0 : -1}>
                  <LinkedInIcon size={19} />
                </a>
              </li>
              <li>
                <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" tabIndex={open ? 0 : -1}>
                  <GitHubIcon size={20} />
                </a>
              </li>
              <li>
                <a href={PROFILE.gmail} target="_blank" rel="noopener noreferrer" aria-label="Email via Gmail" tabIndex={open ? 0 : -1}>
                  <MailSolidIcon size={19} />
                </a>
              </li>
              <li>
                <a href={PROFILE.v1} target="_blank" rel="noopener noreferrer" aria-label="Portfolio Version 1.0" tabIndex={open ? 0 : -1}>
                  <CodeBracketIcon size={19} />
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
