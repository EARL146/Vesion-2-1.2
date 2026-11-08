import React from 'react';
import { FileText, ChevronRight, ShieldCheck } from 'lucide-react';
import { Link } from '../lib/router';
import { PROFILE } from '../data/site';
import { GitHubIcon, LinkedInIcon, MailSolidIcon, CodeBracketIcon } from './Icons';

const EXPLORE = [
  {
    n: '01',
    label: 'Projects',
    path: '/projects',
    title: 'Web apps, Java & mobile',
    desc: 'Real builds with source code on GitHub. Open a card to walk the work.'
  },
  {
    n: '02',
    label: 'Services',
    path: '/services',
    title: 'Plan. Build. Ship.',
    desc: 'Websites, REST APIs, MySQL & Flutter apps.'
  },
  {
    n: '03',
    label: 'Dev Lab',
    path: '/lab',
    title: 'Two portfolios, side by side',
    desc: 'v1 SVG, v2 React and the interactive 3D project reel.'
  },
  {
    n: '04',
    label: 'Certificates',
    path: '/certificates',
    title: 'Twelve verified credentials',
    desc: 'DataCamp, TESDA, OPSWAT, PyCon, Full Stack + AI and GHL.'
  },
  {
    n: '05',
    label: 'About',
    path: '/about',
    title: "Hi, I'm Earl.",
    desc: 'BSIT student at Legacy Compostela College, Davao de Oro.'
  }
];

function SocialRow({ className = '' }) {
  return (
    <ul className={`msocials ${className}`} aria-label="Social links">
      <li>
        <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <LinkedInIcon size={20} />
        </a>
      </li>
      <li>
        <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <GitHubIcon size={21} />
        </a>
      </li>
      <li>
        <a href={PROFILE.gmail} target="_blank" rel="noopener noreferrer" aria-label="Email via Gmail">
          <MailSolidIcon size={20} />
        </a>
      </li>
      <li>
        <a href={PROFILE.v1} target="_blank" rel="noopener noreferrer" aria-label="Portfolio Version 1.0">
          <CodeBracketIcon size={20} />
        </a>
      </li>
    </ul>
  );
}

/* Mobile home (< 1100px) — hero, numbered explore timeline, credential reel, footer */
export default function MobileHome({ onOpenResume }) {
  return (
    <div className="mhome">
      <section className="mhero" aria-label="Introduction">
        <div className="mhero__portrait">
          <img src={PROFILE.avatar} alt={`Illustrated portrait of ${PROFILE.name}`} />
        </div>

        <span className="mhero__kicker">FULL-STACK DEVELOPER · BSIT</span>
        <h2 className="mhero__title">
          <span>Thoughtful code.</span>
          <span>
            Built to <em>last.</em>
          </span>
        </h2>
        <p className="mhero__lede">
          I build full-stack web apps, REST APIs and mobile apps — from the database schema to the live deploy.
        </p>

        <SocialRow />

        <div className="mhero__cta">
          <Link to="/contact" className="mbtn mbtn--primary">
            Get in touch
          </Link>
          <button type="button" className="mbtn mbtn--ghost" onClick={onOpenResume}>
            <FileText size={17} />
            <span>Resume / CV</span>
          </button>
        </div>
      </section>

      <section className="msec" aria-label="Explore">
        <h3 className="msec__label">
          <span className="msec__num">01-05</span>
          <span className="msec__text">EXPLORE</span>
          <i className="msec__rule" />
        </h3>

        <ol className="mtimeline">
          {EXPLORE.map((item) => (
            <li key={item.n} className="mtimeline__item">
              <i className="mtimeline__node" aria-hidden="true" />
              <Link to={item.path} className="mtimeline__link">
                <span className="mtimeline__copy">
                  <span className="mtimeline__eyebrow">
                    {item.n} {item.label}
                  </span>
                  <strong className="mtimeline__title">{item.title}</strong>
                  <span className="mtimeline__desc">{item.desc}</span>
                </span>
                <ChevronRight size={18} className="mtimeline__go" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="msec" aria-label="Verified credentials">
        <h3 className="msec__label">
          <span className="msec__num">06</span>
          <span className="msec__text">VERIFIED CREDENTIALS</span>
          <i className="msec__rule" />
        </h3>

        <Link to="/certificates" className="mcert">
          <span className="mcert__media">
            <img src="./certificates/cert_fullstack_ai.png" alt="Full Stack + AI certificate" />
            <span className="mcert__badge">
              <ShieldCheck size={14} />12 certs
            </span>
          </span>
          <strong className="mcert__title">Twelve credentials, real coursework behind each.</strong>
          <span className="mcert__meta">DataCamp · TESDA · OPSWAT · PyCon Davao · Learn Technology Today · GHL</span>
        </Link>
      </section>

      <footer className="mfoot">
        <SocialRow className="msocials--foot" />
        <p>
          © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
