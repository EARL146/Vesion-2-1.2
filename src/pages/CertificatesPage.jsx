import React, { useState } from 'react';
import { Eye, ShieldCheck, GraduationCap } from 'lucide-react';
import { CERTIFICATES } from '../data/site';
import { ArrowUpRightIcon } from '../components/Icons';

const CERT_FILTERS = [
  { id: 'all', label: `All (${CERTIFICATES.length})` },
  { id: 'datacamp', label: 'DataCamp (6)' },
  { id: 'web', label: 'Web & AI' },
  { id: 'cyber', label: 'Cyber & Ops' }
];

export default function CertificatesPage({ onOpenCertificate }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [filter, setFilter] = useState('all');
  const current = CERTIFICATES[selectedIdx] || CERTIFICATES[0];
  const totalStr = String(CERTIFICATES.length).padStart(2, '0');

  const visibleCerts = CERTIFICATES.map((cert, idx) => ({ cert, idx })).filter(
    ({ cert }) => filter === 'all' || cert.category === filter
  );

  const handleFilterChange = (catId) => {
    setFilter(catId);
    const firstMatchIdx = CERTIFICATES.findIndex((c) => catId === 'all' || c.category === catId);
    if (firstMatchIdx >= 0) {
      setSelectedIdx(firstMatchIdx);
    }
  };

  return (
    <section className="page-view page-certs" aria-label="Verified certificates">
      <header className="view__head">
        <span className="view__eyebrow">CERTIFICATES</span>
        <h2 className="view__title">Twelve verified credentials behind the code.</h2>
        <p className="view__lede">
          Inspect each certificate at full size with device frames — including 6 DataCamp Statements of Accomplishment, TESDA, OPSWAT, PyCon Davao, Full Stack + AI and GoHighLevel.
        </p>

        <div className="cfilter" role="tablist" aria-label="Filter certificates by issuer or track">
          {CERT_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              className={`cfilter__chip ${filter === f.id ? 'is-active' : ''}`}
              onClick={() => handleFilterChange(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </header>

      <div className="sweep-glass tgrid__shell">
        {/* Left Stage Column */}
        <div className="tgrid__reel">
          <button
            type="button"
            className="tgrid__stage"
            onClick={() => onOpenCertificate(selectedIdx)}
            aria-label={`Open ${current.title} in full-screen viewer`}
          >
            <img src={current.image} alt={current.title} className="tgrid__img" />
            <div className="tgrid__shade" />
            <span className="tgrid__play" aria-hidden="true">
              <Eye size={24} />
            </span>
            <div className="tgrid__meta">
              <strong>{current.short}</strong>
              <span>#{current.num} OF {totalStr} · TAP TO INSPECT FULL SIZE</span>
            </div>
          </button>

          <div className="tgrid__picker" role="tablist" aria-label="Select certificate preview">
            {visibleCerts.map(({ cert: c, idx }) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={selectedIdx === idx}
                className={`tgrid__pick ${selectedIdx === idx ? 'is-active' : ''}`}
                onClick={() => setSelectedIdx(idx)}
              >
                <img src={c.thumb} alt="" className="tgrid__pick-thumb" />
                <span className="tgrid__pick-copy">
                  <strong>{c.short}</strong>
                  <small>#{c.num}</small>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Ledger Column */}
        <div className="tgrid__ledger">
          <div className="tgrid__ledger-head">
            <h3 className="tgrid__ledger-title">Twelve credentials. Real coursework behind them.</h3>
            <p className="tgrid__ledger-sub">
              Click any row to preview on the left, or open it in the full-resolution viewer.
            </p>
          </div>

          <div className="tgrid__card">
            <ul className="tgrid__list">
              {visibleCerts.map(({ cert, idx }) => (
                <li
                  key={cert.id}
                  className={`tgrid__row ${selectedIdx === idx ? 'is-selected' : ''}`}
                  onClick={() => setSelectedIdx(idx)}
                >
                  <span className="tgrid__ghost" aria-hidden="true">{cert.num}</span>

                  <span className="tgrid__mark" aria-hidden="true">
                    <ShieldCheck size={18} />
                  </span>

                  <div className="tgrid__body">
                    <div className="tgrid__row-head">
                      <strong className="tgrid__name">{cert.short}</strong>
                      <span className="tgrid__role">{cert.issuer.toUpperCase()}</span>
                    </div>

                    <p className="tgrid__desc">{cert.desc}</p>

                    <div className="tgrid__tags">
                      {cert.skills.map((sk) => (
                        <span key={sk} className="tgrid__tag">{sk}</span>
                      ))}
                      <button
                        type="button"
                        className="tgrid__inspect-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenCertificate(idx);
                        }}
                      >
                        <span>Open viewer</span>
                        <ArrowUpRightIcon size={12} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="tgrid__edu">
              <span className="tgrid__mark">
                <GraduationCap size={18} />
              </span>
              <div>
                <strong>BSIT Undergraduate · Legacy Compostela College</strong>
                <p>Started in SHS TVL-ICT Computer Programming (2025) · Compostela, Davao de Oro</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
