import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowLeft, ArrowRight, ExternalLink, Github, ZoomIn, Sparkles, X } from 'lucide-react';

const BARREL_ITEMS = [
  {
    id: 'motofix',
    title: 'MotoFix — Motorcycle Parts E-Commerce',
    category: 'Full-Stack Web',
    badge: 'Node.js + MySQL + Express',
    desc: 'A motorcycle parts e-commerce platform built with Node.js, Express, and MySQL.',
    image: './projects/motofix.png',
    github: 'https://github.com/EARL146/motofix_fixed',
    demo: null,
    tags: ['Node.js', 'Express.js', 'MySQL', 'REST API', 'JavaScript']
  },
  {
    id: 'burgerbites',
    title: 'BurgerBites — Mobile Food Ordering',
    category: 'Mobile Application',
    badge: 'Flutter + PHP API',
    desc: 'A Flutter and Dart food-ordering app connected to a PHP and MySQL API.',
    image: './projects/burgerbites.png',
    github: 'https://github.com/EARL146/app-',
    demo: null,
    tags: ['Flutter', 'Dart', 'PHP', 'MySQL', 'Docker']
  },
  {
    id: 'pharmacare',
    title: 'PharmaCare — Pharmacy & Healthcare',
    category: 'Healthcare Web Portal',
    badge: 'Next.js + TypeScript',
    desc: 'A healthcare portal built with Next.js and TypeScript.',
    image: './projects/pharmacare.png',
    github: 'https://github.com/EARL146/01.2',
    demo: null,
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS']
  },
  {
    id: 'streetfood',
    title: 'StreetFood — Java 21 Inventory System',
    category: 'Desktop Application',
    badge: 'Java 21 + FlatLaf Swing',
    desc: 'A desktop ordering system built with Java 21 and FlatLaf Swing.',
    image: './projects/streetfood-preview.svg',
    imageAlt: 'Illustrated preview of the StreetFood desktop ordering system',
    github: 'https://github.com/EARL146/JAVA-SYSTEM',
    demo: null,
    tags: ['Java 21', 'FlatLaf Swing', 'JDBC', 'MySQL 8+']
  },
  {
    id: 'hitohouse',
    title: 'HitoHouse — Commercial Catfish Ordering',
    category: 'Full-Stack Web App',
    badge: 'Java Spring Boot + MySQL',
    desc: 'A commercial catfish ordering project built with Java Spring Boot.',
    image: './projects/hitohouse.png',
    github: 'https://github.com/EARL146/JAVA-SYSTEM',
    demo: null,
    tags: ['Java', 'Spring Boot', 'Vanilla JS', 'MySQL']
  },
  {
    id: 'barbergo',
    title: 'BarberGo — Barbershop Booking Website',
    category: 'Client Web Solution',
    badge: 'HTML5 + CSS3 + JS',
    desc: 'A client landing page for a barbershop, built as a responsive web experience.',
    image: './projects/barbergo-page.png',
    github: 'https://github.com/EARL146/freelancer-files',
    demo: null,
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI']
  },
  {
    id: 'portfoliov1',
    title: 'Portfolio Version 1.0 (Original SVG)',
    category: 'Creative Frontend Web',
    badge: 'SVG + Vanilla JS',
    desc: 'The original portfolio built with interactive SVG, HTML, CSS, and JavaScript and hosted on GitHub Pages.',
    image: './projects/svgportfolio-preview.svg',
    imageAlt: 'Illustrated preview of Portfolio Version 1.0',
    github: 'https://github.com/EARL146/svgportfolio',
    demo: 'https://earl146.github.io/svgportfolio',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'SVG Animations']
  },
  {
    id: 'certificates',
    title: '6 Official Technical Certifications',
    category: 'Accreditation',
    badge: 'TESDA · OPSWAT · PyCon · Full Stack',
    desc: 'Six certificate records covering visual design, cybersecurity, Python community participation, full-stack learning, and a GoHighLevel workshop.',
    image: './certificates/cert_05_fullstack_ai.png',
    github: null,
    demo: '#credentials',
    tags: ['TESDA', 'OPSWAT', 'PyCon', 'Full Stack']
  }
];

