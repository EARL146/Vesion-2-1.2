import React from 'react';
import { FileText, Globe, Server, Database, Smartphone, Workflow } from 'lucide-react';
import { Link } from '../lib/router';
import { HOME, PROFILE, TOOLS } from '../data/site';
import { ArrowUpRightIcon, BrandIcon, CardSquircleIcon, VerifiedBadge } from '../components/Icons';
import MobileHome from '../components/MobileHome';

export default function HomePage({ onOpenResume, onOpenProject }) {
  return (
    <section className="home" aria-label="Home overview">
      <MobileHome onOpenResume={onOpenResume} />

      {/* Top Headline + Pill CTA */}
      <header className="home__head">
        <div className="home__headline">
          <h2 className="home__title">
            <span className="home__line">{HOME.title}</span>
          </h2>

          <Link to="/contact" className="home__cta">
            <span>Get in touch</span>
            <ArrowUpRightIcon size={15} />
          </Link>
        </div>

        <p className="home__lede">{HOME.subtitle}</p>
      </header>

      {/* Daily Drivers Strip */}
      <div className="home__glass home__glass--tools">
        <div className="home__tools">
          <div className="home__tools-head">
            <span className="home__tools-eyebrow">Daily drivers</span>
            <span className="home__tools-label">Tools I work with</span>
          </div>

          <div className="tools-bar" role="list" aria-label="Daily tools and languages">
            {TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="tools-bar__item"
                role="listitem"
                aria-label={tool.name}
                title={tool.name}
              >
                <span className="tools-bar__tile">
                  <BrandIcon item={tool} size={22} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main 4×2 Bento Showcase */}
      <div className="home__glass home__glass--showcase">
        <div className="bento-home">
          {/* 1. Left Tall Signature Identity Card */}
          <div className="intro-tile">
            <button
              type="button"
              className="intro-tile__pill"
              onClick={onOpenResume}
              title="Open Printable Resume / CV"
            >
              <FileText size={13} />
              <span>Resume</span>
            </button>

            <div className="intro-tile__photo-frame">
              <div className="intro-tile__photo-inner">
                <img src={PROFILE.photo} alt={`Portrait of ${PROFILE.name}`} />
              </div>
              <span className="intro-tile__verified" aria-hidden="true">
                <VerifiedBadge size={24} />
              </span>
            </div>

            <div className="intro-tile__copy">
              <span className="intro-tile__kicker">HI, I&apos;M</span>
              <h3 className="intro-tile__name">{PROFILE.name}</h3>
              <div className="intro-tile__rule" />
              <p className="intro-tile__roles">
                FULL-STACK DEV &nbsp;·&nbsp; JAVA &amp; NODE
                <br />
                FLUTTER &nbsp;·&nbsp; DAVAO DE ORO
              </p>
              <p className="intro-tile__quote">
                <span>Thoughtful code.</span>
                <strong>Built to last.</strong>
              </p>
            </div>

            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="intro-tile__foot"
            >
              <span className="intro-tile__mark">EP</span>
              <span>github.com/EARL146 · Follow</span>
            </a>
          </div>

          {/* 2. Top-Middle Wide Card: Projects */}
          <Link to="/projects" className="bento-card bento-card--projects">
            <div className="bento-card__copy">
              <div className="bento-card__head">
                <CardSquircleIcon kind="projects" />
                <h3 className="bento-card__title">Projects</h3>
              </div>
              <p className="bento-card__desc">
                Web apps, APIs and mobile builds crafted to solve real problems.
              </p>
            </div>

            <div className="bento-shots" aria-hidden="true">
              <div
                className="bento-win bento-win--top"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenProject('motofix');
                }}
              >
                <div className="bento-win__bar">
                  <i /><i /><i />
                </div>
                <img src="./projects/motofix.png" alt="" />
              </div>

              <div
                className="bento-win bento-win--bottom"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenProject('pharmacare');
                }}
              >
                <div className="bento-win__bar">
                  <i /><i /><i />
                </div>
                <img src="./projects/pharmacare.png" alt="" />
              </div>
            </div>
          </Link>

          {/* 3. Top-Right Card: Core Stack / Dev Lab */}
          <Link to="/lab" className="bento-card bento-card--builds">
            <div className="bento-card__head">
              <CardSquircleIcon kind="stack" />
              <h3 className="bento-card__title">Dev Lab</h3>
            </div>
            <p className="bento-card__desc">
              Portfolio v1 &amp; v2, 3D cylinder reel and the stack running them.
            </p>

            <div className="bento-pills">
              <div className="bento-pills__row">
                <span className="bento-pill">
                  <BrandIcon item="java" size={14} />
                  <span>Java 21</span>
                  <i className="bento-pill__dot" />
                </span>
                <span className="bento-pill">
                  <BrandIcon item={TOOLS[1]} size={14} />
                  <span>Spring Boot</span>
                </span>
              </div>
              <span className="bento-pill bento-pill--wide">
                <BrandIcon item={TOOLS[5]} size={14} />
                <span>Portfolio v1 &amp; 3D Project Reel</span>
              </span>
            </div>
          </Link>

          {/* 4. Bottom-Middle-Left Card: Credentials */}
          <Link to="/certificates" className="bento-card bento-card--creds">
            <div className="bento-card__head">
              <CardSquircleIcon kind="credentials" />
              <h3 className="bento-card__title">Credentials</h3>
            </div>
            <p className="bento-card__desc">
              12 verified tech certificates. BSIT Undergraduate.
            </p>

            <div className="cred-medallion-wrap">
              <div className="cred-medallion">
                <div className="cred-medallion__inner">
                  <span className="cred-medallion__top">VERIFIED</span>
                  <strong className="cred-medallion__mid">12× CERTS</strong>
                  <span className="cred-medallion__bot">TECH &amp; AI</span>
                </div>
              </div>
              <span className="cred-pill">
                <VerifiedBadge size={14} />
                <span>12 Certificates</span>
              </span>
            </div>
          </Link>

          {/* 5. Bottom-Middle-Right Card: Services */}
          <Link to="/services" className="bento-card bento-card--services">
            <div className="bento-card__head">
              <CardSquircleIcon kind="services" />
              <h3 className="bento-card__title">Services</h3>
            </div>
            <p className="bento-card__desc">
              What I build for clients, teams and capstone systems.
            </p>

            <ul className="bento-slist">
              <li>
                <span className="bento-slist__icon"><Globe size={13} /></span>
                <span className="bento-slist__name">Websites</span>
                <span className="bento-slist__num">01</span>
              </li>
              <li>
                <span className="bento-slist__icon"><Server size={13} /></span>
                <span className="bento-slist__name">Backend &amp; APIs</span>
                <span className="bento-slist__num">02</span>
              </li>
              <li>
                <span className="bento-slist__icon"><Database size={13} /></span>
                <span className="bento-slist__name">MySQL Setup</span>
                <span className="bento-slist__num">03</span>
              </li>
              <li>
                <span className="bento-slist__icon"><Smartphone size={13} /></span>
                <span className="bento-slist__name">Flutter Apps</span>
                <span className="bento-slist__num">04</span>
              </li>
              <li>
                <span className="bento-slist__icon"><Workflow size={13} /></span>
                <span className="bento-slist__name">Workflows</span>
                <span className="bento-slist__num">05</span>
              </li>
            </ul>
          </Link>

          {/* 6. Bottom-Right Card: Background / Journey */}
          <Link to="/about" className="bento-card bento-card--reviews">
            <div className="bento-card__head">
              <CardSquircleIcon kind="journey" />
              <h3 className="bento-card__title">Journey</h3>
            </div>
            <p className="bento-card__desc">
              How I grew from SHS programming into full-stack builds.
            </p>

            <div className="bento-ledger-mini">
              <div className="bento-ledger-mini__card">
                <div className="bento-ledger-mini__top">
                  <span className="bento-ledger-mini__dot">BS</span>
                  <strong>BSIT Student</strong>
                </div>
                <p>Legacy Compostela College</p>
                <span className="bento-ledger-mini__tags">
                  Java 21 · Spring Boot · Node.js
                </span>
              </div>

              <div className="bento-ledger-mini__card bento-ledger-mini__card--peek">
                <div className="bento-ledger-mini__top">
                  <span className="bento-ledger-mini__dot bento-ledger-mini__dot--alt">ICT</span>
                  <strong>SHS TVL-ICT (2025)</strong>
                </div>
                <p>Computer Programming · VB.NET &amp; PHP</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
