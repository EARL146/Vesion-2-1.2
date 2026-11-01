import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Code2, FileText } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer glass-card">
      <div className="footer-top-row">
        <div className="footer-brand">
          <div className="footer-avatar-wrap">
            <div className="footer-emblem">EP</div>
            <div>
              <h4 className="footer-name">Earlnis Willan Agang Pajo</h4>
              <p className="footer-sub">Portfolio Version 2.0 · Full-Stack Web Development & Modern Apps</p>
            </div>
          </div>
        </div>

        <div className="footer-social-links">
          <a 
            href="https://www.linkedin.com/in/earlnis-pajo-272840432" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-icon-btn"
            title="LinkedIn (@earlnis-pajo-272840432)"
          >
            <Linkedin size={17} />
          </a>
          <a 
            href="https://github.com/EARL146" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-icon-btn"
            title="GitHub (@EARL146)"
          >
            <Github size={17} />
          </a>
          <button 
            type="button" 
            onClick={() => window.dispatchEvent(new CustomEvent('open-resume'))}
            className="footer-icon-btn footer-resume-btn"
            title="View Official Resume / CV"
          >
            <FileText size={16} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, marginLeft: '0.35rem' }}>Resume</span>
          </button>
          <a 
            href="https://earl146.github.io/svgportfolio" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-icon-btn"
            title="Version 1.0 (SVG Portfolio)"
          >
            <Code2 size={17} />
          </a>
          <a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=earlypajo@gmail.com&su=Project%20Inquiry%20via%20Portfolio" 
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon-btn"
            title="Open Direct Message in Gmail (earlypajo@gmail.com)"
          >
            <Mail size={17} />
          </a>
        </div>

        <button 
          onClick={scrollToTop} 
          className="back-to-top-btn"
          aria-label="Back to Top"
        >
          <span>Top</span>
          <ArrowUp size={14} />
        </button>
      </div>

      <div className="footer-bottom-row">
        <p className="footer-copyright">
          © {new Date().getFullYear()} Earlnis Willan Agang Pajo. Portfolio V1 & V2 · Three.js WebGL & Bento Grid.
        </p>
        <div className="footer-deploy-pill">
          <span className="deploy-dot" />
          <span>Production Ready · High-Performance WebGL</span>
        </div>
      </div>
    </footer>
  );
}
