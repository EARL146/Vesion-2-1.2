import React from 'react';
import { Link } from '../lib/router';
import { useTheme } from '../lib/theme';
import { NAV, PROFILE } from '../data/site';
import {
  VerifiedBadge,
  RailIcon,
  LinkedInIcon,
  GitHubIcon,
  MailSolidIcon,
  CodeBracketIcon,
  ThemeToggleIcon
} from './Icons';
import MobileNav from './MobileNav';

export default function LeftRail({ visitorCount, onOpenResume }) {
  const { theme, toggleTheme } = useTheme();

  const visitsLabel =
    visitorCount && visitorCount > 0 ? `${visitorCount.toLocaleString()} visits` : 'Davao, PH';

  return (
    <>
      {/* Mobile / Tablet compact top bar + drawer (< 1100px) */}
      <MobileNav onOpenResume={onOpenResume} />

      {/* Desktop Left Sticky Rail (>= 1100px) */}
      <aside className="rail" aria-label="Primary sidebar">
        <div className="rail__inner">
          <Link to="/" className="rail__avatar" aria-label={`${PROFILE.name} — Home`}>
            <img src={PROFILE.avatar} alt={`Illustrated portrait of ${PROFILE.name}`} />
          </Link>

          <h1 className="rail__name">
            <span>{PROFILE.name}</span>
            <VerifiedBadge size={18} />
          </h1>

          <p className="rail__handle">
            <span>{PROFILE.handle}</span>
            <span className="rail__visits" title="Portfolio page visits">
              {visitsLabel}
            </span>
          </p>

          <div className="rail__actions">
            <ul className="rail__socials" aria-label="Social links">
              <li>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rail__social"
                  aria-label="LinkedIn profile"
                  title="LinkedIn"
                >
                  <LinkedInIcon size={18} />
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rail__social"
                  aria-label="GitHub profile"
                  title="GitHub (@EARL146)"
                >
                  <GitHubIcon size={19} />
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.gmail}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rail__social"
                  aria-label="Email via Gmail"
                  title="Email earlypajo@gmail.com"
                >
                  <MailSolidIcon size={18} />
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.v1}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rail__social"
                  aria-label="Portfolio Version 1.0"
                  title="Portfolio Version 1.0 (SVG)"
                >
                  <CodeBracketIcon size={18} />
                </a>
              </li>
            </ul>

            <button
              type="button"
              className="rail__theme"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
            >
              <ThemeToggleIcon theme={theme} size={18} />
            </button>
          </div>

          <nav className="rail__nav" aria-label="Main navigation">
            <ul>
              {NAV.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="rail__link" exact={item.path === '/'}>
                    <RailIcon name={item.icon} size={21} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <button type="button" className="rail__link rail__link--button" onClick={onOpenResume}>
                  <RailIcon name="resume" size={21} />
                  <span>Resume / CV</span>
                </button>
              </li>
            </ul>
          </nav>

          <footer className="rail__copy">
            <p>© {new Date().getFullYear()}</p>
            <p>{PROFILE.name}. All rights reserved.</p>
          </footer>
        </div>
      </aside>
    </>
  );
}
