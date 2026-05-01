import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  { n: "01", title: "Discovery", desc: "We dig deep into your business, users and goals before a single pixel moves." },
  { n: "02", title: "Design", desc: "Visual systems, prototypes, and motion — engineered to feel inevitable." },
  { n: "03", title: "Build", desc: "Production-grade code. Performance, accessibility and SEO baked in." },
  { n: "04", title: "Launch", desc: "Ship, measure, iterate. We stay on after launch — most agencies don't." },
];

export const Process = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 30%"] });
  const dash = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section id="process" ref={ref} className="relative scroll-mt-24 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-primary">// Process</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            From idea to <span className="text-gradient">launch.</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* SVG line - desktop horizontal */}
          <svg className="absolute left-0 top-10 hidden h-[2px] w-full md:block" preserveAspectRatio="none" viewBox="0 0 100 1">
            <motion.line
              x1="0" y1="0.5" x2="100" y2="0.5"
              stroke="hsl(var(--primary))"
              strokeWidth="0.4"
              pathLength={1}
              style={{ pathLength: useTransform(scrollYProgress, [0, 1], [0, 1]) }}
            />
          </svg>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-6">
            {steps.map((s, i) => {
              const start = i / steps.length;
              const end = (i + 0.5) / steps.length;
              return <Step key={s.n} step={s} start={start} end={end} progress={scrollYProgress} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const Step = ({ step, start, end, progress }: any) => {
  const opacity = useTransform(progress, [start, end], [0.3, 1]);
  const y = useTransform(progress, [start, end], [16, 0]);
  const nodeScale = useTransform(progress, [start, end], [1, 1.4]);
  const nodeGlow = useTransform(progress, [start, end], [0, 1]);

  return (
    <div className="relative">
      <motion.div
        style={{ scale: nodeScale }}
        className="relative z-10 mx-auto mb-6 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-background"
      >
        <motion.div style={{ opacity: nodeGlow }} className="absolute inset-0 rounded-full bg-primary blur-md" />
        <motion.div style={{ opacity: nodeGlow }} className="relative h-2 w-2 rounded-full bg-primary" />
      </motion.div>
      <motion.div style={{ opacity, y }} className="text-center md:text-left">
        <div className="font-display text-xs font-medium tracking-[0.2em] text-primary">{step.n}</div>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground">{step.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
      </motion.div>
    </div>
  );
};
