import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../lib/theme';

/* ==========================================================================
   ProjectReel3D — original Three.js multi-tier project barrel.
   Three rings of curved project cards around a vertical axis.
   - Auto-rotates slowly, pauses while a card is hovered
   - Drag to spin (with inertia); mouse drag up/down tilts the barrel
   - Hover shows a category / title badge, click opens that project
   - Arrow keys + parent-controlled rotate() for accessibility
   ========================================================================== */

const RINGS = 3;
const SLOTS = 10;
const RADIUS = 9;
const SLOT_ANGLE = (Math.PI * 2) / SLOTS;
const CARD_ANGLE = SLOT_ANGLE * 0.8;
const CARD_W = RADIUS * CARD_ANGLE; // arc length ≈ card width
const CARD_H = CARD_W / 1.58;
const RING_GAP = CARD_H * 1.1;
const BASE_PITCH = 0.1;
const MAX_PITCH = 0.42;

function parseFocusY(position) {
  if (!position) return 0.18;
  const parts = String(position).trim().split(/\s+/);
  const y = parts[1];
  if (y && y.endsWith('%')) return Math.min(1, Math.max(0, parseFloat(y) / 100));
  return 0.18;
}

function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function paintCard(canvas, project, img) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  ctx.save();
  roundRectPath(ctx, 0, 0, w, h, 38);
  ctx.clip();

  ctx.fillStyle = '#0b1e3f';
  ctx.fillRect(0, 0, w, h);

  if (img) {
    const isSvg = /\.svg(\?|$)/i.test(project.image || '');
    // Illustrated previews are 1200×760 vector art without intrinsic size attributes.
    const iw = isSvg ? 1200 : img.naturalWidth || img.width || 1200;
    const ih = isSvg ? 760 : img.naturalHeight || img.height || 760;
    if (project.phone) {
      const scale = Math.min(w / iw, h / ih);
      ctx.fillStyle = '#12284d';
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, (w - iw * scale) / 2, (h - ih * scale) / 2, iw * scale, ih * scale);
    } else {
      const scale = Math.max(w / iw, h / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const focus = parseFocusY(project.imagePosition);
      ctx.drawImage(img, (w - dw) / 2, -(dh - h) * focus, dw, dh);
    }
  } else {
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, '#0b1e3f');
    g.addColorStop(1, '#16407a');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 64px Poppins, Arial, sans-serif';
    ctx.fillText(project.title, 56, h / 2);
  }

  // Bottom label scrim with category + title
  const scrim = ctx.createLinearGradient(0, h * 0.62, 0, h);
  scrim.addColorStop(0, 'rgba(6, 14, 30, 0)');
  scrim.addColorStop(1, 'rgba(6, 14, 30, 0.88)');
  ctx.fillStyle = scrim;
  ctx.fillRect(0, h * 0.62, w, h * 0.38);

  ctx.fillStyle = '#7cb7ff';
  ctx.font = '700 26px Poppins, Arial, sans-serif';
  ctx.fillText(project.category.toUpperCase(), 44, h - 82);
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 44px Poppins, Arial, sans-serif';
  ctx.fillText(project.title, 44, h - 30);

  ctx.restore();

  ctx.save();
  roundRectPath(ctx, 3, 3, w - 6, h - 6, 36);
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.stroke();
  ctx.restore();
}

