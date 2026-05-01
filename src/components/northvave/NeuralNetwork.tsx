import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; baseR: number; phase: number };
type Spark = { from: number; to: number; t: number; speed: number };

export const NeuralNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let nodes: Node[] = [];
    let sparks: Spark[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 38 : 70;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25 * dpr,
        vy: (Math.random() - 0.5) * 0.25 * dpr,
        baseR: (1.2 + Math.random() * 1.6) * dpr,
        phase: Math.random() * Math.PI * 2,
      }));
      sparks = [];
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) * dpr;
      mouseRef.current.y = (e.clientY - rect.top) * dpr;
      mouseRef.current.active = true;
    };
    const onLeave = () => { mouseRef.current.active = false; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const maxDist = 160 * dpr;
    let t = 0;

    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        // Mouse warp
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - n.x;
          const dy = mouseRef.current.y - n.y;
          const d2 = dx * dx + dy * dy;
          const r = 180 * dpr;
          if (d2 < r * r) {
            const f = (1 - Math.sqrt(d2) / r) * 0.6;
            n.x += dx * f * 0.04;
            n.y += dy * f * 0.04;
          }
        }
      }

      // Lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35;
            ctx.strokeStyle = `hsla(221, 83%, 60%, ${alpha})`;
            ctx.lineWidth = 0.6 * dpr;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            // Occasionally spawn a spark
            if (Math.random() < 0.0006 && sparks.length < 30) {
              sparks.push({ from: i, to: j, t: 0, speed: 0.015 + Math.random() * 0.02 });
            }
          }
        }
      }

      // Sparks
      sparks = sparks.filter((s) => s.t < 1);
      for (const s of sparks) {
        s.t += s.speed;
        const a = nodes[s.from], b = nodes[s.to];
        if (!a || !b) continue;
        const x = a.x + (b.x - a.x) * s.t;
        const y = a.y + (b.y - a.y) * s.t;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 6 * dpr);
        grad.addColorStop(0, "hsla(189, 94%, 60%, 1)");
        grad.addColorStop(1, "hsla(189, 94%, 60%, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, 6 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }

      // Nodes
      for (const n of nodes) {
        const pulse = 1 + Math.sin(t * 1.5 + n.phase) * 0.35;
        const r = n.baseR * pulse;
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
        grad.addColorStop(0, "hsla(221, 90%, 70%, 0.9)");
        grad.addColorStop(0.4, "hsla(221, 83%, 53%, 0.4)");
        grad.addColorStop(1, "hsla(221, 83%, 53%, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "hsla(210, 40%, 98%, 0.95)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
};
