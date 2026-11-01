import React, { useEffect, useState } from 'react';
import { FolderGit2, ExternalLink, Github, CheckCircle2, X } from 'lucide-react';

const ALL_PROJECTS = [
  {
    id: 'motofix',
    title: 'MotoFix — Motorcycle Parts E-Commerce',
    category: 'Full-Stack Web',
    filterTag: 'fullstack',
    image: './projects/motofix.png',
    github: 'https://github.com/EARL146/motofix_fixed',
    tech: ['Node.js', 'Express.js', 'MySQL'],
    summary: 'A motorcycle parts e-commerce platform built with Node.js, Express, and MySQL.',
    bullets: [
      'Full-stack storefront for motorcycle parts and accessories.',
      'Node.js and Express backend with a MySQL database.',
      'Project repository is available on GitHub.'
    ]
  },
  {
    id: 'burgerbites',
    title: 'BurgerBites — Mobile Food Ordering',
    category: 'Mobile Application',
    filterTag: 'mobile',
    image: './projects/burgerbites.png',
    imagePosition: 'center 32%',
    github: 'https://github.com/EARL146/app-',
    tech: ['Flutter', 'Dart', 'PHP', 'MySQL'],
    summary: 'A Flutter and Dart food-ordering app connected to a PHP and MySQL API.',
    bullets: [
      'Cross-platform mobile ordering interface.',
      'PHP API backed by MySQL.',
      'Project source is available on GitHub.'
    ]
  },
  {
    id: 'pharmacare',
    title: 'PharmaCare — Healthcare Portal',
    category: 'Full-Stack Web',
    filterTag: 'fullstack',
    image: './projects/pharmacare.png',
    github: 'https://github.com/EARL146/01.2',
    tech: ['Next.js', 'TypeScript'],
    summary: 'A healthcare portal built with Next.js and TypeScript.',
    bullets: [
      'Healthcare-focused web portal.',
      'Built with Next.js and TypeScript.',
      'Project source is available on GitHub.'
    ]
  },
  {
    id: 'streetfood',
    title: 'StreetFood — Java Desktop Ordering System',
    category: 'Backend / Java',
    filterTag: 'backend',
    image: './projects/streetfood-preview.svg',
    imageAlt: 'Illustrated preview of the StreetFood desktop ordering system',
    github: 'https://github.com/EARL146/JAVA-SYSTEM',
    tech: ['Java 21', 'FlatLaf Swing'],
    summary: 'A desktop ordering system built with Java 21 and FlatLaf Swing.',
    bullets: [
      'Desktop ordering application.',
      'Java 21 user interface using FlatLaf Swing.',
      'Project source is available on GitHub.'
    ]
  },
  {
    id: 'hitohouse',
    title: 'HitoHouse — Commercial Catfish Ordering',
    category: 'Backend / Java',
    filterTag: 'backend',
    image: './projects/hitohouse.png',
    github: 'https://github.com/EARL146/JAVA-SYSTEM',
    tech: ['Java', 'Spring Boot'],
    summary: 'A commercial catfish ordering project built with Java Spring Boot.',
    bullets: [
      'Online ordering experience for a commercial catfish business.',
      'Java Spring Boot application.',
      'Project source is available on GitHub.'
    ]
  },
  {
    id: 'barbergo',
    title: 'BarberGo — Client Barbershop Landing Page',
    category: 'Client Solutions',
    filterTag: 'client',
    image: './projects/barbergo-page.png',
    github: 'https://github.com/EARL146/freelancer-files',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    summary: 'A responsive landing page created for a barbershop client.',
    bullets: [
      'Client-facing barbershop web page.',
      'Built with HTML, CSS, and JavaScript.',
      'Project files are available on GitHub.'
    ]
  },
  {
    id: 'portfolio-v1',
    title: 'Portfolio Version 1.0 — Interactive SVG',
    category: 'Portfolio',
    filterTag: null,
    image: './projects/svgportfolio-preview.svg',
    imageAlt: 'Illustrated preview of Portfolio Version 1.0',
    github: 'https://github.com/EARL146/svgportfolio',
    liveDemo: 'https://earl146.github.io/svgportfolio',
    tech: ['HTML', 'CSS', 'JavaScript', 'SVG'],
    summary: 'The original interactive portfolio, built with SVG, HTML, CSS, and JavaScript.',
    bullets: [
      'Original portfolio version with interactive SVG graphics.',
      'Built with browser-native web technologies.',
      'Hosted on GitHub Pages.'
    ]
  }
];

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'fullstack', label: 'Full-Stack' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'backend', label: 'Backend/Java' },
  { key: 'client', label: 'Client Solutions' }
];

