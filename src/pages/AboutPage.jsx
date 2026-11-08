import React from 'react';
import { GraduationCap, MapPin, Award } from 'lucide-react';
import {
  siHtml5,
  siJavascript,
  siNodedotjs,
  siSpringboot,
  siMysql,
  siFlutter,
  siDart,
  siPhp,
  siN8n,
  siGooglegemini,
  siGit
} from 'simple-icons';
import { Link } from '../lib/router';
import { PROFILE } from '../data/site';
import { ArrowUpRightIcon, BrandIcon } from '../components/Icons';

const CAPABILITIES = [
  {
    num: '01',
    title: 'Full-Stack Web Developer',
    icons: [siHtml5, siJavascript, siNodedotjs]
  },
  {
    num: '02',
    title: 'Java 21 & Spring Boot Backend',
    icons: ['java', siSpringboot, siMysql]
  },
  {
    num: '03',
    title: 'Flutter & Dart Mobile Developer',
    icons: [siFlutter, siDart, siPhp]
  },
  {
    num: '04',
    title: 'Workflow & AI Prototyping (Exploratory)',
    icons: [siN8n, siGooglegemini, siGit]
  }
];

export default function AboutPage() {
  return (
    <section className="page-view page-about" aria-label="About Earl Willan Pajo">
      <header className="view__head">
        <span className="view__eyebrow">ABOUT</span>
        <h2 className="view__title">Hi, I&apos;m Earl.</h2>
        <p className="view__lede">
          I build full-stack web apps, backend APIs and mobile interfaces with purpose and clean structure.
        </p>
      </header>

      <div className="sweep-glass agrid__shell">
        <div className="agrid__copy">
          <h3 className="agrid__lead">
            <strong>I started coding in 2025 in Senior High School,</strong>{' '}
            <span>
              learning VB.NET, PHP and MySQL from the ground up. Now I build full-stack systems end to end.
            </span>
          </h3>

          <p className="agrid__note">
            <strong>Legacy Compostela College</strong> is where I&apos;m advancing as a BSIT student after
            completing the TVL-ICT Computer Programming strand. Every build in my{' '}
            <Link to="/projects" className="agrid__link">project archive</Link> — from Java Spring Boot
            ordering platforms to Flutter mobile apps — was built hands-on to solve real problems.
          </p>

          <ul className="agrid__caps">
            {CAPABILITIES.map((cap) => (
              <li key={cap.num} className="agrid__cap">
                <div className="agrid__cap-marks">
                  {cap.icons.map((ic, idx) => (
                    <span key={idx} className="agrid__mark">
                      <BrandIcon item={ic} size={17} />
                    </span>
                  ))}
                </div>
                <strong className="agrid__cap-title">{cap.title}</strong>
                <span className="agrid__cap-index">{cap.num}</span>
              </li>
            ))}
          </ul>

          <div className="agrid__bar">
            <div className="agrid__cell">
              <span className="agrid__cell-mark">
                <GraduationCap size={18} />
              </span>
              <div className="agrid__cell-copy">
                <strong className="agrid__cell-title">BSIT Undergraduate</strong>
                <span className="agrid__cell-meta">LEGACY COMPOSTELA COLLEGE</span>
              </div>
            </div>

            <div className="agrid__cell">
              <span className="agrid__cell-mark">
                <MapPin size={18} />
              </span>
              <div className="agrid__cell-copy">
                <strong className="agrid__cell-title">Based in the Philippines</strong>
                <span className="agrid__cell-meta">DAVAO DE ORO · GMT+8</span>
              </div>
            </div>

            <Link to="/certificates" className="agrid__cell agrid__cell--wide">
              <span className="agrid__cell-mark">
                <Award size={18} />
              </span>
              <div className="agrid__cell-copy">
                <strong className="agrid__cell-title">12× Verified Tech Certificates</strong>
                <span className="agrid__cell-meta">DATACAMP · TESDA · OPSWAT · PYCON · FULL STACK + AI · GHL</span>
              </div>
              <span className="agrid__cell-go" aria-hidden="true">
                <ArrowUpRightIcon size={15} />
              </span>
            </Link>
          </div>
        </div>

        <div className="agrid__portrait" aria-hidden="true">
          <img src={PROFILE.deskIllustration} alt="" />
        </div>
      </div>
    </section>
  );
}
