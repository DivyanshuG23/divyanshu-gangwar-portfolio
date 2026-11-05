import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseColor: string;
  alpha: number;
  pulsePhase: number;
  pulseSpeed: number;
}

export const NeuralMatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: Node[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Mouse pointer state
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      isActive: false,
    };

    // Color palette adhering strictly to Charcoal / Champagne / Emerald / Technical Warm Gray
    const colors = [
      '#E5B45B', // Champagne accent (~35%)
      '#059669', // Emerald accent (~25%)
      '#8A8F98', // Muted technical grey (~25%)
      '#F5F0E6', // Warm ivory node spark (~15%)
    ];

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
      return true; // Default motion enabled
    };

    let isMotionActive = checkMotionPreference();

    const getNodeCount = (w: number): number => {
      if (w >= 1024) return 80;
      if (w >= 768) return 45;
      return 25;
    };

    const getMaxDistance = (w: number): number => {
      if (w >= 1024) return 130;
      if (w >= 768) return 100;
      return 75;
    };

    const initNodes = () => {
      const count = getNodeCount(width);
      nodes = [];

      for (let i = 0; i < count; i++) {
        const colorIndex = Math.random() < 0.35 ? 0 : Math.random() < 0.6 ? 1 : Math.random() < 0.85 ? 2 : 3;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.5 + 1.0,
          baseColor: colors[colorIndex],
          alpha: Math.random() * 0.45 + 0.25,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.02,
        });
      }
    };

    const resize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);

      initNodes();
      drawFrame(false);
    };

    const drawFrame = (animate: boolean) => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const maxDist = getMaxDistance(width);
      const pointerRadius = 150;

      // Smooth pointer lerp
      if (mouse.isActive) {
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;
      }

      // 1. Draw connection lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];

        if (animate && isMotionActive) {
          // Update position
          nodeA.x += nodeA.vx;
          nodeA.y += nodeA.vy;

          // Wrap edges
          if (nodeA.x < -10) nodeA.x = width + 10;
          else if (nodeA.x > width + 10) nodeA.x = -10;
          if (nodeA.y < -10) nodeA.y = height + 10;
          else if (nodeA.y > height + 10) nodeA.y = -10;

          // Pointer gravitation
          if (mouse.isActive) {
            const dx = mouse.x - nodeA.x;
            const dy = mouse.y - nodeA.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < pointerRadius && dist > 1) {
              const force = (1 - dist / pointerRadius) * 0.025;
              nodeA.x += dx * force;
              nodeA.y += dy * force;
            }
          }

          nodeA.pulsePhase += nodeA.pulseSpeed;
        }

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const factor = 1 - dist / maxDist;
            const lineAlpha = factor * 0.14;

            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);

            // Subtle tint based on participating nodes
            if (nodeA.baseColor === '#E5B45B' || nodeB.baseColor === '#E5B45B') {
              ctx.strokeStyle = `rgba(229, 180, 91, ${lineAlpha * 1.3})`;
            } else if (nodeA.baseColor === '#059669' || nodeB.baseColor === '#059669') {
              ctx.strokeStyle = `rgba(5, 150, 105, ${lineAlpha * 1.2})`;
            } else {
              ctx.strokeStyle = `rgba(138, 143, 152, ${lineAlpha})`;
            }

            ctx.lineWidth = factor * 0.85;
            ctx.stroke();
          }
        }

        // Connections to active pointer
        if (mouse.isActive) {
          const mdx = mouse.x - nodeA.x;
          const mdy = mouse.y - nodeA.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < pointerRadius) {
            const mFactor = 1 - mdist / pointerRadius;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(229, 180, 91, ${mFactor * 0.22})`;
            ctx.lineWidth = mFactor * 1.0;
            ctx.stroke();
          }
        }
      }

      // 2. Draw nodes with soft radial glow
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const pulse = 0.8 + 0.2 * Math.sin(node.pulsePhase);
        const currentRadius = node.radius * pulse;
        const currentAlpha = Math.min(1, Math.max(0.1, node.alpha * pulse));

        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);

        // Parse hex to rgba
        if (node.baseColor === '#E5B45B') {
          ctx.fillStyle = `rgba(229, 180, 91, ${currentAlpha})`;
        } else if (node.baseColor === '#059669') {
          ctx.fillStyle = `rgba(5, 150, 105, ${currentAlpha})`;
        } else if (node.baseColor === '#F5F0E6') {
          ctx.fillStyle = `rgba(245, 240, 230, ${currentAlpha * 0.9})`;
        } else {
          ctx.fillStyle = `rgba(138, 143, 152, ${currentAlpha * 0.7})`;
        }

        ctx.fill();

        // Extra halo for champagne & emerald accent nodes
        if (node.baseColor === '#E5B45B' || node.baseColor === '#059669') {
          ctx.beginPath();
          ctx.arc(node.x, node.y, currentRadius * 2.5, 0, Math.PI * 2);
          const haloColor =
            node.baseColor === '#E5B45B'
              ? `rgba(229, 180, 91, ${currentAlpha * 0.15})`
              : `rgba(5, 150, 105, ${currentAlpha * 0.15})`;
          ctx.fillStyle = haloColor;
          ctx.fill();
        }
      }
    };

    const loop = () => {
      if (isMotionActive && !document.hidden) {
        drawFrame(true);
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    // Event listeners
    const handlePointerMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      if (!mouse.isActive) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
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

    // Mutation observer for motion toggle
    const motionObserver = new MutationObserver(() => {
      const active = checkMotionPreference();
      if (active !== isMotionActive) {
        isMotionActive = active;
        cancelAnimationFrame(animationFrameId);
        if (isMotionActive) {
          animationFrameId = requestAnimationFrame(loop);
        } else {
          drawFrame(false); // static calm frame
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 select-none"
      style={{ display: 'block' }}
    />
  );
};
