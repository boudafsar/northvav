import { useEffect, useRef } from "react";

export const CursorGlow = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
    };
    window.addEventListener("mousemove", onMove);
    let raf = 0;
    const tick = () => {
      pos.current.rx += (pos.current.x - pos.current.rx) * 0.12;
      pos.current.ry += (pos.current.y - pos.current.ry) * 0.12;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${pos.current.rx - 24}px, ${pos.current.ry - 24}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-primary hidden md:block" style={{ boxShadow: "0 0 12px hsl(var(--primary))" }} />
      <div ref={ringRef} className="pointer-events-none fixed left-0 top-0 z-[9998] h-12 w-12 rounded-full border border-primary/40 hidden md:block" style={{ boxShadow: "0 0 24px hsl(var(--primary) / 0.3)" }} />
    </>
  );
};
