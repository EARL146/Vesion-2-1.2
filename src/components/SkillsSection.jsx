import React from 'react';
import { Code2, Server, Database, Terminal, Smartphone, CheckCircle2 } from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    title: 'Frontend & Responsive UI',
    icon: Code2,
    desc: 'Responsive browser interfaces using the core web platform.',
    skills: [
      { name: 'HTML5', scope: 'Core', note: 'Semantic page structure' },
      { name: 'CSS3', scope: 'Core', note: 'Responsive layouts and styling' },
      { name: 'JavaScript', scope: 'Core', note: 'Interactive browser behavior' },
      { name: 'Responsive Web Design', scope: 'Core', note: 'Layouts for mobile and desktop' }
    ]
  },
  {
    title: 'Backend Development',
    icon: Server,
    desc: 'Application backends and APIs across the project stack.',
    skills: [
      { name: 'Java 21', scope: 'Core', note: 'Application and desktop systems' },
      { name: 'Spring Boot', scope: 'Core', note: 'Java web application development' },
      { name: 'Node.js', scope: 'Core', note: 'JavaScript runtime for backend work' },
      { name: 'Express.js', scope: 'Core', note: 'Node.js web applications and APIs' },
      { name: 'PHP', scope: 'Core', note: 'Server-side application development' }
    ]
  },
  {
    title: 'Databases',
    icon: Database,
    desc: 'Relational data and database administration.',
    skills: [
      { name: 'MySQL', scope: 'Core', note: 'Relational database projects' },
      { name: 'phpMyAdmin', scope: 'Core', note: 'MySQL database administration' }
    ]
  },
  {
    title: 'Mobile Development',
    icon: Smartphone,
    desc: 'Cross-platform mobile application development.',
    skills: [
      { name: 'Flutter', scope: 'Core', note: 'Cross-platform application UI' },
      { name: 'Dart', scope: 'Core', note: 'Flutter application language' }
    ]
  },
  {
    title: 'Tools & Exploratory Workflows',
    icon: Terminal,
    desc: 'Project tools and early-stage workflow experiments.',
    skills: [
      { name: 'Git & GitHub', scope: 'Tools', note: 'Version control and project repositories' },
      { name: 'Web Hosting & Deployment', scope: 'DevOps', note: 'Production hosting and routing setup for web applications' },
      { name: 'n8n & AI integration', scope: 'Foundational', note: 'Exploratory workflows; foundational experience only' }
    ]
  }
];

export default function SkillsSection() {
  return (
    <section id="skills" className="skills-section">
      <div className="section-tag">
        <Code2 size={14} /> 05 / Skills &amp; Tech
      </div>
      <h2 className="section-title">Core Skills &amp; Technology</h2>
      <p className="section-desc">
        Practical work across responsive web development, Java and Node.js backends, MySQL, and Flutter. n8n and AI integrations remain foundational and exploratory.
      </p>

      <div className="skills-grid">
        {SKILL_CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <article key={category.title} className="skill-card glass-card">
              <div className="skill-card-head">
                <div className="skill-icon-circle"><Icon size={20} className="skill-cat-icon" /></div>
                <div>
                  <h3 className="skill-card-cat-title">{category.title}</h3>
                  <p className="skill-card-cat-desc">{category.desc}</p>
                </div>
              </div>
              <div className="skill-item-list">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="skill-row">
                    <div className="skill-row-top">
                      <span className="skill-name"><CheckCircle2 size={13} className="skill-check" />{skill.name}</span>
                      <span className="skill-level-badge">{skill.scope}</span>
                    </div>
                    <span className="skill-note">{skill.note}</span>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
