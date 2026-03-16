import React, { useEffect, useRef } from 'react';

interface Segment {
  x1: number; y1: number; x2: number; y2: number;
}

interface Pulse {
  seg: Segment;
  t: number;
  speed: number;
  alpha: number;
}

const CircuitBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const segmentsRef = useRef<Segment[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const GRID = 80;
    const POWER_RADIUS = 230;
    const MAX_PULSES = 100;

    const buildSegments = () => {
      const segs: Segment[] = [];
      const W = canvas.width;
      const H = canvas.height;

      // Horizontal PCB traces
      for (let row = 0; row * GRID <= H + GRID; row++) {
        const y = row * GRID;
        let x = 0;
        while (x < W) {
          const len = (2 + Math.floor(Math.random() * 4)) * GRID;
          const gap = (1 + Math.floor(Math.random() * 3)) * GRID;
          segs.push({ x1: x, y1: y, x2: Math.min(x + len, W), y2: y });
          x += len + gap;
        }
      }

      // Vertical PCB traces
      for (let col = 0; col * GRID <= W + GRID; col++) {
        const x = col * GRID;
        let y = 0;
        while (y < H) {
          const len = (2 + Math.floor(Math.random() * 4)) * GRID;
          const gap = (1 + Math.floor(Math.random() * 3)) * GRID;
          segs.push({ x1: x, y1: y, x2: x, y2: Math.min(y + len, H) });
          y += len + gap;
        }
      }
      return segs;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      segmentsRef.current = buildSegments();
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Touch support — update position on every touchmove/touchstart
    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        mouseRef.current = { x: t.clientX, y: t.clientY };
      }
    };
    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });

    // Perpendicular distance from point to segment
    const distToSeg = (px: number, py: number, s: Segment) => {
      const dx = s.x2 - s.x1;
      const dy = s.y2 - s.y1;
      const lenSq = dx * dx + dy * dy;
      if (lenSq === 0) return Math.hypot(px - s.x1, py - s.y1);
      const t = Math.max(0, Math.min(1, ((px - s.x1) * dx + (py - s.y1) * dy) / lenSq));
      return Math.hypot(px - (s.x1 + t * dx), py - (s.y1 + t * dy));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;
      const segs = segmentsRef.current;

      segs.forEach(seg => {
        const dist = distToSeg(mx, my, seg);
        const power = Math.max(0, 1 - dist / POWER_RADIUS);

        // Draw trace
        ctx.beginPath();
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);
        if (power > 0) {
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.12 + power * 0.88})`;
          ctx.lineWidth = 1 + power * 1.5;
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = power * 22;
        } else {
          ctx.strokeStyle = 'rgba(26, 86, 219, 0.08)';
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Solder pads at endpoints
        ([[seg.x1, seg.y1], [seg.x2, seg.y2]] as [number, number][]).forEach(([px, py]) => {
          const padPow = Math.max(0, 1 - Math.hypot(mx - px, my - py) / POWER_RADIUS);
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          if (padPow > 0) {
            ctx.fillStyle = `rgba(0, 240, 255, ${0.35 + padPow * 0.65})`;
            ctx.shadowColor = '#00f0ff';
            ctx.shadowBlur = padPow * 14;
          } else {
            ctx.fillStyle = 'rgba(26, 86, 219, 0.18)';
            ctx.shadowBlur = 0;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        // Spawn power pulses on energised traces
        if (
          power > 0.3 &&
          pulsesRef.current.length < MAX_PULSES &&
          Math.random() < 0.022 * power
        ) {
          pulsesRef.current.push({
            seg,
            t: 0,
            speed: 0.005 + Math.random() * 0.009,
            alpha: 0.7 + power * 0.3,
          });
        }
      });

      // Animate pulses (power flowing through traces)
      pulsesRef.current = pulsesRef.current.filter(pulse => {
        pulse.t += pulse.speed;
        if (pulse.t > 1) return false;

        const { seg, t, alpha } = pulse;
        const headX = seg.x1 + (seg.x2 - seg.x1) * t;
        const headY = seg.y1 + (seg.y2 - seg.y1) * t;
        const trailT = Math.max(0, t - 0.18);
        const tailX = seg.x1 + (seg.x2 - seg.x1) * trailT;
        const tailY = seg.y1 + (seg.y2 - seg.y1) * trailT;

        // Glowing trailing streak
        const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
        grad.addColorStop(0, 'rgba(0, 240, 255, 0)');
        grad.addColorStop(0.5, `rgba(0, 240, 255, ${alpha * 0.4})`);
        grad.addColorStop(1, `rgba(0, 240, 255, ${alpha})`);
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 16;
        ctx.stroke();

        // Bright head dot
        ctx.beginPath();
        ctx.arc(headX, headY, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        return true;
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('touchmove', handleTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default CircuitBackground;
