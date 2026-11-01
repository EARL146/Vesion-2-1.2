import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin,
  FileText,
  Mail, 
  Sun, 
  Moon, 
  Compass, 
  Code2, 
  Cpu, 
  Award, 
  FolderGit2, 
  Boxes, 
  Menu, 
  X,
  Clock,
  Sparkles,
  CheckCircle,
  Layers,
  Eye
} from 'lucide-react';

export default function LeftRail({ activeSection, visitorCount, onOpenResume }) {
  const [theme, setTheme] = useState('dark');
  const [textScale, setTextScale] = useState('md');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [phTime, setPhTime] = useState('');

  // Clock in Manila / GMT+8
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      setPhTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  // Theme Sync
  useEffect(() => {
    let saved = 'dark';
    try {
      saved = localStorage.getItem('earl-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    } catch {
      saved = 'dark';
    }
    setTheme(saved);
    document.documentElement.dataset.theme = saved;
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('earl-theme', next);
    } catch {
      // The selected theme still applies for this page view when storage is unavailable.
    }
    document.documentElement.dataset.theme = next;
    const bar = document.querySelector('meta[name="theme-color"]');
    if (bar) bar.setAttribute('content', next === 'dark' ? '#070B14' : '#F4F4ED');
  };

  // Font Scale Adjuster
  const handleScale = (scale) => {
    setTextScale(scale);
    const scaleVal = scale === 'xl' ? '1.2' : scale === 'lg' ? '1.1' : '1';
    document.documentElement.style.setProperty('--font-scale', scaleVal);
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Compass },
    { id: 'versions', label: 'Portfolio V1 vs V2', icon: Layers },
    { id: 'barrel', label: '3D Project Cylinder', icon: Boxes },
    { id: 'projects', label: 'Projects & Work', icon: FolderGit2 },
    { id: 'services', label: 'Services & Workflows', icon: Cpu },
    { id: 'skills', label: 'Tech & Architecture', icon: Code2 },
    { id: 'credentials', label: 'Certifications (6)', icon: Award },
    { id: 'contact', label: 'Get In Touch', icon: Mail }
  ];

  return (
    <>
      {/* Mobile Top Navbar */}
      <header className="mobile-header">
        <div className="mobile-brand">
          <div className="mobile-logo-emblem">EP</div>
          <div className="mobile-name-box">
            <span className="mobile-name">Earl Willan Pajo</span>
            <span className="mobile-title">Full-Stack &amp; Systems Automation</span>
          </div>
        </div>
        <button 
          className="mobile-toggle-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="portfolio-navigation"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Main Desktop Rail */}
      <aside id="portfolio-navigation" className={`rail-sidebar ${mobileOpen ? 'is-mobile-open' : ''}`}>
        <div className="rail-inner">
          
          {/* Rail Header — Kenneth Villar Style with Glowing Aura */}
          <div className="rail-profile">
            <div className="rail-brand-emblem-box">
              <div className="rail-emblem-aura" />
              <div className="rail-brand-mark">
                <img src="./avatar-nobg.png" alt="" className="rail-avatar" />
                <span className="mark-badge">EP v2</span>
              </div>
            </div>

            <div className="profile-text">
              <h1 className="rail-name">
                <span>Earl Willan Pajo</span>
                <CheckCircle size={16} className="verified-icon" title="Earlnis Pajo" />
              </h1>
              <p className="rail-role">Full-Stack Developer &amp; Systems Automation</p>
              <p className="rail-handle">
                @earl146 <span className="rail-dot">•</span> 
                <span className="rail-visits" title="Shared portfolio view count; refreshes from the live counter">
                  <Eye size={12} aria-hidden="true" />
                  {visitorCount == null ? '—' : visitorCount.toLocaleString()} views
                </span>
              </p>
            </div>

            <div className="profile-badges">
              <span className="pill-badge pill-badge--accent">
                <Sparkles size={12} /> Portfolio Version 2.0
              </span>
              <span className="pill-badge pill-badge--code">
                <Code2 size={11} /> Coding Since 2025 · Present
              </span>
              <span className="pill-badge pill-badge--time">
                <Clock size={11} /> Compostela, Davao de Oro • PHT (GMT+8) · {phTime || '--:--'}
              </span>
            </div>
          </div>

          <div className="rail-divider" />

          {/* Quick Actions & Socials (Theme + Social Icons) */}
          <div className="rail-actions-row">
            <button 
              className="rail-action-circle"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <a 
              href="https://www.linkedin.com/in/earlnis-pajo-272840432" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="rail-action-circle"
              title="LinkedIn Profile (Earlnis Pajo)"
            >
              <Linkedin size={17} />
            </a>

            <a 
              href="https://github.com/EARL146" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="rail-action-circle"
              title="GitHub Profile (@EARL146)"
            >
              <Github size={17} />
            </a>

            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=earlypajo@gmail.com&su=Project%20Inquiry%20via%20Portfolio" 
              target="_blank"
              rel="noopener noreferrer"
              className="rail-action-circle"
              title="Open Direct Message in Gmail (earlypajo@gmail.com)"
            >
              <Mail size={17} />
            </a>

            <a 
              href="https://earl146.github.io/svgportfolio" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="rail-action-circle"
              title="Version 1 Portfolio (SVG)"
            >
              <Code2 size={17} />
            </a>
          </div>

          {/* View Resume / CV Button */}
          <div style={{ marginTop: '0.65rem' }}>
            <button 
              type="button" 
              className="rail-resume-btn"
              onClick={onOpenResume}
              title="View & Download Official Resume / CV"
            >
              <FileText size={15} />
              <span>View Resume / CV</span>
            </button>
          </div>

          <div className="rail-divider" />

          {/* Navigation Links */}
          <nav className="rail-nav">
            <div className="rail-section-label">Navigation</div>
            <ul className="nav-list">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <a 
                      href={`#${item.id}`}
                      className={`nav-link ${isActive ? 'is-active' : ''}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon size={17} className="nav-icon" />
                      <span>{item.label}</span>
                      {isActive && <span className="active-pip" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="rail-divider" />

          {/* Accessibility & Engine Preferences */}
          <div className="rail-preferences">
            <div className="pref-row">
              <span className="pref-label">Font Size</span>
              <div className="scale-btn-group">
                <button 
                  className={`scale-btn ${textScale === 'md' ? 'is-active' : ''}`}
                  onClick={() => handleScale('md')}
                  title="Default text"
                >
                  A
                </button>
                <button 
                  className={`scale-btn ${textScale === 'lg' ? 'is-active' : ''}`}
                  onClick={() => handleScale('lg')}
                  title="Large text"
                >
                  A+
                </button>
                <button 
                  className={`scale-btn ${textScale === 'xl' ? 'is-active' : ''}`}
                  onClick={() => handleScale('xl')}
                  title="Extra large text"
                >
                  A++
                </button>
              </div>
            </div>

            <div className="pref-row" style={{ marginTop: '0.65rem' }}>
              <span className="pref-label">3D Graphics</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600 }}>
                <span className="graphics-pulse-indicator" style={{ width: 6, height: 6 }} />
                <span>Active 60 FPS</span>
              </span>
            </div>
          </div>

          {/* Micro Footer */}
          <div className="rail-footer">
            <p>© {new Date().getFullYear()} Earlnis Willan Pajo</p>
            <p className="rail-sub-note">Portfolio v2 · Production Ready</p>
          </div>

        </div>
      </aside>

      {/* Backdrop for Mobile Drawer */}
      {mobileOpen && (
        <div 
          className="mobile-backdrop" 
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
