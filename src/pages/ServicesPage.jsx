import React, { useState } from 'react';
import {
  Compass,
  Code2,
  Rocket,
  Check,
  Zap,
  Database,
  Server,
  Layout,
  ShieldCheck,
  Globe,
  GitBranch,
  Trophy,
  FileText,
  Sparkles
} from 'lucide-react';
import { METHOD, SERVICES, PIPELINE } from '../data/site';
import { BrandIcon } from '../components/Icons';

const STAGE_ICONS = [Compass, Code2, Rocket];

const FLOW_TOP = [
  { id: 'brief', title: 'Project Brief', sub: 'Goals & scope', Icon: Zap, trigger: true, note: PIPELINE.main[0].detail },
  { id: 'schema', title: 'Schema Design', sub: 'MySQL tables', Icon: Database, note: PIPELINE.main[2].detail },
  { id: 'api', title: 'REST Endpoints', sub: 'Node / Spring Boot', Icon: Server, note: 'Backend routes, validation and data queries are built and tested against the schema.' },
  { id: 'ui', title: 'Frontend UI', sub: 'Responsive screens', Icon: Layout, note: PIPELINE.main[3].detail },
  { id: 'qa', title: 'Review & QA', sub: 'Flows & states', Icon: ShieldCheck, note: PIPELINE.main[4].detail },
  { id: 'deploy', title: 'Live Deploy', sub: 'Static & cloud build', Icon: Globe, active: true, note: PIPELINE.main[5].detail }
];

const FLOW_BOTTOM = [
  { id: 'repo', title: 'GitHub Repo', sub: 'Clean source code', Icon: GitBranch, note: 'Full repository with organised components, assets and commit history.' },
  { id: 'shipped', title: 'Shipped', sub: 'Live & verified', Icon: Trophy, tone: 'won', note: PIPELINE.branch[1].detail },
  { id: 'docs', title: 'Setup Guide', sub: 'Env & build notes', Icon: FileText, note: 'Clear README and deployment guide so you can rebuild or rehost anytime.' },
  { id: 'next', title: 'Next Iteration', sub: 'Future features', Icon: Sparkles, note: PIPELINE.branch[0].detail }
];

