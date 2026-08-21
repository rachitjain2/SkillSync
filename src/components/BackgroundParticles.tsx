import React, { useEffect, useRef } from 'react';

interface Orb {
  x: number;
  y: number;
  originX: number;
  originY: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  targetAlpha: number;
}

export const BackgroundParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initOrbs();
    };

    window.addEventListener('resize', handleResize);

    const pointer = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 260
    };

    const handleMouseMove = (e: MouseEvent) => {
      pointer.targetX = e.clientX;
      pointer.targetY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        pointer.targetX = e.touches[0].clientX;
        pointer.targetY = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Warm, sophisticated humanized color palette
    const colors = [
      'rgba(56, 189, 248, ',  // Sky cyan
      'rgba(99, 102, 241, ',  // Indigo
      'rgba(139, 92, 246, ',  // Violet
      'rgba(16, 185, 129, ',  // Emerald
      'rgba(245, 158, 11, ',  // Amber gold
    ];

    let orbs: Orb[] = [];

    const initOrbs = () => {
      orbs = [];
      const count = Math.min(Math.floor(window.innerWidth / 35), 45);

      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        orbs.push({
          x,
          y,
          originX: x,
          originY: y,
          radius: Math.random() * 80 + 40,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          color: colors[i % colors.length],
          alpha: Math.random() * 0.12 + 0.04,
          targetAlpha: Math.random() * 0.12 + 0.04
        });
      }
    };

    initOrbs();

    let tick = 0;

    const render = () => {
      tick += 0.008;

      // Smooth pointer interpolation
      pointer.x += (pointer.targetX - pointer.x) * 0.05;
      pointer.y += (pointer.targetY - pointer.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Render smooth luminous fluid orbs
      for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];

        // Gentle floating drift around origin
        orb.x += orb.vx + Math.sin(tick + i) * 0.25;
        orb.y += orb.vy + Math.cos(tick + i * 0.7) * 0.25;

        // Bounce back if drifted too far
        if (orb.x < -orb.radius) orb.x = width + orb.radius;
        if (orb.x > width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = height + orb.radius;
        if (orb.y > height + orb.radius) orb.y = -orb.radius;

        // Pointer fluid interaction
        const dx = pointer.x - orb.x;
        const dy = pointer.y - orb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < pointer.radius) {
          const force = (1 - dist / pointer.radius) * 1.8;
          orb.x -= (dx / dist) * force;
          orb.y -= (dy / dist) * force;
          orb.alpha = Math.min(0.25, orb.targetAlpha + force * 0.15);
        } else {
          orb.alpha += (orb.targetAlpha - orb.alpha) * 0.02;
        }

        // Draw soft radial aura
        const gradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius * 1.5
        );
        gradient.addColorStop(0, `${orb.color}${orb.alpha})`);
        gradient.addColorStop(0.6, `${orb.color}${orb.alpha * 0.3})`);
        gradient.addColorStop(1, `${orb.color}0)`);

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Subtle luminous filaments connecting nearby orbs
      for (let i = 0; i < orbs.length; i++) {
        for (let j = i + 1; j < orbs.length; j++) {
          const dist = Math.hypot(orbs[i].x - orbs[j].x, orbs[i].y - orbs[j].y);
          if (dist < 180) {
            const lineAlpha = (1 - dist / 180) * 0.07;
            ctx.beginPath();
            ctx.moveTo(orbs[i].x, orbs[i].y);
            ctx.lineTo(orbs[j].x, orbs[j].y);
            ctx.strokeStyle = `rgba(148, 163, 184, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Background Interactive Fluid Aurora Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-80"
      />

      {/* Atmospheric Luminous Mesh Gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/10 via-sky-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[650px] h-[650px] bg-gradient-to-tl from-purple-500/10 via-violet-600/10 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.06)_0%,transparent_70%)] pointer-events-none" />
    </div>
  );
};
