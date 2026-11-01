import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Layers, 
  Award, 
  ArrowUpRight, 
  ExternalLink,
  Github,
  Linkedin,
  FileText,
  CheckCircle
} from 'lucide-react';

export default function BentoGrid() {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(now));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="overview" className="bento-section">
      <div className="section-tag">
        <Sparkles size={14} /> 01 / Identity & Foundations
      </div>

      <div className="bento-grid">
        
        {/* Large Main Intro Card */}
        <div className="bento-card bento-card--hero glass-card">
          <div className="bento-hero-top">
            <span className="live-status-pill">
              <span className="live-pulse" /> Open for Projects
            </span>
            <span className="journey-pill">
              <Sparkles size={12} /> Coding Since 2025 · Present
            </span>
            <span className="ph-time-tag">Compostela, Davao de Oro • {timeStr || 'GMT+8'}</span>
          </div>

          <p className="hero-role-label">Full-Stack Developer &amp; Systems Automation · BSIT Student</p>
          <h2 className="bento-hero-headline">
            Hi, I'm <span className="highlight-text">Earl Willan</span>.
          </h2>
          <p className="bento-hero-tagline">
            Thoughtful development, one project at a time. Technology with purpose.
          </p>

          <p className="bento-hero-body">
            BSIT student and full-stack software engineer whose coding journey started in 2025 during Senior High School (TVL-ICT: Computer Programming strand, where I learned VB.NET and simple websites in Grade 11, and HTML, CSS, JavaScript, PHP, and phpMyAdmin/MySQL in Grade 12). From creating foundational projects then to architecting production-ready full-stack applications today with Java 21, Spring Boot, Node.js, Express.js, and MySQL.
          </p>

          <div className="bento-hero-actions">
            <a href="#projects" className="btn btn--primary">
              <span>View Projects</span>
              <ArrowUpRight size={16} />
            </a>
            <button 
              type="button" 
              className="btn btn--secondary"
              onClick={() => window.dispatchEvent(new CustomEvent('open-resume'))}
              title="Open Earlnis Pajo's Resume & CV"
            >
              <FileText size={16} />
              <span>View Resume</span>
            </button>
            <a 
              href="https://www.linkedin.com/in/earlnis-pajo-272840432" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn--icon-link"
              title="LinkedIn Profile (Earlnis Pajo)"
            >
              <Linkedin size={18} />
            </a>
            <a 
              href="https://github.com/EARL146" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn--icon-link"
              title="GitHub Profile"
            >
              <Github size={18} />
            </a>
          </div>
        </div>

        {/* About Me Card with User's Photo (Kenneth Villar Style) */}
        <div className="bento-card bento-card--about glass-card">
          <div className="about-card-split">
            <div className="about-photo-wrapper">
              <img 
                src="./portrait-nobg.png" 
                alt="Earlnis Willan Pajo" 
                className="about-portrait-img"
              />
              <span className="about-photo-tag">Developer</span>
            </div>
            <div className="about-text-content">
              <div className="bento-card-icon-header">
                <span className="card-kicker">About Me</span>
              </div>
              <h3 className="bento-card-title">Earlnis Willan Agang Pajo</h3>
              <p className="about-location">Legacy Compostela College · Philippines</p>
              <p className="about-bio-text">
                Started coding in 2025 in Senior High School (TVL-ICT: Computer Programming), building desktop systems in VB.NET (Grade 11) and dynamic web apps with PHP, JS, and phpMyAdmin/MySQL (Grade 12). Now advancing as a BSIT undergraduate engineering scalable systems for businesses and clients.
              </p>
              <div className="about-social-badges">
                <span className="bento-chip bento-chip--journey" title="From TVL-ICT Computer Programming in 2025 to BSIT Undergraduate">
                  SHS TVL-ICT (2025) → BSIT
                </span>
                <a href="https://www.linkedin.com/in/earlnis-pajo-272840432" target="_blank" rel="noopener noreferrer" className="bento-chip bento-chip--accent">
                  <Linkedin size={12} /> LinkedIn
                </a>
                <a href="https://github.com/EARL146" target="_blank" rel="noopener noreferrer" className="bento-chip">
                  <Github size={12} /> @EARL146
                </a>
                <button 
                  type="button" 
                  className="bento-chip bento-chip--resume"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-resume'))}
                >
                  <FileText size={12} /> Resume / CV
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Generations: Version 1 vs Version 2 */}
        <div id="versions" className="bento-card bento-card--versions glass-card">
          <div className="bento-card-icon-header">
            <Layers size={22} className="card-icon" />
            <span className="card-kicker">Portfolio Evolution</span>
          </div>

          <h3 className="bento-card-title">Two Generations of My Portfolio</h3>
          <p className="bento-card-sub">
            From the initial SVG-animated showcase to this 3D WebGL & Bento Grid flagship.
          </p>

          <div className="versions-comparison-grid">
            
            {/* Version 1 Card */}
            <div className="version-item-box">
              <div className="version-head">
                <span className="version-badge version-badge--v1">Version 1.0</span>
                <span className="version-date">Original Build</span>
              </div>
              <h4 className="version-title">SVG Interactive Portfolio</h4>
              <p className="version-desc">
                Creative frontend portfolio featuring custom SVG vector graphics, fluid animations, dynamic typography, and dark mode.
              </p>
              <ul className="version-points">
                <li>• Custom interactive SVG icons</li>
                <li>• Pure HTML, CSS, and Vanilla JavaScript</li>
                <li>• Hosted on GitHub Pages</li>
              </ul>
              <div className="version-links">
                <a 
                  href="https://earl146.github.io/svgportfolio" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="version-btn version-btn--live"
                >
                  <ExternalLink size={13} />
                  <span>Open Version 1</span>
                </a>
                <a 
                  href="https://github.com/EARL146/svgportfolio" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="version-btn"
                >
                  <Github size={13} />
                  <span>Repo</span>
                </a>
              </div>
            </div>

            {/* Version 2 Card */}
            <div className="version-item-box is-featured-v2">
              <div className="version-head">
                <span className="version-badge version-badge--v2">Version 2.0 (Current)</span>
                <span className="version-date">Flagship 2026</span>
              </div>
              <h4 className="version-title">WebGL Portfolio Flagship</h4>
              <p className="version-desc">
                High-performance React application with interactive Three.js 3D Cyber Background Graphics, 3D Project Cylinder, Bento Grid, and modern web architecture.
              </p>
              <ul className="version-points">
                <li>• Interactive 3D Cyber Graphics &amp; Plexus Constellation</li>
                <li>• Interactive 3D Cylindrical Project Barrel</li>
                <li>• Production-Ready Cloud &amp; Web Architecture</li>
              </ul>
              <div className="version-links">
                <span className="version-btn version-btn--active">
                  <CheckCircle size={13} />
                  <span>Currently Viewing V2</span>
                </span>
                <a 
                  href="#projects" 
                  className="version-btn"
                >
                  <ArrowUpRight size={13} />
                  <span>Explore V2 Builds</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Certifications Showcase Preview */}
        <div className="bento-card bento-card--cert glass-card">
          <div className="bento-card-icon-header">
            <Award size={22} className="card-icon" />
            <span className="card-kicker">Accreditations</span>
          </div>

          <h3 className="bento-card-title">Six Technical Certificates</h3>
          <p className="bento-card-sub">TESDA · OPSWAT · PyCon · Full Stack · GoHighLevel</p>
          
          <div className="cert-preview-collage">
            <img 
              src="./certificates/cert_05_fullstack_ai.png" 
              alt="Full Stack + AI Certification" 
              className="cert-mini-thumb" 
            />
            <img 
              src="./certificates/cert_01_tesda.png" 
              alt="TESDA Visual Graphic Design" 
              className="cert-mini-thumb" 
            />
            <img 
              src="./certificates/cert_06_ghl_workshop.png" 
              alt="GoHighLevel Workshop" 
              className="cert-mini-thumb" 
            />
          </div>

          <a 
            href="#credentials" 
            className="card-footer-link"
          >
            <span>Inspect All 6 Certificates</span>
            <ExternalLink size={13} />
          </a>
        </div>

        {/* Technical Stack Architecture */}
        <div className="bento-card bento-card--stack glass-card">
          <div className="bento-card-icon-header">
            <Layers size={22} className="card-icon" />
            <span className="card-kicker">Core Stack</span>
          </div>

          <h3 className="bento-card-title">Full-Stack Architecture</h3>
          <div className="stack-pill-rows">
            <div className="stack-row">
              <span className="stack-label">Frontend:</span>
              <div className="stack-chips">
                <span className="chip">HTML5 / CSS3</span>
                <span className="chip">JavaScript</span>
                <span className="chip">Responsive UI</span>
                <span className="chip">Flutter / Dart</span>
              </div>
            </div>

            <div className="stack-row">
              <span className="stack-label">Backend:</span>
              <div className="stack-chips">
                <span className="chip">Node.js</span>
                <span className="chip">Express.js</span>
                <span className="chip">Java 21</span>
                <span className="chip">Spring Boot</span>
                <span className="chip">PHP</span>
                <span className="chip">REST APIs</span>
              </div>
            </div>

            <div className="stack-row">
              <span className="stack-label">Database & DevOps:</span>
              <div className="stack-chips">
                <span className="chip">MySQL</span>
                <span className="chip">phpMyAdmin</span>
                <span className="chip">Git / GitHub</span>
                <span className="chip">Cloud &amp; Web Hosting</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
