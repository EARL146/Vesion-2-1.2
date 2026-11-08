import React, { useEffect } from 'react';
import { 
  X, 
  Printer, 
  Linkedin, 
  Github, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Download, 
  CheckCircle2, 
  GraduationCap, 
  Award, 
  Briefcase, 
  Code2, 
  Cpu
} from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="resume-modal-backdrop" 
      onClick={onClose}
      role="presentation"
    >
      <div 
        className="resume-modal-container glass-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="resume-modal-topbar">
          <div className="resume-topbar-left">
            <span className="resume-live-badge">
              <span className="resume-live-dot" />
              <span>Official Resume / Curriculum Vitae</span>
            </span>
          </div>

          <div className="resume-topbar-actions">
            <button 
              type="button" 
              className="resume-action-btn resume-action-btn--primary"
              onClick={handlePrint}
              title="Print or Save as PDF"
            >
              <Printer size={15} />
              <span>Print / Save PDF</span>
            </button>

            <a 
              href="https://www.linkedin.com/in/earlnis-pajo-272840432" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="resume-action-btn"
              title="View LinkedIn Profile"
            >
              <Linkedin size={15} />
              <span>LinkedIn</span>
            </a>

            <button 
              type="button" 
              className="resume-close-btn"
              onClick={onClose}
              aria-label="Close Resume"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Paper */}
        <div className="resume-paper" id="printable-resume">
          
          {/* Header */}
          <header className="resume-header">
            <div>
              <h1 id="resume-title" className="resume-name">Earlnis Willan A. Pajo</h1>
              <p className="resume-subtitle">Full-Stack Web Developer &amp; Software Engineer</p>
              <div className="resume-journey-pill">
                <Code2 size={12} />
                <span>Coding Journey: <strong>Started in 2025 (SHS TVL-ICT) – BSIT Present</strong></span>
              </div>
            </div>

            <div className="resume-contact-block">
              <div className="resume-contact-item">
                <MapPin size={13} />
                <span>Compostela, Davao de Oro, Philippines (GMT+8)</span>
              </div>
              <div className="resume-contact-item">
                <Mail size={13} />
                <a href="mailto:earlypajo@gmail.com">earlypajo@gmail.com</a>
              </div>
              <div className="resume-contact-item">
                <Linkedin size={13} />
                <a href="https://www.linkedin.com/in/earlnis-pajo-272840432" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/earlnis-pajo-272840432
                </a>
              </div>
              <div className="resume-contact-item">
                <Github size={13} />
                <a href="https://github.com/EARL146" target="_blank" rel="noopener noreferrer">
                  github.com/EARL146
                </a>
              </div>
            </div>
          </header>

          <hr className="resume-divider" />

          {/* Professional Summary */}
          <section className="resume-section">
            <h2 className="resume-section-title">
              <Briefcase size={16} />
              <span>Professional Summary</span>
            </h2>
            <p className="resume-summary-text">
              Aspiring Full-Stack Software Engineer and BSIT student whose programming journey began in <strong>2025 during Senior High School under the TVL-ICT Computer Programming Strand</strong>. Built strong foundational skills in Grade 11 with Visual Basic .NET (VB.NET) and foundational web pages, then advanced in Grade 12 to web applications and database systems with HTML5, CSS3, JavaScript, PHP, and phpMyAdmin/MySQL. Currently progressing as a BSIT undergraduate engineering production-grade full-stack architectures, Java 21/Spring Boot backend services, Node.js/Express REST APIs, Flutter mobile apps, and relational database systems with a high commitment to clean code and client satisfaction.
            </p>
          </section>

          {/* Developer Experience & Learning Journey */}
          <section className="resume-section">
            <h2 className="resume-section-title">
              <Code2 size={16} />
              <span>Software Engineering &amp; Educational Journey (2025 – Present)</span>
            </h2>

            {/* College Era */}
            <div className="resume-project-item">
              <div className="resume-item-header">
                <div>
                  <h3 className="resume-item-title">Undergraduate Software Engineering &amp; Full-Stack Development</h3>
                  <span className="resume-item-badge">BSIT · Legacy Compostela College</span>
                </div>
                <span className="resume-item-date">Present</span>
              </div>
              <p className="resume-item-desc">
                Engineering multi-tier full-stack systems and scalable web applications. Advancing into enterprise Java 21 with Spring Boot, Node.js &amp; Express RESTful API backends, modern React user interfaces, relational database normalization, and mobile development with Flutter.
              </p>
              <ul className="resume-bullet-list">
                <li>Designed and deployed 7+ complete software systems (e-commerce, POS inventory, client booking, and mobile apps).</li>
                <li>Earned 12 accredited credentials spanning DataCamp (SQL, Python, Git &amp; GitHub), Full-Stack Web Development + AI, Cybersecurity Infrastructure, and Visual Design.</li>
              </ul>
            </div>

            {/* Senior High School Era */}
            <div className="resume-project-item">
              <div className="resume-item-header">
                <div>
                  <h3 className="resume-item-title">Senior High School — TVL-ICT: Computer Programming Strand</h3>
                  <span className="resume-item-badge">Foundational Programming Track</span>
                </div>
                <span className="resume-item-date">2025 (Grade 11 – Grade 12)</span>
              </div>
              <p className="resume-item-desc">
                Enrolled in the specialized TVL-ICT Computer Programming strand, where my passion for coding officially began. Progressed through hands-on software development coursework across two formative years:
              </p>
              <ul className="resume-bullet-list">
                <li><strong>Grade 11 (Foundational Programming):</strong> Learned core programming logic, algorithms, and desktop application development using Visual Basic .NET (VB.NET), and built simple structured websites.</li>
                <li><strong>Grade 12 (Web Development &amp; Databases):</strong> Mastered web development technologies: HTML5, CSS3, JavaScript, backend server scripting with PHP, and relational database design and management using phpMyAdmin and MySQL.</li>
              </ul>
            </div>
          </section>

          {/* Technical Competencies */}
          <section className="resume-section">
            <h2 className="resume-section-title">
              <Code2 size={16} />
              <span>Technical Skills</span>
            </h2>
            <div className="resume-skills-grid">
              <div className="resume-skill-category">
                <span className="skill-cat-title">Programming Languages</span>
                <p>Java 21, JavaScript (ES6+), TypeScript, PHP, Visual Basic .NET (VB.NET), Dart, HTML5, CSS3, SQL</p>
              </div>
              <div className="resume-skill-category">
                <span className="skill-cat-title">Frameworks &amp; Backend</span>
                <p>Spring Boot, Node.js, Express.js, React, Next.js, Flutter, FlatLaf Swing, Three.js (WebGL)</p>
              </div>
              <div className="resume-skill-category">
                <span className="skill-cat-title">Databases &amp; DevOps</span>
                <p>MySQL 8+, phpMyAdmin, JDBC, Git, GitHub, RESTful APIs, Web Hosting &amp; Deployment</p>
              </div>
              <div className="resume-skill-category">
                <span className="skill-cat-title">Core Competencies</span>
                <p>MVC Pattern, Database Normalization, Responsive Design, API Integration, UI/UX Design</p>
              </div>
            </div>
          </section>

          {/* Featured Software & Web Projects */}
          <section className="resume-section">
            <h2 className="resume-section-title">
              <Cpu size={16} />
              <span>Featured Engineering Projects</span>
            </h2>

            <div className="resume-project-item">
              <div className="resume-item-header">
                <div>
                  <h3 className="resume-item-title">MotoFix — Motorcycle Parts E-Commerce System</h3>
                  <span className="resume-item-badge">Full-Stack Web Application</span>
                </div>
                <span className="resume-item-date">2026</span>
              </div>
              <p className="resume-item-desc">
                Architected a responsive e-commerce web platform for motorcycle parts inventory, shopping cart checkout, and product catalog browsing using Node.js, Express, and MySQL.
              </p>
              <ul className="resume-bullet-list">
                <li>Engineered clean REST endpoints for product management, search filtering, and inventory updates.</li>
                <li>Designed relational database schemas with foreign key integrity and optimized queries.</li>
                <li>Source: <a href="https://github.com/EARL146/motofix_fixed" target="_blank" rel="noopener noreferrer">github.com/EARL146/motofix_fixed</a></li>
              </ul>
            </div>

            <div className="resume-project-item">
              <div className="resume-item-header">
                <div>
                  <h3 className="resume-item-title">BarberGo — Barbershop Client Portal</h3>
                  <span className="resume-item-badge">Frontend Web Project</span>
                </div>
                <span className="resume-item-date">2026</span>
              </div>
              <p className="resume-item-desc">
                Production-ready business landing page and appointment booking preview for a modern grooming salon with semantic HTML5, fluid CSS3, and interactive JavaScript features.
              </p>
              <ul className="resume-bullet-list">
                <li>Built a 100% responsive interface across mobile, tablet, and widescreen desktop displays.</li>
                <li>Integrated interactive appointment flow previews and structured service menus.</li>
              </ul>
            </div>

            <div className="resume-project-item">
              <div className="resume-item-header">
                <div>
                  <h3 className="resume-item-title">BurgerBites — Mobile Food Ordering Application</h3>
                  <span className="resume-item-badge">Mobile Application</span>
                </div>
                <span className="resume-item-date">2026</span>
              </div>
              <p className="resume-item-desc">
                Cross-platform mobile ordering application developed using Flutter and Dart, interfaced with a custom PHP/MySQL backend API for real-time menu browsing and order dispatch.
              </p>
              <ul className="resume-bullet-list">
                <li>Designed state-driven UI components with smooth navigation and cart management.</li>
                <li>Source: <a href="https://github.com/EARL146/app-" target="_blank" rel="noopener noreferrer">github.com/EARL146/app-</a></li>
              </ul>
            </div>

            <div className="resume-project-item">
              <div className="resume-item-header">
                <div>
                  <h3 className="resume-item-title">StreetFood — Java 21 Inventory &amp; Ordering Desktop App</h3>
                  <span className="resume-item-badge">Desktop Application</span>
                </div>
                <span className="resume-item-date">2026</span>
              </div>
              <p className="resume-item-desc">
                High-performance point-of-sale and stock management desktop application built using modern Java 21, FlatLaf modern Swing UI, and JDBC connected to MySQL 8+.
              </p>
              <ul className="resume-bullet-list">
                <li>Structured layered software architecture separating UI controllers, DAO services, and database connections.</li>
                <li>Source: <a href="https://github.com/EARL146/JAVA-SYSTEM" target="_blank" rel="noopener noreferrer">github.com/EARL146/JAVA-SYSTEM</a></li>
              </ul>
            </div>
          </section>

          {/* Certifications & Verified Credentials */}
          <section className="resume-section">
            <h2 className="resume-section-title">
              <Award size={16} />
              <span>Certifications &amp; Accreditations</span>
            </h2>

            <div className="resume-certs-grid">
              <div className="resume-cert-box">
                <span className="cert-inst">DataCamp</span>
                <h4 className="cert-name">Introduction to SQL</h4>
                <span className="cert-meta">Completed Nov 2026 · ID: #50,681,251 (2 hrs)</span>
              </div>

              <div className="resume-cert-box">
                <span className="cert-inst">DataCamp</span>
                <h4 className="cert-name">Intermediate GitHub Concepts</h4>
                <span className="cert-meta">Completed Nov 2026 · ID: #50,676,876 (3 hrs)</span>
              </div>

              <div className="resume-cert-box">
                <span className="cert-inst">DataCamp</span>
                <h4 className="cert-name">Introduction to GitHub Concepts</h4>
                <span className="cert-meta">Completed Oct 2026 · ID: #50,675,858 (2 hrs)</span>
              </div>

              <div className="resume-cert-box">
                <span className="cert-inst">DataCamp</span>
                <h4 className="cert-name">Introduction to Python for Developers</h4>
                <span className="cert-meta">Completed Oct 2026 · ID: #50,673,623 (3 hrs)</span>
              </div>

              <div className="resume-cert-box">
                <span className="cert-inst">DataCamp</span>
                <h4 className="cert-name">Intermediate Git</h4>
                <span className="cert-meta">Completed Oct 2026 · ID: #50,671,840 (2 hrs)</span>
              </div>

              <div className="resume-cert-box">
                <span className="cert-inst">DataCamp</span>
                <h4 className="cert-name">Introduction to Git</h4>
                <span className="cert-meta">Completed Oct 2026 · ID: #50,670,457 (2 hrs)</span>
              </div>

              <div className="resume-cert-box">
                <span className="cert-inst">Learn Technology Today</span>
                <h4 className="cert-name">Full Stack Web Development + AI — Level 0</h4>
                <span className="cert-meta">Issued Sep 2026 · Credential ID: LTT-COURSE-2026-000061</span>
              </div>

              <div className="resume-cert-box">
                <span className="cert-inst">TESDA Online Program</span>
                <h4 className="cert-name">Introduction to Visual Graphic Design</h4>
                <span className="cert-meta">Issued Sep 2026 · Credential ID: ucil0Zg8FT</span>
              </div>

              <div className="resume-cert-box">
                <span className="cert-inst">OPSWAT Academy</span>
                <h4 className="cert-name">Introduction to Critical Infrastructure Protection (ICIP)</h4>
                <span className="cert-meta">Issued Sep 2026 · Credential ID: 60040x9f2g</span>
              </div>

              <div className="resume-cert-box">
                <span className="cert-inst">OPSWAT Academy</span>
                <h4 className="cert-name">Cybersecurity Fundamentals Associate (OCFA)</h4>
                <span className="cert-meta">Issued Sep 2026 · Credential ID: V44oh1q9</span>
              </div>

              <div className="resume-cert-box">
                <span className="cert-inst">Python Philippines / Ateneo de Davao</span>
                <h4 className="cert-name">Certificate of Participation — PyCon Davao 2026</h4>
                <span className="cert-meta">Conducted Oct 2026 · Reference: PYCON-DVO-2026</span>
              </div>

              <div className="resume-cert-box">
                <span className="cert-inst">Excelerate Digital</span>
                <h4 className="cert-name">LIVE: GoHighLevel Workshop</h4>
                <span className="cert-meta">Conducted Oct 2026 · Reference: EXL-GHL-2026</span>
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="resume-section">
            <h2 className="resume-section-title">
              <GraduationCap size={16} />
              <span>Education</span>
            </h2>

            {/* Higher Education */}
            <div className="resume-edu-box">
              <div className="resume-item-header">
                <div>
                  <h3 className="resume-item-title">Bachelor of Science in Information Technology (BSIT)</h3>
                  <span className="resume-edu-school">Legacy Compostela College · Compostela, Davao de Oro, Philippines</span>
                </div>
                <span className="resume-item-date">Undergraduate (Current)</span>
              </div>
              <p className="resume-item-desc">
                Advanced Computing Sciences: Object-Oriented Programming (Java 21), Data Structures &amp; Algorithms, Relational Database Management Systems (SQL), Web Systems, Computer Networks, and Systems Architecture.
              </p>
            </div>

            {/* Senior High School */}
            <div className="resume-edu-box" style={{ marginTop: '1rem' }}>
              <div className="resume-item-header">
                <div>
                  <h3 className="resume-item-title">Senior High School — TVL-ICT: Computer Programming Strand</h3>
                  <span className="resume-edu-school">Technical-Vocational-Livelihood (TVL) Track · Philippines</span>
                </div>
                <span className="resume-item-date">Grade 11 – Grade 12 (Completed 2025)</span>
              </div>
              <p className="resume-item-desc">
                Specialized secondary programming track where my coding journey started:
                <br />
                • <strong>Grade 11:</strong> Mastered desktop application logic with Visual Basic .NET (VB.NET) and designed simple initial websites.
                <br />
                • <strong>Grade 12:</strong> Developed full web solutions with HTML5, CSS3, JavaScript, PHP server-side scripting, and relational database management via phpMyAdmin and MySQL.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
