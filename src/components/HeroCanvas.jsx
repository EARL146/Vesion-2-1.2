import React, { useEffect, useRef } from 'react';
import { useTheme } from '../lib/theme';

export default function HeroCanvas() {
  const canvasRef = useRef(null);
  const { theme, reduceMotion } = useTheme();
  const stateRef = useRef({ theme, reduceMotion });

  useEffect(() => {
    stateRef.current = { theme, reduceMotion };
  }, [theme, reduceMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let rafId = 0;
    let time = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawFrame = () => {
      const { theme: curTheme, reduceMotion: reduced } = stateRef.current;
      ctx.clearRect(0, 0, width, height);

      const isDark = curTheme === 'dark';
      ctx.lineWidth = 1;
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.045)' : 'rgba(11, 30, 63, 0.042)';

      const lines = 14;
      const stepX = 28;
      for (let i = 0; i < lines; i += 1) {
        const baseY = (height / (lines - 1)) * i;
        ctx.beginPath();
        for (let x = 0; x <= width + stepX; x += stepX) {
          const wave1 = Math.sin(x * 0.0022 + time * 0.55 + i * 0.42) * 26;
          const wave2 = Math.cos(x * 0.0041 - time * 0.35 + i * 0.7) * 14;
          const y = baseY + wave1 + wave2;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      if (!reduced && !document.hidden) {
        time += 0.012;
        rafId = window.requestAnimationFrame(drawFrame);
      }
    };

    resize();
    drawFrame();

    const onVisibility = () => {
      window.cancelAnimationFrame(rafId);
      if (!document.hidden) drawFrame();
    };

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [theme, reduceMotion]);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}
