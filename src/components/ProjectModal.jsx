import React, { useEffect } from 'react';
import { X, CheckCircle2, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROJECTS } from '../data/site';
import { BrandIcon, GitHubIcon } from './Icons';

export default function ProjectModal({ projectId, onSelectProject, onClose }) {
  const currentIndex = PROJECTS.findIndex((p) => p.id === projectId);
  const project = currentIndex >= 0 ? PROJECTS[currentIndex] : null;

  useEffect(() => {
    if (!project) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        const next = PROJECTS[(currentIndex + 1) % PROJECTS.length];
        onSelectProject(next.id);
      }
      if (e.key === 'ArrowLeft') {
        const prev = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
        onSelectProject(prev.id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [project, currentIndex, onClose, onSelectProject]);

  if (!project) return null;

  const repoPath = project.github.replace(/^https?:\/\//, '');

  return (
    <div className="pmodal" onClick={onClose} role="presentation">
      <div
        className="ppanel ppanel--window"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pmodal-project-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top macOS Chrome Bar */}
        <div className="ppanel__bar">
          <span className="ppanel__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>

          <div className="ppanel__url" title={project.github}>
            <span className="ppanel__url-host">github.com</span>
            <span>/{repoPath.replace(/^github\.com\//, '')}</span>
          </div>

          <a
            href={project.liveDemo || project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="ppanel__ext"
          >
            <span>{project.liveDemo ? 'Open Live' : 'Open Repo'}</span>
            <ExternalLink size={12} />
          </a>

          <button
            type="button"
            className="pmodal__close-inline"
            onClick={onClose}
            aria-label="Close project preview"
          >
            <X size={17} />
          </button>
        </div>

        {/* Project Switcher Tabs */}
        <div className="ppanel__tabs" role="tablist" aria-label="Switch project">
          {PROJECTS.map((item) => {
            const selected = item.id === project.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                className="ppanel__tab"
                onClick={() => onSelectProject(item.id)}
              >
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Project Stage Body */}
        <div className="ppanel__scroll">
          <div className="pdetail">
            <div className={`pdetail__media ${project.phone ? 'pdetail__media--phone' : ''}`}>
              {project.phone ? (
                <div className="pdetail__phone">
                  <span className="pdetail__notch" aria-hidden="true" />
                  <img
                    src={project.image}
                    alt={project.imageAlt || `${project.title} screenshot`}
                  />
                </div>
              ) : (
                <img
                  src={project.image}
                  alt={project.imageAlt || `${project.title} screenshot`}
                />
              )}

              <div className="pdetail__arrows">
                <button
                  type="button"
                  onClick={() =>
                    onSelectProject(PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length].id)
                  }
                  aria-label="Previous project"
                >
                  <ChevronLeft size={18} />
                </button>
                <span>
                  {String(currentIndex + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  onClick={() => onSelectProject(PROJECTS[(currentIndex + 1) % PROJECTS.length].id)}
                  aria-label="Next project"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="pdetail__copy">
              <div className="pdetail__logos">
                {project.icons.map((ic, idx) => (
                  <span key={idx} className="bento__logo">
                    <BrandIcon item={ic} size={19} />
                  </span>
                ))}
                <span className="pdetail__cat">{project.category}</span>
              </div>

              <h2 id="pmodal-project-title" className="pdetail__title">
                {project.title}
              </h2>
              <p className="pdetail__sub">{project.subtitle}</p>
              <p className="pdetail__summary">{project.summary}</p>

              <ul className="pdetail__bullets">
                {project.bullets.map((b) => (
                  <li key={b}>
                    <CheckCircle2 size={16} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="pdetail__tags">
                {project.tech.map((t) => (
                  <span key={t} className="pdetail__tag">
                    {t}
                  </span>
                ))}
              </div>

              <div className="pdetail__actions">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill btn-pill--primary"
                >
                  <GitHubIcon size={16} />
                  <span>GitHub Repository</span>
                </a>

                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill btn-pill--ghost"
                  >
                    <span>Open Live Site</span>
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
