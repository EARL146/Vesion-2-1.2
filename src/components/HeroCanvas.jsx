import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Zap, X } from 'lucide-react';

const COLOR_PALETTES = {
  cyber: {
    id: 'cyber',
    name: 'Cyber Cyan',
    colorDot: '#00d2ff',
    dark: {
      primary: 0x00d2ff,
      secondary: 0x2c84dd,
      accent: 0x818cf8,
      wireframeAlpha: 0.65,
      nodeAlpha: 1.0,
      lineAlpha: 0.60,
      dustAlpha: 0.85
    },
    light: {
      primary: 0x0059b3,
      secondary: 0x0b1e3f,
      accent: 0x2563eb,
      wireframeAlpha: 0.55,
      nodeAlpha: 0.95,
      lineAlpha: 0.50,
      dustAlpha: 0.75
    }
  },
  matrix: {
    id: 'matrix',
    name: 'Matrix Neon',
    colorDot: '#10b981',
    dark: {
      primary: 0x10b981,
      secondary: 0x059669,
      accent: 0x06b6d4,
      wireframeAlpha: 0.65,
      nodeAlpha: 1.0,
      lineAlpha: 0.60,
      dustAlpha: 0.85
    },
    light: {
      primary: 0x047857,
      secondary: 0x064e3b,
      accent: 0x0284c7,
      wireframeAlpha: 0.55,
      nodeAlpha: 0.95,
      lineAlpha: 0.50,
      dustAlpha: 0.75
    }
  },
  violet: {
    id: 'violet',
    name: 'Neon Violet',
    colorDot: '#a855f7',
    dark: {
      primary: 0xa855f7,
      secondary: 0x6366f1,
      accent: 0xec4899,
      wireframeAlpha: 0.65,
      nodeAlpha: 1.0,
      lineAlpha: 0.60,
      dustAlpha: 0.85
    },
    light: {
      primary: 0x7e22ce,
      secondary: 0x3730a3,
      accent: 0xbe185d,
      wireframeAlpha: 0.55,
      nodeAlpha: 0.95,
      lineAlpha: 0.50,
      dustAlpha: 0.75
    }
  },
  solar: {
    id: 'solar',
    name: 'Solar Amber',
    colorDot: '#f59e0b',
    dark: {
      primary: 0xf59e0b,
      secondary: 0xf97316,
      accent: 0xef4444,
      wireframeAlpha: 0.65,
      nodeAlpha: 1.0,
      lineAlpha: 0.60,
      dustAlpha: 0.85
    },
    light: {
      primary: 0xd97706,
      secondary: 0x9a3412,
      accent: 0xb91c1c,
      wireframeAlpha: 0.55,
      nodeAlpha: 0.95,
      lineAlpha: 0.50,
      dustAlpha: 0.75
    }
  }
};

const PALETTE_KEYS = Object.keys(COLOR_PALETTES);

// High-fidelity pure white circular glow sprite (lets material.color shine through at 100% brilliance)
function createParticleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.9)');
  grad.addColorStop(0.65, 'rgba(255, 255, 255, 0.35)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);

  return new THREE.CanvasTexture(canvas);
}

