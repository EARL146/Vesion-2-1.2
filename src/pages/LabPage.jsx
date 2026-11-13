import React, { useEffect, useState } from 'react';
import {
  ExternalLink,
  Layers,
  Boxes,
  Compass,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { PROFILE, PROJECTS, STACK_ROWS } from '../data/site';
import { ArrowUpRightIcon, BrandIcon, GitHubIcon } from '../components/Icons';

export default function LabPage({ onOpenProject }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [phClock, setPhClock] = useState('');
  const [reelIndex, setReelIndex] = useState(0);
  const [iframeReady, setIframeReady] = useState(false);

  useEffect(() => {
    const tick = () => {
      const str = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Manila',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(new Date());
      setPhClock(str);
    };
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  const currentProject = PROJECTS[reelIndex];

  return (
    <section className="page-view page-lab" aria-label="Dev Lab and Portfolio Evolution">
      <header className="view__head view__head--split">
        <div>
          <span className="view__eyebrow">DEV LAB</span>
          <h2 className="view__title">Two generations of my portfolio, side by side.</h2>
          <p className="view__lede">
            Inspect the v1 to v2 evolution, spin the interactive 3D project reel, or test Version 1.0 live.
          </p>
        </div>

        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="lab-gh-badge"
        >
          <span className="lab-gh-badge__eyebrow">OPEN SOURCE · @EARL146</span>
          <div className="lab-gh-badge__card">
            <GitHubIcon size={18} />
            <div>
              <strong>{PROJECTS.length} projects on GitHub</strong>
              <span>Java 21 · Node.js · Flutter · Web</span>
            </div>
            <ArrowUpRightIcon size={14} />
          </div>
        </a>
      </header>

      <div className="sweep-glass lab-shell">
        {/* Flagship Header */}
        <div className="lab-head">
          <div className="lab-head__brand">
            <span className="view__eyebrow">FLAGSHIP BUILD</span>
            <h3 className="lab-head__name">Portfolio.v2</h3>
          </div>

          <p className="lab-head__desc">
            Rebuilt from the ground up as a routed React 18 &amp; Vite workspace. Combines a persistent
            split-rail shell, dual cream &amp; deep-navy themes, interactive project and certificate
            inspectors, a printable CV sheet, and a live bridge to my original SVG portfolio.
          </p>

          <a
            href={PROFILE.v1}
            target="_blank"
            rel="noopener noreferrer"
            className="home__cta"
          >
            <span>Open Version 1.0</span>
            <ArrowUpRightIcon size={15} />
          </a>
        </div>

        <hr className="lab-divider" />

        {/* Interactive macOS Workspace Window */}
        <div className="lab-window">
          <div className="lab-window__chrome">
            <span className="ppanel__dots" aria-hidden="true">
              <i /><i /><i />
            </span>
            <div className="lab-window__url">
              <strong>earlnis.dev</strong>
              <span>/{activeTab}</span>
            </div>
          </div>

          <div className="lab-app">
            {/* Inner Workspace Sidebar */}
            <aside className="lab-app__side" aria-label="Workspace views">
              <div className="lab-app__logo">
                <span className="lab-app__mark">EP</span>
                <span>
                  Earl<strong>Lab</strong>
                </span>
              </div>

              <div className="lab-app__clocks">
                <div>
                  <strong>{phClock || 'PHT'}</strong>
                  <span>Davao · GMT+8</span>
                </div>
              </div>

              <div className="lab-app__nav">
                <button
                  type="button"
                  className={`lab-app__tab ${activeTab === 'overview' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <Compass size={15} />
                  <span>Overview &amp; Stack</span>
                </button>
                <button
                  type="button"
                  className={`lab-app__tab ${activeTab === 'cylinder' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('cylinder')}
                >
                  <Boxes size={15} />
                  <span>3D Project Reel</span>
                </button>
                <button
                  type="button"
                  className={`lab-app__tab ${activeTab === 'v1-live' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('v1-live')}
                >
                  <Layers size={15} />
                  <span>Live Portfolio v1</span>
                </button>
              </div>

              <div className="lab-app__note">
                <span>SHORTCUT</span>
                <a href={PROFILE.v1Repo} target="_blank" rel="noopener noreferrer">
                  View v1 source code ↗
                </a>
              </div>
            </aside>

            {/* Inner Workspace Main Pane */}
            <div className="lab-app__main">
              <div className="lab-app__topbar">
                <strong>
                  {activeTab === 'overview' && 'Evolution & Core Stack'}
                  {activeTab === 'cylinder' && 'Interactive 3D Project Cylinder'}
                  {activeTab === 'v1-live' && 'Portfolio Version 1.0 — Live Preview'}
                </strong>
                <div className="lab-app__badges">
                  <span className="lab-status-pill">
                    <i /> React 18 + Vite
                  </span>
                  <span className="lab-pro-pill">
                    <Sparkles size={12} /> v2.0
                  </span>
                </div>
              </div>

              {activeTab === 'overview' && (
                <div className="lab-pane">
                  <div className="lab-greeting">
                    <span>Legacy Compostela College · BSIT</span>
                    <h4>Two builds. Clear progression.</h4>
                    <p>Every generation taught me cleaner structure, stronger backend integration and sharper UI.</p>
                  </div>

                  <div className="lab-status-box">
                    <span className="lab-status-box__label">TODAY</span>
                    <p>
                      <CheckCircle2 size={15} />
                      <span>All {PROJECTS.length} repositories documented, 12 credentials verified, static build ready for GitHub Pages.</span>
                    </p>
                  </div>

                  <div className="lab-versions">
                    <article className="lab-ver-card is-current">
                      <div className="lab-ver-card__meta">
                        <strong>2026</strong>
                        <span className="lab-tag lab-tag--new">CURRENT FLAGSHIP</span>
                      </div>
                      <div>
                        <h5>Version 2.0 — Routed Bento Workspace</h5>
                        <p>
                          Built with React 18, Vite, custom client-side routing, dual light/dark palette,
                          interactive project &amp; certificate modals, and a print-ready Resume / CV sheet.
                        </p>
                      </div>
                    </article>

                    <article className="lab-ver-card">
                      <div className="lab-ver-card__meta">
                        <strong>2025</strong>
                        <span className="lab-tag">ORIGINAL BUILD</span>
                      </div>
                      <div>
                        <h5>Version 1.0 — Interactive SVG Portfolio</h5>
                        <p>
                          Hand-crafted with browser-native HTML5, CSS3, Vanilla JavaScript and custom vector
                          animations, hosted on GitHub Pages.
                        </p>
                        <div className="lab-ver-card__links">
                          <button type="button" onClick={() => setActiveTab('v1-live')}>
                            Preview inside window →
                          </button>
                          <a href={PROFILE.v1} target="_blank" rel="noopener noreferrer">
                            earl146.github.io/svgportfolio <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                    </article>
                  </div>

                  <div className="lab-stack">
                    <h5>Full technology inventory</h5>
                    <div className="lab-stack__chips">
                      {STACK_ROWS.flat().map((item) => (
                        <span key={item.name} className="lab-stack__chip">
                          <BrandIcon item={item} size={15} />
                          <span>{item.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'cylinder' && (
                <div className="lab-pane lab-cylinder">
                  <div className="cylinder-stage">
                    <div className="cylinder-ring">
                      {PROJECTS.map((proj, idx) => {
                        const offset = idx - reelIndex;
                        const wrapped =
                          offset > PROJECTS.length / 2
                            ? offset - PROJECTS.length
                            : offset < -PROJECTS.length / 2
                            ? offset + PROJECTS.length
                            : offset;
                        const abs = Math.abs(wrapped);
                        if (abs > 2) return null;
                        return (
                          <button
                            key={proj.id}
                            type="button"
                            className={`cylinder-card ${wrapped === 0 ? 'is-center' : ''}`}
                            style={{
                              '--slot': wrapped,
                              zIndex: 10 - abs
                            }}
                            onClick={() =>
                              wrapped === 0 ? onOpenProject(proj.id) : setReelIndex(idx)
                            }
                          >
                            <div className="cylinder-card__img">
                              <img src={proj.image} alt={proj.title} />
                            </div>
                            <div className="cylinder-card__foot">
                              <strong>{proj.title}</strong>
                              <span>{proj.category}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="cylinder-controls">
                    <button
                      type="button"
                      className="cylinder-btn"
                      onClick={() =>
                        setReelIndex((i) => (i - 1 + PROJECTS.length) % PROJECTS.length)
                      }
                      aria-label="Previous project"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <div className="cylinder-info">
                      <strong>{currentProject.title}</strong>
                      <span>{currentProject.subtitle}</span>
                    </div>

                    <button
                      type="button"
                      className="cylinder-btn"
                      onClick={() => setReelIndex((i) => (i + 1) % PROJECTS.length)}
                      aria-label="Next project"
                    >
                      <ChevronRight size={18} />
                    </button>

                    <button
                      type="button"
                      className="btn-pill btn-pill--primary"
                      onClick={() => onOpenProject(currentProject.id)}
                    >
                      <span>Inspect {currentProject.title}</span>
                      <ArrowUpRightIcon size={14} />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'v1-live' && (
                <div className="lab-iframe-wrap">
                  {!iframeReady && <div className="ppanel__skeleton" aria-hidden="true" />}
                  <iframe
                    src={PROFILE.v1}
                    title="Earl Pajo Portfolio Version 1.0"
                    className="lab-iframe"
                    data-ready={iframeReady}
                    onLoad={() => setIframeReady(true)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
