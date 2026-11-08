import { Home, FolderOpen, Layers, Coffee, Star, User, MessageCircle, FileText } from 'lucide-react';
import React from 'react';
import { JAVA_LOGO } from '../data/site';

/* Scalloped blue verified seal (#0866FF) matching BrewedOps */
export function VerifiedBadge({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-label="Verified"
      role="img"
    >
      <path
        d="M12 1.75l2.38 1.54 2.83-.3 1.07 2.64 2.64 1.07-.3 2.83L22.16 12l-1.54 2.38.3 2.83-2.64 1.07-1.07 2.64-2.83-.3L12 22.16l-2.38-1.54-2.83.3-1.07-2.64-2.64-1.07.3-2.83L1.84 12l1.54-2.38-.3-2.83 2.64-1.07 1.07-2.64 2.83.3L12 1.75z"
        fill="var(--verified, #0866FF)"
      />
      <path
        d="M8.5 12.3l2.25 2.25 4.85-4.95"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Linear (stroke) navigation icons — matches the current BrewedOps rail */
const RAIL_ICONS = {
  home: Home,
  projects: FolderOpen,
  services: Layers,
  lab: Coffee,
  certificates: Star,
  about: User,
  contact: MessageCircle,
  resume: FileText
};

export function RailIcon({ name, size = 21 }) {
  const Glyph = RAIL_ICONS[name];
  if (!Glyph) return null;
  return <Glyph className="ricon" size={size} strokeWidth={1.7} aria-hidden="true" />;
}

export function LinkedInIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
    </svg>
  );
}

export function GitHubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export function MailSolidIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.75 5.25A2.25 2.25 0 0 0 1.5 7.5v9a2.25 2.25 0 0 0 2.25 2.25h16.5a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H3.75zm.87 2.13a.75.75 0 0 1 1.05-.13L12 12.05l6.33-4.8a.75.75 0 1 1 .92 1.19l-6.79 5.15a.75.75 0 0 1-.92 0L4.75 8.44a.75.75 0 0 1-.13-1.06z" />
    </svg>
  );
}

export function CodeBracketIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export function ThemeToggleIcon({ theme, size = 18 }) {
  if (theme === 'dark') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" fill="currentColor" />
        <path
          d="M12 2.5v2.2M12 19.3v2.2M4.93 4.93l1.56 1.56M17.51 17.51l1.56 1.56M2.5 12h2.2M19.3 12h2.2M4.93 19.07l1.56-1.56M17.51 6.49l1.56-1.56"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.354 15.354A9 9 0 0 1 8.646 3.646 9.003 9.003 0 0 0 12 21a9.003 9.003 0 0 0 8.354-5.646z" />
    </svg>
  );
}

export function ArrowUpRightIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

/* Renders simple-icons objects, 'java' string, or { src, icon } objects */
export function BrandIcon({ item, size = 20, forceLight = false }) {
  if (!item) return null;
  if (item === 'java' || item?.src) {
    const src = item === 'java' ? JAVA_LOGO : item.src;
    return (
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        style={{ width: size, height: size, objectFit: 'contain' }}
        aria-hidden="true"
      />
    );
  }

  const iconObj = item.icon || item;
  if (!iconObj?.path) return null;

  const hex = (iconObj.hex || '').toUpperCase();
  const isNearBlack = hex === '000000' || hex === '181717' || hex === '010101';
  const fill = isNearBlack && !forceLight ? 'currentColor' : `#${iconObj.hex}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ width: size, height: size, flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d={iconObj.path} fill={fill} />
    </svg>
  );
}

/* Blue squircle card badge icons used across Home & Services bento cards */
export function CardSquircleIcon({ kind }) {
  return (
    <span className="bento-squircle" aria-hidden="true">
      {kind === 'projects' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h3.4l2 2h7.6A2.5 2.5 0 0 1 21 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-10z" fill="#fff" fillOpacity=".92" />
          <path d="M9 14h6" stroke="#0059B3" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
      {kind === 'stack' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="6" width="16" height="13" rx="4" fill="#fff" fillOpacity=".92" />
          <circle cx="9.5" cy="12" r="1.4" fill="#0059B3" />
          <circle cx="14.5" cy="12" r="1.4" fill="#0059B3" />
          <path d="M12 3v3M9.5 15.5h5" stroke="#0059B3" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )}
      {kind === 'credentials' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="10" r="5.5" fill="#fff" fillOpacity=".95" />
          <path d="M9 14.8L7.8 21l4.2-2.1L16.2 21 15 14.8" fill="#fff" fillOpacity=".65" />
          <circle cx="12" cy="10" r="2.2" fill="#0059B3" />
        </svg>
      )}
      {kind === 'services' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 4L4 8l8 4 8-4-8-4z" fill="#fff" />
          <path d="M4 12.2l8 4 8-4" stroke="#fff" strokeOpacity=".75" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 16.2l8 4 8-4" stroke="#fff" strokeOpacity=".5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {kind === 'journey' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M7.5 11.5C7.5 9 9.2 7.5 11 7.5v3h-1.8v4H6.5v-3zm7.5 0c0-2.5 1.7-4 3.5-4v3h-1.8v4H14v-3z" fill="#fff" />
        </svg>
      )}
    </span>
  );
}