function getActiveTheme() {
  try {
    const docTheme = document.documentElement.dataset.theme;
    if (docTheme === 'dark' || docTheme === 'light') return docTheme;
    return localStorage.getItem('earl-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  } catch {
    return 'light';
  }
}

export default function HeroCanvas() {
  const canvasRef = useRef(null);
  const [activePalette, setActivePalette] = useState('cyber');
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0);
  const [isHudCollapsed, setIsHudCollapsed] = useState(false);

  const materialsRef = useRef({});
  const speedRef = useRef(1.0);
  speedRef.current = speedMultiplier;

  const updateMaterialsColor = (paletteKey) => {
    const isDark = getActiveTheme() === 'dark';
    const cfg = COLOR_PALETTES[paletteKey] || COLOR_PALETTES.cyber;
    const mode = isDark ? cfg.dark : cfg.light;
    const mats = materialsRef.current;

    if (!mats.nodes) return;

    mats.nodes.color.setHex(mode.primary);
    mats.nodes.opacity = mode.nodeAlpha;

    mats.lines.color.setHex(mode.secondary);
    mats.lines.opacity = mode.lineAlpha;

    mats.wave.color.setHex(mode.secondary);
    mats.wave.opacity = mode.wireframeAlpha;

    mats.dust.color.setHex(mode.accent);
    mats.dust.opacity = mode.dustAlpha;

    if (mats.heroIco) {
      mats.heroIco.color.setHex(mode.primary);
      mats.heroIco.opacity = mode.wireframeAlpha;
    }
    if (mats.heroInner) {
      mats.heroInner.color.setHex(mode.accent);
      mats.heroInner.opacity = isDark ? 0.28 : 0.18;
    }

    mats.torusKnot.color.setHex(mode.primary);
    mats.torusKnot.opacity = mode.wireframeAlpha;

    mats.octa.color.setHex(mode.secondary);
    mats.octa.opacity = mode.wireframeAlpha;

    mats.octaRing.color.setHex(mode.accent);
    mats.octaRing.opacity = mode.wireframeAlpha;

    if (mats.mouseLight) {
      mats.mouseLight.color.setHex(mode.primary);
    }
    if (mats.ambientLight) {
      mats.ambientLight.intensity = isDark ? 0.9 : 1.1;
    }
  };

  useEffect(() => {
    updateMaterialsColor(activePalette);
  }, [activePalette]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const isMobile = window.innerWidth < 768;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 13);

    const isDarkInitial = getActiveTheme() === 'dark';
    const initialMode = isDarkInitial ? COLOR_PALETTES[activePalette].dark : COLOR_PALETTES[activePalette].light;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isDarkInitial ? 0.9 : 1.1);
    scene.add(ambientLight);

    const mouseLight = new THREE.PointLight(initialMode.primary, 3.5, 30);
    mouseLight.position.set(0, 0, 5);
    scene.add(mouseLight);

    const particleTexture = createParticleTexture();

    // -------------------------------------------------------------
    // LAYER 1: Interactive Constellation Plexus Network
    // -------------------------------------------------------------
    const nodeCount = isMobile ? 65 : 120;
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 24;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 8 - 1;

      nodePositions[i * 3] = x;
      nodePositions[i * 3 + 1] = y;
      nodePositions[i * 3 + 2] = z;

      nodes.push({
        x, y, z,
        vx: (Math.random() - 0.5) * 0.018,
        vy: (Math.random() - 0.5) * 0.018,
        vz: (Math.random() - 0.5) * 0.012,
        baseX: x,
        baseY: y
      });
    }

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));

    // Using THREE.NormalBlending so colors are punchy, bold and visible in BOTH light and dark themes
    const nodeMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.65 : 0.85,
      map: particleTexture,
      transparent: true,
      opacity: initialMode.nodeAlpha,
      blending: THREE.NormalBlending,
      depthWrite: false,
      color: initialMode.primary
    });

    const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodePoints);

    // Constellation dynamic lines
    const maxConnections = isMobile ? 180 : 380;
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: initialMode.secondary,
      transparent: true,
      opacity: initialMode.lineAlpha,
      blending: THREE.NormalBlending,
      depthWrite: false
    });

    const constellationLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(constellationLines);

    // -------------------------------------------------------------
    // LAYER 2: Undulating Cyber Wave Terrain Horizon (Placed prominently in view)
    // -------------------------------------------------------------
    const waveSegmentsX = isMobile ? 26 : 38;
    const waveSegmentsY = isMobile ? 18 : 28;
    const waveGeometry = new THREE.PlaneGeometry(36, 24, waveSegmentsX, waveSegmentsY);
    const baseWavePositions = waveGeometry.attributes.position.clone();

    const waveMaterial = new THREE.MeshBasicMaterial({
      color: initialMode.secondary,
      wireframe: true,
      transparent: true,
      opacity: initialMode.wireframeAlpha,
      blending: THREE.NormalBlending
    });

    const waveMesh = new THREE.Mesh(waveGeometry, waveMaterial);
    waveMesh.position.set(0, -3.8, -2.8);
    waveMesh.rotation.x = -Math.PI / 2.4;
    scene.add(waveMesh);

    // -------------------------------------------------------------
    // LAYER 3: 3D Geometric Cyber Polyhedra Artifacts
    // -------------------------------------------------------------
    // Artifact 1: Hero Icosahedron Core (Top Right)
    const heroGroup = new THREE.Group();
    heroGroup.position.set(5.5, 2.0, -1.2);

    const heroIcoGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const heroIcoMat = new THREE.MeshBasicMaterial({
      color: initialMode.primary,
      wireframe: true,
      transparent: true,
      opacity: initialMode.wireframeAlpha,
      blending: THREE.NormalBlending
    });
    const heroIcoMesh = new THREE.Mesh(heroIcoGeo, heroIcoMat);
    heroGroup.add(heroIcoMesh);

    const heroInnerGeo = new THREE.OctahedronGeometry(0.9, 0);
    const heroInnerMat = new THREE.MeshBasicMaterial({
      color: initialMode.accent,
      transparent: true,
      opacity: isDarkInitial ? 0.28 : 0.18,
      side: THREE.DoubleSide,
      blending: THREE.NormalBlending
    });
    const heroInnerMesh = new THREE.Mesh(heroInnerGeo, heroInnerMat);
    heroGroup.add(heroInnerMesh);
    scene.add(heroGroup);

    // Artifact 2: Algorithm Torus Knot (Mid Left)
    const torusKnotGeo = new THREE.TorusKnotGeometry(1.1, 0.3, 64, 16);
    const torusKnotMat = new THREE.MeshBasicMaterial({
      color: initialMode.primary,
      wireframe: true,
      transparent: true,
      opacity: initialMode.wireframeAlpha,
      blending: THREE.NormalBlending
    });
    const torusKnotMesh = new THREE.Mesh(torusKnotGeo, torusKnotMat);
    torusKnotMesh.position.set(-5.6, -0.2, -1.8);
    scene.add(torusKnotMesh);

    // Artifact 3: Quantum Octahedron + Gyroscope Ring (Lower Right)
    const octaGroup = new THREE.Group();
    octaGroup.position.set(4.5, -4.5, -1.6);

    const octaGeo = new THREE.OctahedronGeometry(1.05, 0);
    const octaMat = new THREE.MeshBasicMaterial({
      color: initialMode.secondary,
      wireframe: true,
      transparent: true,
      opacity: initialMode.wireframeAlpha,
      blending: THREE.NormalBlending
    });
    const octaMesh = new THREE.Mesh(octaGeo, octaMat);
    octaGroup.add(octaMesh);

    const octaRingGeo = new THREE.TorusGeometry(1.5, 0.04, 16, 48);
    const octaRingMat = new THREE.MeshBasicMaterial({
      color: initialMode.accent,
      wireframe: true,
      transparent: true,
      opacity: initialMode.wireframeAlpha,
      blending: THREE.NormalBlending
    });
    const octaRingMesh = new THREE.Mesh(octaRingGeo, octaRingMat);
    octaRingMesh.rotation.x = Math.PI / 3;
    octaGroup.add(octaRingMesh);
    scene.add(octaGroup);

    // -------------------------------------------------------------
    // LAYER 4: Ambient Starfield / Cyber Dust
    // -------------------------------------------------------------
    const dustCount = isMobile ? 150 : 280;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustSpeeds = new Float32Array(dustCount);

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 36;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 28;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 16 - 3;
      dustSpeeds[i] = 0.01 + Math.random() * 0.016;
    }

    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));

    const dustMaterial = new THREE.PointsMaterial({
      size: 0.45,
      map: particleTexture,
      transparent: true,
      opacity: initialMode.dustAlpha,
      blending: THREE.NormalBlending,
      depthWrite: false,
      color: initialMode.accent
    });

    const dustPoints = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustPoints);

    // Store refs for real-time reactivity
    materialsRef.current = {
      nodes: nodeMaterial,
      lines: lineMaterial,
      wave: waveMaterial,
      dust: dustMaterial,
      heroIco: heroIcoMat,
      heroInner: heroInnerMat,
      torusKnot: torusKnotMat,
      octa: octaMat,
      octaRing: octaRingMat,
      ambientLight,
      mouseLight
    };

    // -------------------------------------------------------------
    // INTERACTION: Smooth Mouse Parallax & Page Scroll Physics
    // -------------------------------------------------------------
    let mouse = { x: 0, y: 0 };
    let targetMouse = { x: 0, y: 0 };
    let scrollProgress = 0;
    let targetScrollProgress = 0;

    const onPointerMove = (e) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      targetScrollProgress = window.scrollY / maxScroll;
    };

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    const themeObserver = new MutationObserver(() => {
      updateMaterialsColor(activePalette);
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    // -------------------------------------------------------------
    // ANIMATION LOOP (Guaranteed 60FPS Render Engine, Never Halted)
    // -------------------------------------------------------------
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      // Always request animation frame so graphics are continuously alive
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime() * speedRef.current;

      // Smooth pointer & scroll interpolation
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;
      scrollProgress += (targetScrollProgress - scrollProgress) * 0.06;

      // Dynamic Camera Parallax
      camera.position.x = mouse.x * 2.0;
      camera.position.y = mouse.y * 1.4 - scrollProgress * 4.5;
      camera.lookAt(0, -scrollProgress * 3.0, 0);

      // Light follows mouse in 3D
      mouseLight.position.x = mouse.x * 12;
      mouseLight.position.y = mouse.y * 8 - scrollProgress * 4.5;

      // 1. Animate Constellation Nodes & Physics
      const posAttr = nodeGeometry.attributes.position;
      let connectionCount = 0;
      const mouse3DX = mouse.x * 12;
      const mouse3DY = mouse.y * 8 - scrollProgress * 4.5;

      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];

        node.x += node.vx * speedRef.current;
        node.y += node.vy * speedRef.current;
        node.z += node.vz * speedRef.current;

        if (Math.abs(node.x) > 13) node.vx *= -1;
        if (Math.abs(node.y) > 9) node.vy *= -1;
        if (Math.abs(node.z) > 5) node.vz *= -1;

        // Interactive mouse magnetic repulsion
        const dx = node.x - mouse3DX;
        const dy = node.y - mouse3DY;
        const distSq = dx * dx + dy * dy;

        if (distSq < 16 && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / 4) * 0.06 * speedRef.current;
          node.x += (dx / dist) * force;
          node.y += (dy / dist) * force;
        }

        posAttr.setXYZ(i, node.x, node.y, node.z);

        // Calculate dynamic proximity lines
        for (let j = i + 1; j < nodeCount; j++) {
          if (connectionCount >= maxConnections) break;
          const other = nodes[j];
          const ldx = node.x - other.x;
          const ldy = node.y - other.y;
          const ldz = node.z - other.z;
          const lineDistSq = ldx * ldx + ldy * ldy + ldz * ldz;

          if (lineDistSq < 8.4) {
            const idx = connectionCount * 6;
            linePositions[idx] = node.x;
            linePositions[idx + 1] = node.y;
            linePositions[idx + 2] = node.z;
            linePositions[idx + 3] = other.x;
            linePositions[idx + 4] = other.y;
            linePositions[idx + 5] = other.z;
            connectionCount++;
          }
        }
      }

      posAttr.needsUpdate = true;
      lineGeometry.setDrawRange(0, connectionCount * 2);
      lineGeometry.attributes.position.needsUpdate = true;

      // 2. Animate Cyber Wave Terrain Grid
      const wavePos = waveGeometry.attributes.position;
      const waveCount = wavePos.count;
      for (let i = 0; i < waveCount; i++) {
        const u = baseWavePositions.getX(i);
        const v = baseWavePositions.getY(i);

        const w =
          Math.sin(u * 0.4 + elapsedTime * 1.4) * 0.45 +
          Math.cos(v * 0.4 + elapsedTime * 1.0) * 0.45 +
          Math.sin((u + v) * 0.25 + elapsedTime * 0.8) * 0.25;

        // Wave mouse ripple
        const mdx = u - mouse.x * 12;
        const mdy = v - (mouse.y * 8 - 4);
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        const ripple = mdist < 6 ? Math.sin(mdist * 1.5 - elapsedTime * 3.5) * (1 - mdist / 6) * 0.5 : 0;

        wavePos.setZ(i, w + ripple);
      }
      wavePos.needsUpdate = true;

      // 3. Animate 3D Geometric Artifacts
      heroGroup.rotation.x += 0.006 * speedRef.current;
      heroGroup.rotation.y += 0.009 * speedRef.current;
      heroGroup.position.y = 2.0 + Math.sin(elapsedTime * 0.85) * 0.35;
      heroInnerMesh.rotation.y -= 0.015 * speedRef.current;
      heroInnerMesh.rotation.z += 0.009 * speedRef.current;

      torusKnotMesh.rotation.x += 0.008 * speedRef.current;
      torusKnotMesh.rotation.y += 0.006 * speedRef.current;
      torusKnotMesh.position.y = -0.2 + Math.cos(elapsedTime * 0.75) * 0.35;

      octaGroup.rotation.x += 0.007 * speedRef.current;
      octaGroup.rotation.z += 0.01 * speedRef.current;
      octaGroup.position.y = -4.5 + Math.sin(elapsedTime * 0.7) * 0.35;
      octaRingMesh.rotation.z += 0.018 * speedRef.current;

      // 4. Animate Cosmic Cyber Dust
      const dustPos = dustGeometry.attributes.position;
      for (let i = 0; i < dustCount; i++) {
        let dy = dustPos.getY(i) + dustSpeeds[i] * speedRef.current;
        if (dy > 14) dy = -14;
        dustPos.setY(i, dy);
      }
      dustPos.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      themeObserver.disconnect();

      // Clean disposal
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      waveGeometry.dispose();
      waveMaterial.dispose();
      heroIcoGeo.dispose();
      heroIcoMat.dispose();
      heroInnerGeo.dispose();
      heroInnerMat.dispose();
      torusKnotGeo.dispose();
      torusKnotMat.dispose();
      octaGeo.dispose();
      octaMat.dispose();
      octaRingGeo.dispose();
      octaRingMat.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      if (particleTexture) particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  const cyclePalette = () => {
    const currentIndex = PALETTE_KEYS.indexOf(activePalette);
    const nextIndex = (currentIndex + 1) % PALETTE_KEYS.length;
    setActivePalette(PALETTE_KEYS[nextIndex]);
  };

  const cycleSpeed = () => {
    if (speedMultiplier === 1.0) setSpeedMultiplier(1.6);
    else if (speedMultiplier === 1.6) setSpeedMultiplier(0.5);
    else setSpeedMultiplier(1.0);
  };

  const currentCfg = COLOR_PALETTES[activePalette] || COLOR_PALETTES.cyber;
  const speedLabel = speedMultiplier === 1.6 ? 'Turbo (1.6x)' : speedMultiplier === 0.5 ? 'Zen (0.5x)' : 'Normal (1x)';

  return (
    <>
      {/* 3D WebGL Background Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          display: 'block'
        }}
        aria-hidden="true"
      />

      {/* Floating 3D Interactive Graphics HUD Controller */}
      <aside 
        className="graphics-hud" 
        aria-label="3D Background Graphics Controller"
      >
        {isHudCollapsed ? (
          <button 
            type="button" 
            className="graphics-hud-collapsed"
            onClick={() => setIsHudCollapsed(false)}
            title="Expand 3D Graphics Controls"
          >
            <span className="graphics-pulse-indicator">
              <span className="graphics-pulse-ring" />
            </span>
            <span>✦ 3D Graphics</span>
          </button>
        ) : (
          <div className="graphics-hud-pill">
            <span className="graphics-pulse-indicator">
              <span className="graphics-pulse-ring" />
            </span>

            <span className="graphics-hud-title">
              <Sparkles size={12} />
              <span>3D Cyber FX</span>
            </span>

            {/* Cycle Color Palette */}
            <button
              type="button"
              className="graphics-hud-chip"
              onClick={cyclePalette}
              title={`Switch color palette (Current: ${currentCfg.name})`}
            >
              <span 
                className="graphics-hud-color-dot" 
                style={{ backgroundColor: currentCfg.colorDot }} 
              />
              <span>{currentCfg.name}</span>
            </button>

            {/* Cycle Motion Speed */}
            <button
              type="button"
              className="graphics-hud-chip"
              onClick={cycleSpeed}
              title={`Toggle graphics animation speed (Current: ${speedLabel})`}
            >
              <Zap size={11} />
              <span>{speedLabel}</span>
            </button>

            {/* Collapse HUD Button */}
            <button
              type="button"
              className="graphics-hud-btn-icon"
              onClick={() => setIsHudCollapsed(true)}
              aria-label="Collapse graphics HUD"
              title="Minimize graphics badge"
            >
              <X size={13} />
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