export default function ProjectBarrel() {
  const mountRef = useRef(null);
  const rotateRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 460;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 16);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const cylinderGroup = new THREE.Group();
    scene.add(cylinderGroup);

    const radius = 9.2;
    const count = BARREL_ITEMS.length;
    const cardWidth = 4.6;
    const cardHeight = 3.1;
    const textureLoader = new THREE.TextureLoader();

    const meshes = [];

    const createPlaceholderTexture = (title, category) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 360;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = '#0B1E3F';
      ctx.fillRect(0, 0, 512, 360);

      ctx.strokeStyle = '#2C84DD';
      ctx.lineWidth = 8;
      ctx.strokeRect(10, 10, 492, 340);

      ctx.fillStyle = '#60a5fa';
      ctx.font = 'bold 24px Poppins, sans-serif';
      ctx.fillText(category.toUpperCase(), 35, 70);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 30px Poppins, sans-serif';
      ctx.fillText(title.slice(0, 24), 35, 140);
      if (title.length > 24) {
        ctx.fillText(title.slice(24, 48), 35, 185);
      }

      ctx.fillStyle = '#94a3b8';
      ctx.font = '20px Poppins, sans-serif';
      ctx.fillText('Click to inspect details & code', 35, 300);

      return new THREE.CanvasTexture(canvas);
    };

    BARREL_ITEMS.forEach((proj, idx) => {
      const angle = (idx / count) * Math.PI * 2;
      const geom = new THREE.PlaneGeometry(cardWidth, cardHeight, 16, 16);

      const placeholder = createPlaceholderTexture(proj.title, proj.category);
      const mat = new THREE.MeshBasicMaterial({
        map: placeholder,
        side: THREE.DoubleSide
      });

      textureLoader.load(
        proj.image,
        (tex) => {
          const image = tex.image;
          const canvas = document.createElement('canvas');
          canvas.width = 512;
          canvas.height = 360;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#10233a';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          const scale = Math.min(canvas.width / image.width, canvas.height / image.height);
          const drawWidth = image.width * scale;
          const drawHeight = image.height * scale;
          ctx.drawImage(image, (canvas.width - drawWidth) / 2, (canvas.height - drawHeight) / 2, drawWidth, drawHeight);

          const projectTexture = new THREE.CanvasTexture(canvas);
          projectTexture.colorSpace = THREE.SRGBColorSpace;
          mat.map?.dispose();
          mat.map = projectTexture;
          mat.needsUpdate = true;
          tex.dispose();
        }
      );

      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.x = Math.sin(angle) * radius;
      mesh.position.z = Math.cos(angle) * radius;
      mesh.rotation.y = angle;
      mesh.userData = { index: idx, project: proj };

      cylinderGroup.add(mesh);
      meshes.push(mesh);
    });

    let isDragging = false;
    let prevX = 0;
    let targetRotation = 0;
    let autoRotateSpeed = 0.003;
    let dragDistance = 0;
    let velocity = 0;
    let lastActiveIndex = -1;

    const onPointerDown = (e) => {
      isDragging = true;
      prevX = e.clientX;
      dragDistance = 0;
      velocity = 0;
      dom.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevX;
      dragDistance += Math.abs(deltaX);
      velocity = deltaX * 0.006;
      targetRotation += velocity;
      prevX = e.clientX;
    };

    const onPointerUp = (e) => {
      if (dragDistance < 6) {
        const rect = renderer.domElement.getBoundingClientRect();
        const mouse = new THREE.Vector2(
          ((e.clientX - rect.left) / rect.width) * 2 - 1,
          -((e.clientY - rect.top) / rect.height) * 2 + 1
        );

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(meshes);

        if (intersects.length > 0) {
          const clicked = intersects[0].object.userData.project;
          setSelectedProject(clicked);
        }
      }
      isDragging = false;
    };

    const onPointerCancel = () => {
      isDragging = false;
      dragDistance = 0;
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', onPointerDown);
    dom.addEventListener('pointermove', onPointerMove);
    dom.addEventListener('pointerup', onPointerUp);
    dom.addEventListener('pointercancel', onPointerCancel);

    rotateRef.current = (direction) => {
      targetRotation += direction * ((Math.PI * 2) / count);
      velocity = 0;
    };

    const onResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight || 460;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isDragging) {
        if (Math.abs(velocity) > 0.0004) {
          targetRotation += velocity;
          velocity *= 0.92;
        } else {
          targetRotation -= autoRotateSpeed;
        }
      }

      cylinderGroup.rotation.y += (targetRotation - cylinderGroup.rotation.y) * 0.08;

      const normalizedAngle = (-cylinderGroup.rotation.y % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
      const currIdx = Math.round((normalizedAngle / (Math.PI * 2)) * count) % count;
      if (currIdx !== lastActiveIndex) {
        lastActiveIndex = currIdx;
        setActiveIndex(currIdx);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('pointerdown', onPointerDown);
      dom.removeEventListener('pointermove', onPointerMove);
      dom.removeEventListener('pointerup', onPointerUp);
      dom.removeEventListener('pointercancel', onPointerCancel);
      window.removeEventListener('resize', onResize);
      rotateRef.current = null;
      meshes.forEach((mesh) => {
        mesh.geometry.dispose();
        mesh.material.map?.dispose();
        mesh.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (!selectedProject) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject]);

  const activeProj = BARREL_ITEMS[activeIndex] || BARREL_ITEMS[0];

  return (
    <section id="barrel" className="barrel-section">
      <div className="section-tag">
        <Sparkles size={14} /> 02 / Interactive Project Cylinder
      </div>
      <h2 className="section-title">The 3D Project Cylinder</h2>
      <p className="section-desc">
        Drag to rotate the 3D cylinder, use the arrows, or select a card to inspect its details.
      </p>

      <div className="barrel-wrapper glass-card">
        <div ref={mountRef} className="barrel-viewport" />

        <div className="barrel-overlay-info">
          <div className="barrel-active-title">
            <span className="barrel-pill">{activeProj.category}</span>
            <h3>{activeProj.title}</h3>
          </div>
          <div className="barrel-control-group">
            <button className="barrel-arrow-btn" onClick={() => rotateRef.current?.(1)} aria-label="Previous project">
              <ArrowLeft size={17} />
            </button>
            <button className="barrel-arrow-btn" onClick={() => rotateRef.current?.(-1)} aria-label="Next project">
              <ArrowRight size={17} />
            </button>
            <button 
              className="barrel-inspect-btn"
              onClick={() => setSelectedProject(activeProj)}
            >
              <ZoomIn size={16} />
              <span>Open Details</span>
            </button>
          </div>
        </div>
      </div>

      {selectedProject && (
        <div className="project-modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="project-modal glass-card" role="dialog" aria-modal="true" aria-labelledby="barrel-modal-title" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn"
              onClick={() => setSelectedProject(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="modal-content-grid">
              <div className="modal-preview-col">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.imageAlt || `${selectedProject.title} project screenshot`}
                  className={`modal-img${selectedProject.id === 'burgerbites' ? ' modal-img--contain' : ''}`}
                />
              </div>

              <div className="modal-info-col">
                <span className="modal-category">{selectedProject.category}</span>
                <h3 id="barrel-modal-title" className="modal-title">{selectedProject.title}</h3>
                <p className="modal-desc">{selectedProject.desc}</p>

                <div className="modal-tags">
                  {selectedProject.tags.map((t) => (
                    <span key={t} className="tech-chip">{t}</span>
                  ))}
                </div>

                <div className="modal-action-row">
                  {selectedProject.github && (
                    <a 
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--primary"
                    >
                      <Github size={16} />
                      <span>GitHub Repository</span>
                    </a>
                  )}

                  {selectedProject.demo && (
                    <a 
                      href={selectedProject.demo}
                      target={selectedProject.demo.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="btn btn--outline"
                    >
                      <ExternalLink size={16} />
                      <span>{selectedProject.demo.startsWith('#') ? 'View Certificates' : 'Open Live Portfolio'}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