export default function ProjectsSection() {
  const [filter, setFilter] = useState('all');
  const [activeProject, setActiveProject] = useState(null);
  const filtered = filter === 'all' ? ALL_PROJECTS : ALL_PROJECTS.filter((project) => project.filterTag === filter);

  useEffect(() => {
    if (!activeProject) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActiveProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeProject]);

  return (
    <section id="projects" className="projects-section">
      <div className="section-tag">
        <FolderGit2 size={14} /> 03 / Projects &amp; Work
      </div>
      <h2 className="section-title">Selected Projects</h2>
      <p className="section-desc">
        A selection of web, mobile, Java, and client projects, with project images and repository links.
      </p>

      <div className="filter-pill-bar" role="group" aria-label="Filter projects by category">
        {FILTERS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`filter-btn ${filter === tab.key ? 'is-active' : ''}`}
            aria-pressed={filter === tab.key}
            onClick={() => setFilter(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="projects-grid" aria-live="polite">
        {filtered.map((project) => (
          <article key={project.id} className="project-card glass-card">
            <div className="project-card-media">
              <img
                src={project.image}
                alt={project.imageAlt || `${project.title} project screenshot`}
                className="project-card-img"
                style={{ objectPosition: project.imagePosition || 'center' }}
                loading="lazy"
              />
              <span className="project-category-badge">{project.category}</span>
            </div>

            <div className="project-card-content">
              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-summary">{project.summary}</p>
              <ul className="project-bullet-list">
                {project.bullets.map((bullet) => (
                  <li key={bullet} className="project-bullet-item">
                    <CheckCircle2 size={14} className="bullet-check" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="project-tech-tags">
                {project.tech.map((technology) => <span key={technology} className="tech-badge">{technology}</span>)}
              </div>

              <div className="project-card-footer">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                  <Github size={16} />
                  <span>GitHub Repository</span>
                </a>
                <button type="button" className="project-link-btn project-link-btn--demo project-link-btn--button" onClick={() => setActiveProject(project)}>
                  <ExternalLink size={16} />
                  <span>Live Demo / Details</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {activeProject && (
        <div className="project-detail-backdrop" onClick={() => setActiveProject(null)}>
          <div className="project-detail-modal glass-card" role="dialog" aria-modal="true" aria-labelledby="project-detail-title" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="project-detail-close" onClick={() => setActiveProject(null)} aria-label="Close project details">
              <X size={19} />
            </button>
            <div className="project-detail-grid">
              <img
                src={activeProject.image}
                alt={activeProject.imageAlt || `${activeProject.title} project screenshot`}
                className={`project-detail-image${activeProject.id === 'burgerbites' ? ' project-detail-image--contain' : ''}`}
              />
              <div className="project-detail-copy">
                <span className="project-category-badge">{activeProject.category}</span>
                <h3 id="project-detail-title">{activeProject.title}</h3>
                <p>{activeProject.summary}</p>
                <div className="project-tech-tags">
                  {activeProject.tech.map((technology) => <span key={technology} className="tech-badge">{technology}</span>)}
                </div>
                <div className="project-card-footer">
                  <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                    <Github size={16} /> GitHub Repository
                  </a>
                  {activeProject.liveDemo && (
                    <a href={activeProject.liveDemo} target="_blank" rel="noopener noreferrer" className="project-link-btn project-link-btn--demo">
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
