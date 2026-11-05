import React, { useEffect, useRef } from 'react';

interface ParticleLandscapeCanvasProps {
  variant?: 'hero' | 'projects';
  className?: string;
  amplitude?: number;
  speed?: number;
}

export const ParticleLandscapeCanvas: React.FC<ParticleLandscapeCanvasProps> = ({
  variant = 'hero',
  className = '',
  amplitude = 32,
  speed = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = Math.random() * 100;

    // Track pointer position relative to canvas
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      isActive: false,
    };

    // Check motion preference
    const checkMotionPreference = (): boolean => {
      const attr = document.documentElement.getAttribute('data-reduced-motion');
      if (attr !== null) return attr !== 'true';
      try {
        const saved = localStorage.getItem('portfolio-motion-preference');
        if (saved !== null) return saved !== 'false';
      } catch {
        // ignore
      }
      return true;
    };

    let isMotionActive = checkMotionPreference();

    const getGridConfig = (w: number) => {
      if (variant === 'hero') {
        if (w >= 1024) return { cols: 46, rows: 14, fov: 320, baseDepth: 420 };
        if (w >= 768) return { cols: 28, rows: 10, fov: 280, baseDepth: 380 };
        return { cols: 18, rows: 7, fov: 240, baseDepth: 320 };
      } else {
        // projects: slightly broader and more layered terrain
        if (w >= 1024) return { cols: 40, rows: 12, fov: 340, baseDepth: 440 };
        if (w >= 768) return { cols: 24, rows: 9, fov: 290, baseDepth: 390 };
        return { cols: 16, rows: 6, fov: 250, baseDepth: 330 };
      }
    };

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);

      drawFrame(false);
    };

    const drawFrame = (animate: boolean) => {
      if (!ctx || width === 0 || height === 0) return;
      ctx.clearRect(0, 0, width, height);

      const config = getGridConfig(width);
      const cols = config.cols;
      const rows = config.rows;
      const fov = config.fov;
      const maxDepth = config.baseDepth;

      if (animate && isMotionActive) {
        time += 0.016 * speed;
      }

      // Smooth mouse lerp
      if (mouse.isActive) {
        mouse.x += (mouse.targetX - mouse.x) * 0.12;
        mouse.y += (mouse.targetY - mouse.y) * 0.12;
      }

      // 1. Calculate projected 3D coordinates for the grid
      const grid: {
        px: number;
        py: number;
        scale: number;
        elev: number;
        u: number;
        v: number;
      }[][] = [];

      const horizonY = variant === 'hero' ? height * 0.58 : height * 0.52;
      const spreadX = width * 1.35;

      for (let r = 0; r < rows; r++) {
        const v = r / (rows - 1); // 0 (back) to 1 (front)
        const rowPoints = [];
        const z = (1 - v) * maxDepth + 60;
        const scale = fov / (fov + z);

        for (let c = 0; c < cols; c++) {
          const u = c / (cols - 1) - 0.5; // -0.5 to +0.5
          const x3d = u * spreadX;

          // Multi-frequency wave calculation
          const wave1 = Math.sin(u * 5.2 + time * 1.2) * amplitude;
          const wave2 = Math.cos(v * 6.5 - time * 1.5) * (amplitude * 0.65);
          const wave3 = Math.sin((u * 3.0 + v * 4.0) + time * 0.8) * (amplitude * 0.45);
          const totalWave = wave1 + wave2 + wave3;

          let y3d = horizonY + (v * 90 - 45) + totalWave;

          // Project to 2D screen
          let screenX = width / 2 + x3d * scale;
          let screenY = y3d * scale + horizonY * (1 - scale);

          // Pointer interaction: gentle elevation pull on proximity
          if (mouse.isActive) {
            const dx = screenX - mouse.x;
            const dy = screenY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 140;
            if (dist < radius) {
              const force = (1 - dist / radius);
              screenY -= force * 16 * scale;
            }
          }

          rowPoints.push({
            px: screenX,
            py: screenY,
            scale,
            elev: totalWave,
            u,
            v,
          });
        }
        grid.push(rowPoints);
      }

      // 2. Draw curved mesh lines along each row (longitudinal wave ridges)
      for (let r = 0; r < rows; r++) {
        const row = grid[r];
        const v = r / (rows - 1);
        const rowScale = row[0]?.scale || 0.5;
        const lineAlpha = (0.04 + v * 0.16) * (variant === 'hero' ? 1.0 : 0.85);

        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const p = row[c];
          if (c === 0) {
            ctx.moveTo(p.px, p.py);
          } else {
            // Smooth curve
            const prev = row[c - 1];
            const mx = (prev.px + p.px) / 2;
            const my = (prev.py + p.py) / 2;
            ctx.quadraticCurveTo(prev.px, prev.py, mx, my);
          }
        }

        // Alternating champagne and emerald subtle ridges
        if (r % 3 === 0) {
          ctx.strokeStyle = `rgba(229, 180, 91, ${lineAlpha * 1.25})`; // Champagne gold
        } else if (r % 3 === 1) {
          ctx.strokeStyle = `rgba(5, 150, 105, ${lineAlpha * 1.15})`; // Emerald green
        } else {
          ctx.strokeStyle = `rgba(138, 143, 152, ${lineAlpha * 0.8})`; // Muted technical
        }

        ctx.lineWidth = Math.max(0.6, 1.2 * rowScale);
        ctx.stroke();
      }

      // 3. Draw vertical rib lines connecting rows for authentic 3D wireframe mesh
      for (let c = 0; c < cols; c += (width < 768 ? 4 : 2)) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const p = grid[r][c];
          if (r === 0) {
            ctx.moveTo(p.px, p.py);
          } else {
            ctx.lineTo(p.px, p.py);
          }
        }
        ctx.strokeStyle = `rgba(138, 143, 152, 0.045)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // 4. Draw illuminated particles at grid intersections
      for (let r = 0; r < rows; r++) {
        const row = grid[r];
        const v = r / (rows - 1);

        for (let c = 0; c < cols; c++) {
          const p = row[c];
          const isPeak = p.elev > amplitude * 0.25;
          const isDeepTrough = p.elev < -amplitude * 0.4;

          const baseRadius = Math.max(0.6, (isPeak ? 1.6 : 1.0) * p.scale * (1 + v * 0.5));
          const pointAlpha = Math.min(1, Math.max(0.12, (v * 0.55 + 0.25) * (isPeak ? 1.4 : 0.8)));

          ctx.beginPath();
          ctx.arc(p.px, p.py, baseRadius, 0, Math.PI * 2);

          if (isPeak) {
            // Illuminated Champagne or Emerald crest particle
            const isChampagne = (c + r) % 2 === 0;
            if (isChampagne) {
              ctx.fillStyle = `rgba(229, 180, 91, ${Math.min(1, pointAlpha * 1.3)})`;
            } else {
              ctx.fillStyle = `rgba(5, 150, 105, ${Math.min(1, pointAlpha * 1.2)})`;
            }
            ctx.fill();

            // Soft radiant halo around prominent crest particles
            if (p.scale > 0.55 && isPeak) {
              ctx.beginPath();
              ctx.arc(p.px, p.py, baseRadius * 2.8, 0, Math.PI * 2);
              ctx.fillStyle = isChampagne
                ? `rgba(229, 180, 91, 0.12)`
                : `rgba(5, 150, 105, 0.12)`;
              ctx.fill();
            }
          } else if (isDeepTrough) {
            ctx.fillStyle = `rgba(138, 143, 152, ${pointAlpha * 0.4})`;
            ctx.fill();
          } else {
            // Normal intermediate grid node
            ctx.fillStyle = `rgba(245, 240, 230, ${pointAlpha * 0.6})`;
            ctx.fill();
          }
        }
      }
    };

    const loop = () => {
      if (isMotionActive && !document.hidden) {
        drawFrame(true);
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    // Pointer events
    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      if (!mouse.isActive) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
        mouse.isActive = true;
      }
    };

    const handlePointerLeave = () => {
      mouse.isActive = false;
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else if (isMotionActive) {
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    // Motion preference observer
    const motionObserver = new MutationObserver(() => {
      const active = checkMotionPreference();
      if (active !== isMotionActive) {
        isMotionActive = active;
        cancelAnimationFrame(animationFrameId);
        if (isMotionActive) {
          animationFrameId = requestAnimationFrame(loop);
        } else {
          drawFrame(false); // static calm terrain
        }
      }
    });

    motionObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-reduced-motion'],
    });

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    resize();
    if (isMotionActive) {
      animationFrameId = requestAnimationFrame(loop);
    } else {
      drawFrame(false);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      motionObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [variant, amplitude, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none select-none z-0 ${className}`}
    />
  );
};
