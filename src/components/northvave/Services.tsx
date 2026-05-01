import { motion } from "framer-motion";
import { Zap, Bot, Target } from "lucide-react";
import { useRef, type MouseEvent } from "react";

const services = [
  { icon: Zap, title: "Web Design & Development", desc: "Premium websites that convert. From landing pages to full e-commerce experiences engineered for speed and storytelling.", color: "from-primary/30 to-cyan/10" },
  { icon: Bot, title: "Custom Software & SaaS", desc: "CRMs, dashboards, automations — built exactly for your workflow. No bloat. No off-the-shelf compromises.", color: "from-cyan/30 to-purple/10" },
  { icon: Target, title: "AI Integration", desc: "Voice assistants, chatbots, AI features embedded inside your product. Intelligence that actually ships.", color: "from-purple/30 to-primary/10" },
];

const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-12px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)"; };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="transition-transform duration-300 ease-out will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
};

export const Services = () => {
  return (
    <section id="services" className="relative scroll-mt-24 bg-secondary-bg py-28">
      <div className="absolute inset-0 bg-grid opacity-[0.04]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-primary">// Services</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Built end-to-end. <span className="text-gradient">In-house.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:border-primary/60 hover:shadow-[0_25px_60px_-15px_hsl(var(--primary)/0.45)]">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                  <div className={`absolute -inset-px -z-0 bg-gradient-to-br ${s.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                  <div className="relative">
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                    <div className="mt-8 flex items-center gap-2 text-xs font-medium text-primary opacity-70 transition-opacity group-hover:opacity-100">
                      <span>Learn more</span>
                      <span className="h-px w-8 bg-primary transition-all group-hover:w-12" />
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
