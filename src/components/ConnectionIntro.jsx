import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PROJECTS, TOOLS } from '../data/site';
import { useTheme } from '../lib/theme';
import { BrandIcon, VerifiedBadge } from './Icons';

const INTRO_NODES = [
  { id: 'java', title: 'Java 21 · Spring', tag: 'Backend', tool: TOOLS[0], delay: 220 },
  { id: 'react', title: 'React · Vite', tag: 'Frontend', tool: TOOLS[6], delay: 300 },
  { id: 'node', title: 'Node · Express', tag: 'REST APIs', tool: TOOLS[2], delay: 380 },
  { id: 'mysql', title: 'MySQL · Schema', tag: 'Database', tool: TOOLS[4], delay: 460 },
  { id: 'flutter', title: 'Flutter · Dart', tag: 'Mobile', tool: TOOLS[5], delay: 540 },
  {
    id: 'github',
    title: 'GitHub · Source',
    tag: `${PROJECTS.length} Repos`,
    tool: TOOLS[7],
    delay: 620
  }
];

/* Desktop (800×440): flanking wings mirroring an edge-to-hub topology */
const DESKTOP_LAYOUT = {
  vw: 800,
  vh: 440,
  hub: { x: 400, y: 220 },
  points: [
    { x: 148, y: 78 },
    { x: 652, y: 78 },
    { x: 108, y: 220 },
    { x: 692, y: 220 },
    { x: 148, y: 362 },
    { x: 652, y: 362 }
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
    { x: 180, y: 46 },
    { x: 180, y: 394 },
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
  const [linkedIds, setLinkedIds] = useState([]);
  const [typedChars, setTypedChars] = useState(0);
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
    }, 320);
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

    // Typewriter sweep on earlnis.dev in the top address bar
    for (let i = 1; i <= domain.length; i += 1) {
      timers.push(window.setTimeout(() => setTypedChars(i), 45 + i * 32));
    }

    // Stagger each peripheral stack node locking onto the hub
    INTRO_NODES.forEach((node) => {
      timers.push(
        window.setTimeout(() => {
          setLinkedIds((prev) => (prev.includes(node.id) ? prev : [...prev, node.id]));
        }, node.delay + 280)
      );
    });

    // Mark connection healthy, hold briefly so visitor sees all 6 green routes + hub lock, then reveal shell
    timers.push(window.setTimeout(() => setPhase('connected'), 1000));
    timers.push(window.setTimeout(() => dismiss(), 1620));

    const onKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dismiss();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
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
      className={`cintro ${isConnected ? 'is-connected' : ''} ${phase === 'exiting' ? 'is-exiting' : ''}`}
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
          <span>{isConnected ? 'Connected' : `Routing ${linkedCount}/${INTRO_NODES.length}`}</span>
        </span>
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
                {/* Animated route draw-in + live dashed flow */}
                <path
                  d={edge.d}
                  pathLength="1"
                  className={`cintro__wire ${isLinked ? 'is-linked' : ''}`}
                  style={{ '--wire-delay': `${edge.delay}ms` }}
                />
                {/* Flowing packet pulse once route connects */}
                {isLinked && (
                  <path d={edge.d} className="cintro__pulse" />
                )}
              </g>
            );
          })}
        </svg>

        {/* Peripheral connected nodes */}
        {edges.map((edge) => {
          const isLinked = linkedIds.includes(edge.id);
          return (
            <div
              key={edge.id}
              className={`cintro__node ${isLinked ? 'is-linked' : ''} ${isConnected ? 'is-ready' : ''}`}
              style={{
                left: `${(edge.pt.x / layout.vw) * 100}%`,
                top: `${(edge.pt.y / layout.vh) * 100}%`,
                '--node-delay': `${edge.delay}ms`
              }}
            >
              <span className="cintro__node-ico">
                <BrandIcon item={edge.tool} size={15} />
              </span>
              <span className="cintro__node-copy">
                <strong>{edge.title}</strong>
                <small>{edge.tag}</small>
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