export default function ServicesPage() {
  const [selectedNode, setSelectedNode] = useState(FLOW_TOP[0]);

  return (
    <section className="page-view page-services" aria-label="Services and methodology">
      <header className="view__head">
        <span className="view__eyebrow">SERVICES</span>
        <h2 className="view__title">Websites, APIs, databases and mobile apps.</h2>
        <p className="view__lede">What I build, how it works, and what you get.</p>
      </header>

      <div className="sweep-glass sgrid__shell">
        {/* 1. Top Method Card */}
        <div className="sgrid__method">
          <div className="sgrid__method-copy">
            <span className="sgrid__eyebrow">THE BUILD METHOD</span>
            <h3 className="sgrid__method-title">
              <strong>Plan. Build. Ship.</strong>
              <span>Always in that order.</span>
            </h3>
            <p className="sgrid__method-sub">
              Clear scope first, clean architecture second, reliable handoff last.
            </p>
          </div>

          <div className="sgrid__stages">
            {METHOD.map((stage, idx) => {
              const Icon = STAGE_ICONS[idx] || Code2;
              return (
                <React.Fragment key={stage.num}>
                  <article className="sgrid__stage">
                    <span className="sgrid__stage-ghost" aria-hidden="true">{stage.num}</span>
                    <span className="sgrid__stage-icon" aria-hidden="true">
                      <Icon size={18} />
                    </span>
                    <h4 className="sgrid__stage-label">{stage.name}</h4>
                    <p className="sgrid__stage-body">{stage.copy}</p>
                    <div className="sgrid__stage-chips">
                      {stage.tags.map((t) => (
                        <span key={t} className="sgrid__stage-chip">{t}</span>
                      ))}
                    </div>
                  </article>
                  {idx < METHOD.length - 1 && (
                    <span className="sgrid__connector" aria-hidden="true">
                      <i />
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* 2. 5-Column Services Offer Row */}
        <div className="sgrid__offers">
          <div className="sgrid__offers-head">
            <h3 className="sgrid__offers-title">What I can do for you.</h3>
            <span className="sgrid__offers-sub">Pick one or stack a few.</span>
          </div>

          <div className="sgrid__services">
            {SERVICES.map((svc, idx) => (
              <article key={svc.id} className="sgrid__service">
                <div className="sgrid__service-top">
                  <div className="bento__logos">
                    {svc.icons.map((ic, i) => (
                      <span key={i} className="bento__logo">
                        <BrandIcon item={ic} size={18} />
                      </span>
                    ))}
                  </div>
                  <span className="sgrid__service-index">
                    {String(idx + 1).padStart(2, '0')} / 05
                  </span>
                </div>

                <h4 className="sgrid__service-title">{svc.title}</h4>
                <p className="sgrid__service-desc">{svc.sub}</p>

                <span className="sgrid__chip">{svc.badge}</span>

                <ul className="sgrid__bullets">
                  {svc.checks.map((c) => (
                    <li key={c} className="sgrid__bullet">
                      <span className="sgrid__bullet-check" aria-hidden="true">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        {/* 3. Interactive Delivery Workflow Window */}
        <div className="sgrid__flow">
          <div className="sgrid__flow-head">
            <span className="sgrid__eyebrow">DELIVERY PIPELINE</span>
            <h3 className="sgrid__flow-title">One brief. Clean handoff.</h3>
            <p className="sgrid__flow-sub">
              You share what needs to be built. Each stage moves in order from database schema to live deploy.
            </p>
            <div className="sgrid__flow-tools">
              <span className="sgrid__flow-tool"><Database size={13} /> MySQL &amp; REST APIs</span>
              <span className="sgrid__flow-tool"><Server size={13} /> Java 21 &amp; Node.js</span>
              <span className="sgrid__flow-tool"><Rocket size={13} /> Vite &amp; Cloud Hosting</span>
            </div>
          </div>

          <div className="wf-window">
            <div className="wf-window__bar">
              <span className="ppanel__dots" aria-hidden="true">
                <i /><i /><i />
              </span>
              <span className="wf-window__title">Delivery Workflow</span>
              <span className="wf-window__spacer" />
            </div>

            <div className="wf-canvas">
              <div className="wf-row wf-row--top">
                {FLOW_TOP.map(({ id, title, sub, Icon, trigger, active, note }) => {
                  const isSel = selectedNode.id === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      className={`wf-node ${trigger ? 'wf-node--trigger' : ''} ${active ? 'wf-node--active' : ''} ${isSel ? 'is-selected' : ''}`}
                      onClick={() => setSelectedNode({ id, title, note })}
                    >
                      <span className="wf-node__tile">
                        <Icon size={19} />
                      </span>
                      <strong className="wf-node__title">{title}</strong>
                      <small className="wf-node__sub">{sub}</small>
                    </button>
                  );
                })}
              </div>

              <div className="wf-loop-label" aria-hidden="true">
                <span>Feedback &amp; Revision Loop</span>
              </div>

              <div className="wf-row wf-row--bottom">
                {FLOW_BOTTOM.map(({ id, title, sub, Icon, tone, note }) => {
                  const isSel = selectedNode.id === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      className={`wf-node ${tone === 'won' ? 'wf-node--won' : ''} ${isSel ? 'is-selected' : ''}`}
                      onClick={() => setSelectedNode({ id, title, note })}
                    >
                      <span className="wf-node__tile">
                        <Icon size={19} />
                      </span>
                      <strong className="wf-node__title">{title}</strong>
                      <small className="wf-node__sub">{sub}</small>
                    </button>
                  );
                })}
              </div>

              <div className="wf-caption" role="status" aria-live="polite">
                <strong>{selectedNode.title}:</strong> {selectedNode.note}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
