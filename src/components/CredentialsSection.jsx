import React, { useEffect, useState } from 'react';
import { 
  Award, 
  Eye, 
  X, 
  GraduationCap,
  ChevronLeft, 
  ChevronRight, 
  Smartphone, 
  Tablet, 
  Monitor, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldCheck,
  ExternalLink,
  Calendar,
  User,
  Hash
} from 'lucide-react';

const CERTIFICATES_DATA = [
  {
    id: 'cert-01',
    num: '01',
    title: 'Introduction to Visual Graphic Design',
    issuer: 'TESDA Online Program',
    date: 'September 8, 2026',
    recipient: 'Earlnis Willan Agang Pajo',
    badge: 'TESDA Certified',
    badgeTheme: 'green',
    code: 'ucil0Zg8FT',
    image: './certificates/cert_01_tesda.png',
    desc: 'TESDA Online Program accredited certificate for visual design principles, typography, brand aesthetics, and graphic layout design.',
    skills: ['Visual Design', 'Layout Architecture', 'Typography', 'Digital Graphics']
  },
  {
    id: 'cert-02',
    num: '02',
    title: 'Introduction to Critical Infrastructure Protection (ICIP)',
    issuer: 'OPSWAT Academy',
    date: 'September 30, 2026',
    recipient: 'Earlnis Pajo',
    badge: 'OPSWAT Academy',
    badgeTheme: 'amber',
    code: '60040x9f2g',
    image: './certificates/cert_02_icip.png',
    desc: 'Specialized cybersecurity credential focusing on protecting critical infrastructure, industrial digital systems, and zero-trust asset isolation.',
    skills: ['Cybersecurity', 'Critical Infrastructure', 'Asset Protection', 'Risk Management']
  },
  {
    id: 'cert-03',
    num: '03',
    title: 'Cybersecurity Fundamentals Associate (OCFA)',
    issuer: 'OPSWAT Academy',
    date: 'September 30, 2026',
    recipient: 'Earlnis Pajo',
    badge: 'OPSWAT Academy',
    badgeTheme: 'blue',
    code: 'V44oh1q9',
    image: './certificates/cert_03_ocfa.png',
    desc: 'Official associate certification covering foundational cybersecurity defenses, network threat vectors, and proactive threat mitigation.',
    skills: ['Network Security', 'Threat Assessment', 'Zero Trust', 'Malware Mitigation']
  },
  {
    id: 'cert-04',
    num: '04',
    title: 'Certificate of Participation — PyCon Davao 2026',
    issuer: 'Python Philippines / Ateneo de Davao',
    date: 'October 17–18, 2026',
    recipient: 'Earlnis Willan A. Pajo',
    badge: 'PyCon 2026',
    badgeTheme: 'purple',
    code: 'PYCON-DVO-2026',
    image: './certificates/cert_04_pycon.png',
    desc: 'Participation credential from PyCon Davao 2026 covering Python web ecosystems, asynchronous APIs, data modeling, and developer tooling.',
    skills: ['Python 3', 'API Engineering', 'Community Collaboration', 'Web Frameworks']
  },
  {
    id: 'cert-05',
    num: '05',
    title: 'Full Stack Web Development + AI — Level 0',
    issuer: 'Learn Technology Today',
    date: 'September 6, 2026',
    recipient: 'Earlnis Willan A. Pajo',
    badge: 'Full Stack + AI',
    badgeTheme: 'cobalt',
    code: 'LTT-COURSE-2026-000061',
    // High-resolution master certificate
    image: './certificates/cert_fullstack_ai.png',
    desc: 'Comprehensive full-stack development credential spanning modern frontend architecture, backend REST APIs, relational persistence, and generative AI tool integration.',
    skills: ['Frontend React', 'Backend Architecture', 'REST APIs', 'AI Workflow Integration']
  },
  {
    id: 'cert-06',
    num: '06',
    title: 'LIVE: GoHighLevel Workshop',
    issuer: 'Excelerate Digital',
    date: 'October 27, 2026',
    recipient: 'Earlnis Willan A. Pajo',
    badge: 'GHL Workshop',
    badgeTheme: 'teal',
    code: 'EXL-GHL-2026',
    image: './certificates/cert_06_ghl_workshop.png',
    desc: 'Professional workshop certificate for marketing automation workflows, client CRM pipeline design, funnel routing, and platform operations.',
    skills: ['CRM Workflows', 'Client Automation', 'Marketing Systems', 'Operations']
  }
];

