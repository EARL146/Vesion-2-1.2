import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TOOLS } from '../data/site';
import { useTheme } from '../lib/theme';
import { BrandIcon, VerifiedBadge } from './Icons';

const INTRO_NODES = [
  { id: 'java', title: 'Java 21 · Spring', tool: TOOLS[0] },
  { id: 'react', title: 'React · Vite', tool: TOOLS[6] },
  { id: 'node', title: 'Node · Express', tool: TOOLS[2] },
  { id: 'mysql', title: 'MySQL · Schema', tool: TOOLS[4] },
  { id: 'flutter', title: 'Flutter · Dart', tool: TOOLS[5] },
  { id: 'github', title: 'GitHub · Source', tool: TOOLS[7] }
];

const LOAD_DURATION_MS = 6800;
const HOLD_CONNECTED_MS = 1600;
const EXIT_DURATION_MS = 600;

/* Desktop (800×440): flanking wings mirroring an edge-to-hub topology */
const DESKTOP_LAYOUT = {
  vw: 800,
  vh: 440,
  hub: { x: 400, y: 220 },
  points: [
    { x: 166, y: 78 },
    { x: 634, y: 78 },
    { x: 134, y: 220 },
    { x: 666, y: 220 },
    { x: 166, y: 362 },
    { x: 634, y: 362 }
  ]
};

/* Mobile (360×440): 6-node radial symmetry matching OmniRoute's hub-and-spoke geometry */
const MOBILE_LAYOUT = {
  vw: 360,
  vh: 440,
  hub: { x: 180, y: 220 },
  points: [
    { x: 88, y: 126 },
    { x: 272, y: 126 },
    { x: 180, y: 48 },
    { x: 180, y: 392 },
    { x: 88, y: 314 },
    { x: 272, y: 314 }
  ]
};

function buildCurvePath(pt, hub, isMobile) {
  if (isMobile) {
    if (Math.abs(pt.x - hub.x) < 2) {
      return `M ${hub.x} ${hub.y} L ${pt.x} ${pt.y}`;
    }
    const midY = (hub.y + pt.y) / 2;
    return `M ${hub.x} ${hub.y} C ${hub.x} ${midY}, ${pt.x} ${midY}, ${pt.x} ${pt.y}`;
  }
  if (Math.abs(pt.y - hub.y) < 2) {
    return `M ${hub.x} ${hub.y} L ${pt.x} ${pt.y}`;
  }
  const midX = (hub.x + pt.x) / 2;
  return `M ${hub.x} ${hub.y} C ${midX} ${hub.y}, ${midX} ${pt.y}, ${pt.x} ${pt.y}`;
}