export default function ProjectReel3D({
  projects,
  onOpen,
  onActiveChange,
  controlRef,
  captureWheel = false,
  expanded = false
}) {
  const { reduceMotion } = useTheme();
  const mountRef = useRef(null);
  const badgeRef = useRef(null);
  const openRef = useRef(onOpen);
  const activeRef = useRef(onActiveChange);
  const reduceRef = useRef(reduceMotion);
  const captureWheelRef = useRef(captureWheel);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    openRef.current = onOpen;
    activeRef.current = onActiveChange;
  }, [onOpen, onActiveChange]);

  useEffect(() => {
    captureWheelRef.current = captureWheel;
  }, [captureWheel]);

  useEffect(() => {
    reduceRef.current = reduceMotion;
  }, [reduceMotion]);

  const handleKey = useCallback((e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      controlRef?.current?.rotate(1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      controlRef?.current?.rotate(-1);
    }
  }, [controlRef]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || !projects?.length) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      setFailed(true);
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 200);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    const dom = renderer.domElement;
    dom.className = 'reel3d__canvas';

    const pitchGroup = new THREE.Group();
    pitchGroup.position.y = 0.28;
    const spinGroup = new THREE.Group();
    pitchGroup.add(spinGroup);
    scene.add(pitchGroup);

    const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    const loader = new THREE.TextureLoader();
    const cards = [];
    const disposables = [];
    let disposed = false;

    for (let r = 0; r < RINGS; r += 1) {
      const y = (1 - r) * RING_GAP;
      for (let i = 0; i < SLOTS; i += 1) {
        const project = projects[(i + r * 5) % projects.length];
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 648;
        paintCard(canvas, project, null);

        const tex = new THREE.CanvasTexture(canvas);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = maxAniso;
        tex.generateMipmaps = true;
        tex.minFilter = THREE.LinearMipmapLinearFilter;

        const geo = new THREE.CylinderGeometry(
          RADIUS, RADIUS, CARD_H, 18, 1, true, -CARD_ANGLE / 2, CARD_ANGLE
        );
        geo.translate(0, 0, -RADIUS);
        const mat = new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: false
        });
        const mesh = new THREE.Mesh(geo, mat);
        const a = i * SLOT_ANGLE;
        mesh.position.set(Math.sin(a) * RADIUS, y, Math.cos(a) * RADIUS);
        mesh.rotation.y = a;
        mesh.userData = { project, slot: i, ring: r, canvas, tex, scale: 1 };
        spinGroup.add(mesh);
        cards.push(mesh);
        disposables.push(geo, mat, tex);
      }
    }

    // Load each unique project image once, then repaint every card that uses it.
    const byProject = new Map();
    cards.forEach((m) => {
      const id = m.userData.project.id;
      if (!byProject.has(id)) byProject.set(id, []);
      byProject.get(id).push(m);
    });
    byProject.forEach((meshes) => {
      const project = meshes[0].userData.project;
      loader.load(
        project.image,
        (t) => {
          if (disposed) {
            t.dispose();
            return;
          }
          const img = t.image;
          meshes.forEach((m) => {
            paintCard(m.userData.canvas, project, img);
            m.userData.tex.needsUpdate = true;
          });
          t.dispose();
        },
        undefined,
        () => {
          /* keep placeholder gradient card */
        }
      );
    });

    const state = {
      rotation: 0,
      target: 0,
      velocity: 0,
      pitch: BASE_PITCH,
      pitchTarget: BASE_PITCH,
      dragging: false,
      moved: 0,
      lastX: 0,
      lastY: 0,
      lastInteract: 0,
      hovered: null,
      downHit: null,
      pointerInside: false,
      pointerX: 0,
      pointerY: 0,
      visible: true,
      pointerType: 'mouse'
    };

    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();

    const frontPick = (clientX, clientY) => {
      const rect = dom.getBoundingClientRect();
      ndc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(cards, false);
      // Only cards facing the viewer can be picked
      const wp = new THREE.Vector3();
      for (const hit of hits) {
        hit.object.getWorldPosition(wp);
        if (wp.z > -RADIUS * 0.15) return hit.object;
      }
      return null;
    };

    const onDown = (e) => {
      state.dragging = true;
      state.moved = 0;
      state.lastX = e.clientX;
      state.lastY = e.clientY;
      state.pointerX = e.clientX;
      state.pointerY = e.clientY;
      state.pointerInside = true;
      state.velocity = 0;
      state.pointerType = e.pointerType || 'mouse';
      state.downHit = frontPick(e.clientX, e.clientY) || state.hovered;
      dom.setPointerCapture?.(e.pointerId);
      dom.classList.add('is-grabbing');
    };

    const onMove = (e) => {
      state.pointerX = e.clientX;
      state.pointerY = e.clientY;
      state.pointerInside = true;
      if (state.dragging) {
        const dx = e.clientX - state.lastX;
        const dy = e.clientY - state.lastY;
        state.moved += Math.abs(dx) + Math.abs(dy);
        state.lastX = e.clientX;
        state.lastY = e.clientY;
        if (state.moved <= 4) return;
        state.velocity = dx * 0.0062;
        state.target += state.velocity;
        if (state.pointerType !== 'touch') {
          state.pitchTarget = Math.min(MAX_PITCH, Math.max(-MAX_PITCH * 0.4, state.pitchTarget + dy * 0.004));
        }
        state.lastInteract = performance.now();
        state.hovered = null;
        return;
      }
      if (e.pointerType === 'touch') return;
      const picked = frontPick(e.clientX, e.clientY);
      if (picked && !state.hovered && Math.abs(state.velocity) <= 0.0004) {
        state.target = state.rotation;
      }
      state.hovered = picked;
      dom.style.cursor = picked ? 'pointer' : 'grab';
    };

    const onUp = (e) => {
      const wasClick = state.dragging && state.moved < 10;
      const fallbackHit = state.downHit;
      state.dragging = false;
      state.downHit = null;
      dom.classList.remove('is-grabbing');
      dom.releasePointerCapture?.(e.pointerId);
      if (wasClick) {
        const hit = frontPick(e.clientX, e.clientY) || fallbackHit;
        if (hit) openRef.current?.(hit.userData.project.id);
      }
    };

    const onLeave = () => {
      state.pointerInside = false;
      state.hovered = null;
    };

    const onWheel = (e) => {
      const horiz = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (!captureWheelRef.current && !e.shiftKey && !horiz) return;
      e.preventDefault();
      const raw = horiz ? e.deltaX : e.deltaY;
      const step = Math.max(-0.24, Math.min(0.24, raw * 0.0022));
      state.target -= step;
      state.velocity = -step * 0.14;
      state.lastInteract = performance.now();
    };

    dom.addEventListener('pointerdown', onDown);
    dom.addEventListener('pointermove', onMove);
    dom.addEventListener('pointerup', onUp);
    dom.addEventListener('pointercancel', onUp);
    dom.addEventListener('pointerleave', onLeave);
    dom.addEventListener('wheel', onWheel, { passive: false });

    if (controlRef) {
      controlRef.current = {
        rotate: (dir) => {
          state.target = Math.round(state.target / SLOT_ANGLE) * SLOT_ANGLE + dir * SLOT_ANGLE;
          state.velocity = 0;
          state.lastInteract = performance.now();
        }
      };
    }

    const resize = () => {
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 420;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const totalH = RING_GAP * (RINGS - 1) + CARD_H;
      const distH = (totalH * 1.28) / 2 / tanHalf;
      const distW = ((RADIUS + CARD_W * 0.4) * 1.0) / (tanHalf * camera.aspect);
      const dist = Math.max(distH, distW * 0.62);
      camera.position.set(0, 0, RADIUS + dist);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const io = new IntersectionObserver(
      ([entry]) => {
        state.visible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    const wp = new THREE.Vector3();
    const proj = new THREE.Vector3();
    let lastActive = -1;
    let rafId = 0;
    let prev = performance.now();

    const tick = (now) => {
      rafId = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      if (!state.visible || document.hidden) return;

      if (!state.dragging) {
        if (Math.abs(state.velocity) > 0.0004) {
          state.target += state.velocity;
          state.velocity *= 0.93;
        } else if (!reduceRef.current && !state.hovered) {
          state.target -= 0.26 * dt;
        }
        if (now - state.lastInteract > 2600) {
          state.pitchTarget += (BASE_PITCH - state.pitchTarget) * 0.02;
        }
      }

      state.rotation += (state.target - state.rotation) * Math.min(1, dt * 6);
      state.pitch += (state.pitchTarget - state.pitch) * Math.min(1, dt * 6);
      spinGroup.rotation.y = state.rotation;
      pitchGroup.rotation.x = state.pitch;
      pitchGroup.updateMatrixWorld(true);

      if (state.pointerInside && !state.dragging && state.pointerType !== 'touch' && Math.abs(state.target - state.rotation) > 0.002) {
        state.hovered = frontPick(state.pointerX, state.pointerY);
        dom.style.cursor = state.hovered ? 'pointer' : 'grab';
      }

      for (const m of cards) {
        m.getWorldPosition(wp);
        const depth = (wp.z + RADIUS * 1.2) / (RADIUS * 2.4);
        const front = Math.min(1, Math.max(0, depth));
        const isHover = state.hovered === m;
        const targetScale = isHover ? 1.07 : 1;
        m.userData.scale += (targetScale - m.userData.scale) * Math.min(1, dt * 10);
        m.scale.setScalar(m.userData.scale);
        m.material.opacity = 0.18 + 0.82 * Math.pow(front, 1.5);
        m.renderOrder = Math.round(front * 100);
      }

      const slot = ((Math.round(-state.rotation / SLOT_ANGLE) % SLOTS) + SLOTS) % SLOTS;
      if (slot !== lastActive) {
        lastActive = slot;
        activeRef.current?.(projects[(slot + 5) % projects.length]);
      }

      const badge = badgeRef.current;
      if (badge) {
        const hv = state.hovered;
        if (hv && !state.dragging) {
          hv.getWorldPosition(proj);
          proj.y += CARD_H * 0.5;
          proj.project(camera);
          const w = container.clientWidth;
          const h = container.clientHeight;
          const px = (proj.x * 0.5 + 0.5) * w;
          const py = (-proj.y * 0.5 + 0.5) * h;
          if (badge.dataset.id !== hv.userData.project.id) {
            badge.dataset.id = hv.userData.project.id;
            badge.querySelector('small').textContent = hv.userData.project.category;
            badge.querySelector('strong').textContent = hv.userData.project.title;
          }
          badge.style.transform = `translate(${Math.min(w - 90, Math.max(90, px))}px, ${Math.max(34, py)}px) translate(-50%, -100%)`;
          badge.classList.add('is-on');
        } else {
          badge.classList.remove('is-on');
        }
      }

      renderer.render(scene, camera);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      dom.removeEventListener('pointerdown', onDown);
      dom.removeEventListener('pointermove', onMove);
      dom.removeEventListener('pointerup', onUp);
      dom.removeEventListener('pointercancel', onUp);
      dom.removeEventListener('pointerleave', onLeave);
      dom.removeEventListener('wheel', onWheel);
      if (controlRef) controlRef.current = null;
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (dom.parentNode === container) container.removeChild(dom);
    };
  }, [projects, controlRef]);

  if (failed) {
    return (
      <div className="reel3d reel3d--fallback" role="list">
        {projects.map((p) => (
          <button key={p.id} type="button" className="reel3d__fallback-card" onClick={() => onOpen?.(p.id)}>
            <img src={p.image} alt={p.imageAlt || p.title} loading="lazy" />
            <strong>{p.title}</strong>
            <span>{p.category}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`reel3d ${expanded ? 'is-expanded' : ''}`}
      tabIndex={0}
      role="group"
      aria-label="3D project reel. Drag to spin, use left and right arrow keys, click a card to open it."
      onKeyDown={handleKey}
    >
      <div ref={mountRef} className="reel3d__mount" />
      <div ref={badgeRef} className="reel3d__badge" aria-hidden="true">
        <small />
        <strong />
      </div>
      <span className="reel3d__hint" aria-hidden="true">Drag to spin · click a card to open</span>
    </div>
  );
}