export default function CredentialsSection() {
  const [activeCertIndex, setActiveCertIndex] = useState(null);
  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'tablet' | 'phone'
  const [copiedCode, setCopiedCode] = useState(false);

  const activeCert = activeCertIndex !== null ? CERTIFICATES_DATA[activeCertIndex] : null;

  // Keyboard navigation & modal lock
  useEffect(() => {
    if (activeCertIndex === null) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveCertIndex(null);
      } else if (event.key === 'ArrowRight') {
        setActiveCertIndex((prev) => (prev + 1) % CERTIFICATES_DATA.length);
      } else if (event.key === 'ArrowLeft') {
        setActiveCertIndex((prev) => (prev - 1 + CERTIFICATES_DATA.length) % CERTIFICATES_DATA.length);
      }
    };

    // Prevent body background scroll while viewing certificate
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeCertIndex]);

  const handleCopyCode = (code) => {
    if (!code) return;
    try {
      navigator.clipboard.writeText(code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2200);
    } catch {
      // Fallback
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveCertIndex((prev) => (prev - 1 + CERTIFICATES_DATA.length) % CERTIFICATES_DATA.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveCertIndex((prev) => (prev + 1) % CERTIFICATES_DATA.length);
  };

  return (
    <section id="credentials" className="credentials-section">
      <div className="section-tag">
        <Award size={14} /> 06 / Certifications &amp; Learning
      </div>
      <h2 className="section-title">Certificates &amp; Verified Credentials</h2>
      <p className="section-desc">
        Click any certificate to inspect it in full center display with unblurred high resolution, realistic phone and tablet device frames, and quick navigation across all 6 verified credentials.
      </p>

      {/* Grid of 6 Certificates */}
      <div className="certificates-gallery-grid">
        {CERTIFICATES_DATA.map((c, idx) => (
          <article
            key={c.id} 
            className="certificate-card glass-card"
            onClick={() => setActiveCertIndex(idx)}
            role="button"
            tabIndex={0}
            aria-label={`View ${c.title} certificate`}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setActiveCertIndex(idx);
              }
            }}
          >
            <div className="cert-card-preview-wrap">
              <img 
                src={c.image} 
                alt={c.title}
                className="cert-card-img"
                loading="lazy"
              />
              <span className="cert-number-badge">#{c.num}</span>
              <span className={`cert-badge-floating cert-badge-theme--${c.badgeTheme || 'blue'}`}>
                {c.badge}
              </span>
              <div className="cert-hover-overlay">
                <div className="cert-hover-icon-circle">
                  <Eye size={22} />
                </div>
                <span className="cert-hover-text">Click to Inspect &amp; View</span>
                <span className="cert-hover-sub">High-Res · Desktop, Tablet &amp; Phone Frames</span>
              </div>
            </div>

            <div className="cert-card-details">
              <div className="cert-issuer-row">
                <span className="cert-verified-pill-small">
                  <ShieldCheck size={12} />
                  <span>Verified</span>
                </span>
                <span className="cert-date-text">{c.date}</span>
              </div>
              <h3 className="cert-card-title">{c.title}</h3>
              <p className="cert-issuer-name">{c.issuer}</p>
              <p className="cert-card-desc">{c.desc}</p>
              
              <div className="cert-card-footer">
                <span className="cert-inspect-cta">
                  <span>View Full Certificate</span>
                  <ChevronRight size={14} />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Education & Programming Foundation Banner */}
      <div className="education-banner glass-card">
        <div className="edu-banner-icon-wrap">
          <GraduationCap size={32} className="edu-icon" />
        </div>
        <div className="edu-banner-content">
          <span className="edu-kicker">Educational &amp; Programming Foundation</span>
          <h3 className="edu-degree">BSIT Undergraduate · Started in Senior High TVL-ICT (2025)</h3>
          <p className="edu-school">Legacy Compostela College (BSIT) · TVL-ICT: Computer Programming Strand (Grade 11–12)</p>
          <p className="edu-body">
            My programming journey began in 2025 in Senior High School with Visual Basic .NET (VB.NET) and building simple foundational websites in Grade 11, advancing to full web systems with HTML, CSS, JavaScript, PHP, and phpMyAdmin/MySQL in Grade 12. Today in college, advancing into enterprise Java 21, Spring Boot REST APIs, relational database normalization, and modern full-stack architectures.
          </p>
        </div>
      </div>

      {/* Centered Master Certificate Lightbox & All-Certificates Navigator */}
      {activeCert && (
        <div 
          className="cert-modal-backdrop" 
          onClick={() => setActiveCertIndex(null)}
          role="presentation"
        >
          {/* Floating Exit Button in Viewport Corner for Immediate Access */}
          <button 
            type="button"
            className="cert-viewport-close-btn"
            onClick={() => setActiveCertIndex(null)}
            aria-label="Exit Certificate (Esc)"
            title="Exit Certificate (Press Escape)"
          >
            <X size={20} />
            <span className="cert-viewport-close-text">Exit</span>
          </button>

          <div 
            className="cert-modal glass-card" 
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="cert-modal-title" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Toolbar (STICKY with Exit Button, Device Switcher, and Counter) */}
            <header className="cert-modal-header">
              <div className="cert-header-left">
                <div className="cert-counter-badge">
                  <span className="cert-counter-dot" />
                  <span>Certificate #{activeCert.num} of 06</span>
                </div>
                <span className="cert-header-verified">
                  <ShieldCheck size={13} />
                  <span>Official Verified Credential</span>
                </span>
              </div>

              {/* Center: Phone / Tablet / Desktop Interactive Switcher */}
              <div className="cert-device-toggle-group" role="group" aria-label="Certificate Device View">
                <button
                  type="button"
                  className={`device-btn ${deviceMode === 'desktop' ? 'is-active' : ''}`}
                  onClick={() => setDeviceMode('desktop')}
                  title="Full High-Resolution Display"
                >
                  <Monitor size={14} />
                  <span>Desktop</span>
                </button>
                <button
                  type="button"
                  className={`device-btn ${deviceMode === 'tablet' ? 'is-active' : ''}`}
                  onClick={() => setDeviceMode('tablet')}
                  title="iPad & Tablet Mockup Frame"
                >
                  <Tablet size={14} />
                  <span>Tablet</span>
                </button>
                <button
                  type="button"
                  className={`device-btn ${deviceMode === 'phone' ? 'is-active' : ''}`}
                  onClick={() => setDeviceMode('phone')}
                  title="Smartphone Mobile Mockup Frame"
                >
                  <Smartphone size={14} />
                  <span>Phone</span>
                </button>
              </div>

              {/* Right: High-Visibility 'X' Exit Button */}
              <div className="cert-header-right">
                <button 
                  type="button"
                  className="cert-modal-exit-btn"
                  onClick={() => setActiveCertIndex(null)}
                  aria-label="Exit certificate viewer (Esc)"
                  title="Exit certificate viewer (Press Escape)"
                >
                  <X size={18} className="cert-exit-x-icon" />
                  <span className="cert-exit-label">Exit</span>
                  <kbd className="cert-exit-kbd">Esc</kbd>
                </button>
              </div>
            </header>

            {/* Modal Center Stage: Arrow Navigation + Framed Certificate */}
            <div className="cert-modal-stage">
              {/* Prev Arrow */}
              <button
                type="button"
                className="cert-stage-nav-btn cert-stage-nav-btn--prev"
                onClick={handlePrev}
                aria-label="View previous certificate (Arrow Left)"
                title="Previous certificate (Arrow Left)"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Main Certificate Viewport with Responsive Device Styling */}
              <div className={`cert-display-container device-mode--${deviceMode}`}>
                {deviceMode === 'phone' ? (
                  // Realistic Smartphone Frame Mockup
                  <div className="phone-device-frame">
                    <div className="phone-island-notch">
                      <span className="phone-notch-lens" />
                      <span className="phone-notch-sensor" />
                    </div>
                    <div className="phone-screen-viewport">
                      <img 
                        src={activeCert.image} 
                        alt={activeCert.title} 
                        className="cert-master-img"
                      />
                    </div>
                    <div className="phone-home-indicator" />
                  </div>
                ) : deviceMode === 'tablet' ? (
                  // Realistic iPad & Tablet Frame Mockup
                  <div className="tablet-device-frame">
                    <div className="tablet-camera-dot" />
                    <div className="tablet-screen-viewport">
                      <img 
                        src={activeCert.image} 
                        alt={activeCert.title} 
                        className="cert-master-img"
                      />
                    </div>
                  </div>
                ) : (
                  // High-End Crystal-Clear Fine-Art Matte Frame
                  <div className="document-matte-frame">
                    <div className="document-corner-accent corner-tl" />
                    <div className="document-corner-accent corner-tr" />
                    <div className="document-corner-accent corner-bl" />
                    <div className="document-corner-accent corner-br" />
                    <img 
                      src={activeCert.image} 
                      alt={activeCert.title} 
                      className="cert-master-img"
                    />
                  </div>
                )}
              </div>

              {/* Next Arrow */}
              <button
                type="button"
                className="cert-stage-nav-btn cert-stage-nav-btn--next"
                onClick={handleNext}
                aria-label="View next certificate (Arrow Right)"
                title="Next certificate (Arrow Right)"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Quick Actions Strip under stage */}
            <div className="cert-stage-quick-actions">
              <a 
                href={activeCert.image} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cert-quick-btn"
                title="Open high-resolution image in a new tab"
              >
                <ExternalLink size={14} />
                <span>Open Full-Resolution Image</span>
              </a>
              <span className="cert-stage-hint">
                Use Left / Right arrow keys to switch certificates
              </span>
            </div>

            {/* Verified Details & Credentials Info Card */}
            <div className="cert-modal-details-card">
              <div className="cert-details-header">
                <div className="cert-details-header-main">
                  <div className="cert-issuer-badge-wrap">
                    <span className="cert-badge-pill cert-badge-pill--prominent">{activeCert.badge}</span>
                    <span className="cert-verified-pill">
                      <ShieldCheck size={14} />
                      <span>Authentic &amp; Verified Credential</span>
                    </span>
                  </div>
                  <h3 id="cert-modal-title" className="cert-modal-title">{activeCert.title}</h3>
                  <p className="cert-modal-issuer">{activeCert.issuer}</p>
                </div>
              </div>

              <p className="cert-modal-desc">{activeCert.desc}</p>

              {/* Metadata Metric Grid */}
              <div className="cert-modal-meta-grid">
                <div className="meta-box">
                  <span className="meta-k">
                    <User size={13} />
                    <span>Awarded Recipient</span>
                  </span>
                  <span className="meta-v">{activeCert.recipient}</span>
                </div>
                <div className="meta-box">
                  <span className="meta-k">
                    <Calendar size={13} />
                    <span>Issue Date</span>
                  </span>
                  <span className="meta-v">{activeCert.date}</span>
                </div>
                <div className="meta-box meta-box--code">
                  <span className="meta-k">
                    <Hash size={13} />
                    <span>Credential / Verification Code</span>
                  </span>
                  <div className="code-copy-row">
                    <span className="meta-v font-mono">{activeCert.code}</span>
                    <button
                      type="button"
                      className="code-copy-btn"
                      onClick={() => handleCopyCode(activeCert.code)}
                      title="Copy verification code to clipboard"
                    >
                      {copiedCode ? <Check size={13} color="#22c55e" /> : <Copy size={13} />}
                      <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy Code'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Skills covered */}
              {activeCert.skills && (
                <div className="cert-skills-wrap">
                  <span className="cert-skills-label">Core Competencies &amp; Technical Skills:</span>
                  <div className="cert-skills-chips">
                    {activeCert.skills.map((sk) => (
                      <span key={sk} className="cert-skill-chip">{sk}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Gallery Thumbnail Bar: Browse All 6 Certificates with 1 Click */}
            <div className="cert-all-thumbnails-bar" aria-label="Quick selector for all certificates">
              <div className="thumbnails-bar-header">
                <span className="thumbnails-bar-label">
                  <Sparkles size={13} />
                  <span>All 6 Certificates (Click any to inspect):</span>
                </span>
                <span className="thumbnails-keyboard-hint">
                  {activeCertIndex + 1} / {CERTIFICATES_DATA.length}
                </span>
              </div>
              
              <div className="thumbnails-scroll-row">
                {CERTIFICATES_DATA.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`cert-thumb-btn ${activeCertIndex === i ? 'is-active' : ''}`}
                    onClick={() => setActiveCertIndex(i)}
                    title={`View ${c.title}`}
                  >
                    <div className="thumb-preview-wrap">
                      <img src={c.image} alt={c.title} className="thumb-preview-img" />
                      <span className="thumb-num-pip">#{c.num}</span>
                    </div>
                    <div className="thumb-text-wrap">
                      <span className="thumb-title-text">{c.title}</span>
                      <span className="thumb-issuer-text">{c.issuer}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Exit Bar for Easy One-Click Close */}
            <div className="cert-modal-bottom-exit-bar">
              <button 
                type="button" 
                className="cert-bottom-close-btn"
                onClick={() => setActiveCertIndex(null)}
              >
                <X size={16} />
                <span>Exit Certificate Viewer</span>
              </button>
              <span className="cert-bottom-hint">
                Tip: Click anywhere outside the card or press <kbd>Esc</kbd> to close.
              </span>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