export default function ConnectionIntro({ onDone }) {
  const { reduceMotion } = useTheme();
  const [phase, setPhase] = useState('routing');
  const [armed, setArmed] = useState(false);
  const [linkedIds, setLinkedIds] = useState([]);
  const [typedChars, setTypedChars] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );
  const finishedRef = useRef(false);
  const domain = 'earlnis.dev';

  const dismiss = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setPhase('exiting');
    window.setTimeout(() => {
      onDone?.();
    }, EXIT_DURATION_MS);
  }, [onDone]);

  useEffect(() => {
    if (reduceMotion) {
      onDone?.();
      return undefined;
    }

    const mq = window.matchMedia('(max-width: 639px)');
    const onMq = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', onMq);

    const timers = [];
    const startAt = performance.now();
    let lastPct = -1;
    setArmed(true);

    // Slow-motion typewriter sweep on earlnis.dev in the top address bar
    for (let i = 1; i <= domain.length; i += 1) {
      timers.push(window.setTimeout(() => setTypedChars(i), 180 + i * 120));
    }

    // Throttled slow-motion progress counter (~75ms ticks) synchronized with ~6.8s wire trace
    const progressTimer = window.setInterval(() => {
      const t = Math.min(1, (performance.now() - startAt) / LOAD_DURATION_MS);
      const eased = 1 - Math.pow(1 - t, 1.35);
      const pct = Math.min(99, Math.round(eased * 100));
      if (pct !== lastPct) {
        lastPct = pct;
        setProgress(pct);
      }
      if (t >= 1) {
        window.clearInterval(progressTimer);
      }
    }, 75);

    // Connect all 6 peripheral stack nodes simultaneously in unison ("sabay-sabay")
    timers.push(
      window.setTimeout(() => {
        window.clearInterval(progressTimer);
        setProgress(100);
        setLinkedIds(INTRO_NODES.map((n) => n.id));
        setPhase('connected');
      }, LOAD_DURATION_MS)
    );

    // Hold healthy all-connected state briefly, then smoothly dissolve into portfolio (~9s total)
    timers.push(
      window.setTimeout(() => dismiss(), LOAD_DURATION_MS + HOLD_CONNECTED_MS)
    );

    const onKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dismiss();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.clearInterval(progressTimer);
      timers.forEach((id) => window.clearTimeout(id));
      mq.removeEventListener('change', onMq);
      window.removeEventListener('keydown', onKey);
    };
  }, [reduceMotion, dismiss]);

  const layout = isMobile ? MOBILE_LAYOUT : DESKTOP_LAYOUT;
  const linkedCount = linkedIds.length;
  const isConnected = phase === 'connected' || phase === 'exiting';

  const edges = useMemo(
    () =>
      INTRO_NODES.map((node, idx) => {
        const pt = layout.points[idx];
        return {
          ...node,
          pt,
          d: buildCurvePath(pt, layout.hub, isMobile)
        };
      }),
    [layout, isMobile]
  );

  return (
    <div
      className={`cintro ${armed ? 'is-armed' : ''} ${isConnected ? 'is-connected' : ''} ${phase === 'exiting' ? 'is-exiting' : ''}`}
      role="region"
      aria-label="Connecting to earlnis.dev portfolio"
      onClick={dismiss}
    >
      <div className="cintro__glow" aria-hidden="true" />

      {/* Top typed domain bar reflecting opening earlnis.dev */}
      <div className="cintro__bar" onClick={(e) => e.stopPropagation()}>
        <span className="cintro__proto">https://</span>
        <strong className="cintro__domain">
          {domain.slice(0, typedChars)}
          {!isConnected && <i className="cintro__cursor" aria-hidden="true" />}
        </strong>
        <span className={`cintro__state ${isConnected ? 'is-online' : ''}`}>
          <i className="cintro__state-dot" aria-hidden="true" />
          <span>{isConnected ? 'Connected' : `Loading ${progress}%`}</span>
        </span>
        <span className="cintro__progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      </div>

      {/* OmniRoute-style hub-and-spoke topology canvas */}
      <div
        className={`cintro__stage ${isMobile ? 'is-mobile' : ''}`}
        style={{ aspectRatio: `${layout.vw} / ${layout.vh}` }}
      >
        <svg
          className="cintro__svg"
          viewBox={`0 0 ${layout.vw} ${layout.vh}`}
          fill="none"
          aria-hidden="true"
        >
          {edges.map((edge) => {
            const isLinked = linkedIds.includes(edge.id);
            return (
              <g key={edge.id}>
                {/* Passive track guide */}
                <path d={edge.d} className="cintro__track" />
                {/* Slow-motion animated route draw-in */}
                <path
                  d={edge.d}
                  pathLength="1"
                  className={`cintro__wire ${isLinked ? 'is-linked' : ''}`}
                />
                {/* Slow-motion flowing packet pulse once all routes connect */}
                {isLinked && (
                  <path d={edge.d} className="cintro__pulse" />
                )}
              </g>
            );
          })}
        </svg>

        {/* Peripheral connected nodes (logo-only badges) */}
        {edges.map((edge) => {
          const isLinked = linkedIds.includes(edge.id);
          return (
            <div
              key={edge.id}
              className={`cintro__node ${isLinked ? 'is-linked' : ''} ${isConnected ? 'is-ready' : ''}`}
              aria-label={edge.title}
              title={edge.title}
              style={{
                left: `${(edge.pt.x / layout.vw) * 100}%`,
                top: `${(edge.pt.y / layout.vh) * 100}%`
              }}
            >
              <span className="cintro__node-ico">
                <BrandIcon item={edge.tool} size={isMobile ? 20 : 24} />
              </span>
              <span className="cintro__dot" aria-hidden="true" />
            </div>
          );
        })}

        {/* Central earlnis.dev Router Hub */}
        <div
          className={`cintro__hub ${isConnected ? 'is-online' : ''}`}
          style={{
            left: `${(layout.hub.x / layout.vw) * 100}%`,
            top: `${(layout.hub.y / layout.vh) * 100}%`
          }}
        >
          <span className="cintro__hub-ring" aria-hidden="true" />
          <span className="cintro__hub-mark" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="2.7" fill="currentColor" />
              <circle cx="5.5" cy="6.5" r="1.7" fill="currentColor" />
              <circle cx="18.5" cy="6.5" r="1.7" fill="currentColor" />
              <circle cx="5.5" cy="17.5" r="1.7" fill="currentColor" />
              <circle cx="18.5" cy="17.5" r="1.7" fill="currentColor" />
              <circle cx="12" cy="3.5" r="1.4" fill="currentColor" />
              <circle cx="12" cy="20.5" r="1.4" fill="currentColor" />
              <path
                d="M12 10.2L5.5 6.5M12 10.2L18.5 6.5M12 13.8L5.5 17.5M12 13.8L18.5 17.5M12 9.5V3.5M12 14.5V20.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="cintro__hub-copy">
            <span className="cintro__hub-title">
              <strong>earlnis.dev</strong>
              <VerifiedBadge size={14} />
            </span>
            <small>Earl Willan Pajo · Full-Stack</small>
          </span>
          <span className="cintro__hub-count">
            {linkedCount}/{INTRO_NODES.length}
          </span>
        </div>
      </div>

      <button
        type="button"
        className="cintro__skip"
        onClick={(e) => {
          e.stopPropagation();
          dismiss();
        }}
        aria-label="Skip connection intro"
      >
        <span>{isConnected ? 'Opening workspace…' : 'Skip intro →'}</span>
      </button>
    </div>
  );
}
