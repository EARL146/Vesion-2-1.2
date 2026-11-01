import React, { useState } from 'react';
import {
  siCss,
  siDart,
  siExpress,
  siFlutter,
  siGit,
  siHtml5,
  siJavascript,
  siMysql,
  siNodedotjs,
  siPhp,
  siReact,
  siSpring,
  siTypescript
} from 'simple-icons';
import { 
  Cpu, 
  Globe2, 
  Server, 
  Database, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  Send,
  Smartphone,
  Workflow
} from 'lucide-react';

const TECH_LOGOS = [
  { name: 'JavaScript', icon: siJavascript },
  { name: 'TypeScript', icon: siTypescript },
  { name: 'HTML5', icon: siHtml5 },
  { name: 'CSS3', icon: siCss },
  { name: 'Java 21', src: './tech-logos/java.svg' },
  { name: 'Spring Boot', icon: siSpring },
  { name: 'Node.js', icon: siNodedotjs },
  { name: 'Express', icon: siExpress },
  { name: 'PHP', icon: siPhp },
  { name: 'MySQL', icon: siMysql },
  { name: 'Flutter', icon: siFlutter },
  { name: 'Dart', icon: siDart },
  { name: 'React', icon: siReact },
  { name: 'Git', icon: siGit }
];

function TechLogo({ tech }) {
  const isDarkIcon = tech.name === 'Express';
  return (
    <div className="tech-logo-pill" role="listitem">
      <span className="tech-logo-mark" aria-hidden="true">
        {tech.src ? (
          <img src={tech.src} alt="" />
        ) : (
          <svg viewBox="0 0 24 24" focusable="false">
            <path 
              d={tech.icon.path} 
              fill={isDarkIcon ? 'currentColor' : `#${tech.icon.hex}`} 
            />
          </svg>
        )}
      </span>
      <span>{tech.name}</span>
    </div>
  );
}

const SERVICES = [
  {
    icon: Globe2,
    title: 'Responsive Web Development',
    desc: 'Responsive business pages and web interfaces built with browser-native frontend technologies.',
    deliverables: ['HTML5, CSS3, and JavaScript', 'Mobile and desktop layouts', 'Semantic page structure', 'Project-specific interface components']
  },
  {
    icon: Server,
    title: 'Backend Applications & APIs',
    desc: 'Backend project work using Java with Spring Boot, Node.js with Express, and PHP.',
    deliverables: ['Node.js and Express applications', 'Java and Spring Boot applications', 'PHP backend endpoints', 'Project-specific API integration']
  },
  {
    icon: Database,
    title: 'MySQL Data Projects',
    desc: 'Relational data work with MySQL and phpMyAdmin for web and application projects.',
    deliverables: ['MySQL database integration', 'phpMyAdmin administration', 'Application data persistence', 'Project-specific data workflows']
  },
  {
    icon: Smartphone,
    title: 'Flutter Mobile Applications',
    desc: 'Cross-platform app work with Flutter and Dart, including API-connected projects.',
    deliverables: ['Flutter and Dart interfaces', 'Mobile ordering app projects', 'PHP and MySQL API connections', 'Responsive app layouts']
  },
  {
    icon: Workflow,
    title: 'Exploratory Workflow Integrations',
    desc: 'Foundational exploration of n8n workflows and basic AI integrations.',
    deliverables: ['Foundational n8n workflow experiments', 'Basic AI integration exploration', 'Small scoped prototypes', 'Clear distinction from core development services']
  }
];

const PIPELINE_STEPS = [
  {
    step: '01',
    name: 'Discovery & Plan',
    detail: 'We review your goals, feature list, and target audience to lay out clear deliverables and architecture without scope creep.'
  },
  {
    step: '02',
    name: 'Schema & Architecture',
    detail: 'Database schemas (MySQL) and REST API endpoints are mapped out to guarantee solid foundations before UI coding begins.'
  },
  {
    step: '03',
    name: 'Full-Stack Development',
    detail: 'Clean frontend components (React/HTML/CSS) are integrated with robust backend services (Node.js/Spring Boot).'
  },
  {
    step: '04',
    name: 'Review & Refinement',
    detail: 'Review the main user flows, responsive layout, and error states, then refine the project against its agreed scope.'
  },
  {
    step: '05',
    name: 'Build & Hosting Handoff',
    detail: 'Prepare a production static build and optimized routing configuration for a seamless cloud deployment handoff.'
  }
];

export default function ServicesSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="services" className="services-section">
      <div className="section-tag">
        <Cpu size={14} /> 04 / Capabilities & Services
      </div>
      <h2 className="section-title">What I Build & Deliver</h2>
      <p className="section-desc">
        Practical web, backend, database, and mobile development, with n8n and AI kept at a foundational, exploratory level.
      </p>

      <div className="tech-logo-marquee" role="region" aria-label="Technologies used across my projects">
        <div className="tech-logo-marquee-heading">
          <div className="tech-logo-heading-copy">
            <span className="tech-logo-eyebrow">My tech stack</span>
            <span className="tech-logo-caption">Languages, frameworks &amp; tools in motion</span>
          </div>
        </div>
        <div className="tech-logo-window">
          <div id="tech-logo-track" className="tech-logo-track">
            <div className="tech-logo-group" role="list">
              {TECH_LOGOS.map((tech) => <TechLogo key={tech.name} tech={tech} />)}
            </div>
            <div className="tech-logo-group" aria-hidden="true">
              {TECH_LOGOS.map((tech) => <TechLogo key={tech.name} tech={tech} />)}
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="services-grid">
        {SERVICES.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="service-card glass-card">
              <div className="service-icon-box">
                <Icon size={24} className="service-icon" />
              </div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              
              <div className="service-deliverables">
                <span className="deliverable-label">Key Deliverables:</span>
                <ul>
                  {s.deliverables.map((item, i) => (
                    <li key={i}>
                      <CheckCircle size={14} className="deliv-check" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Workflow Journey */}
      <div className="workflow-pipeline glass-card">
        <div className="pipeline-header">
          <div>
            <span className="pipeline-kicker">End-to-End Methodology</span>
            <h3 className="pipeline-title">The 5-Step Delivery Pipeline</h3>
          </div>
          <span className="pipeline-badge">Static Build &amp; Cloud Setup</span>
        </div>

        {/* Step Tabs */}
        <div className="pipeline-steps-nav">
          {PIPELINE_STEPS.map((st, i) => (
            <button
              key={st.step}
              className={`pipeline-step-btn ${activeStep === i ? 'is-active' : ''}`}
              onClick={() => setActiveStep(i)}
            >
              <span className="pipeline-step-num">{st.step}</span>
              <span className="pipeline-step-name">{st.name}</span>
            </button>
          ))}
        </div>

        {/* Active Step Content */}
        <div className="pipeline-active-detail">
          <div className="active-step-badge">Stage {PIPELINE_STEPS[activeStep].step}</div>
          <h4 className="active-step-heading">{PIPELINE_STEPS[activeStep].name}</h4>
          <p className="active-step-desc">{PIPELINE_STEPS[activeStep].detail}</p>
        </div>
      </div>
    </section>
  );
}
