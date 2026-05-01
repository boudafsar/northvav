import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { NeuralNetwork } from "./NeuralNetwork";

const headlineLines = [
  ["We", "Build", "Digital"],
  ["That", "Performs."],
];

export const Hero = () => {
  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <NeuralNetwork />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.05] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-[11px] font-medium tracking-[0.18em] text-primary backdrop-blur"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
          </span>
          CUSTOM SOFTWARE · WEB · AUTOMATION
        </motion.div>

        <h1 className="font-display text-[clamp(2.75rem,9vw,5.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-foreground">
          {headlineLines.map((line, li) => (
            <span key={li} className="block">
              {line.map((word, wi) => {
                const delay = (li === 0 ? 0 : headlineLines[0].length) * 0.08 + wi * 0.08 + 0.15;
                const isAccent = word === "Performs.";
                return (
                  <span key={wi} className="inline-block overflow-hidden align-bottom">
                    <motion.span
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className={`inline-block ${isAccent ? "text-gradient" : ""}`}
                    >
                      {word}
                      {wi < line.length - 1 && "\u00A0"}
                    </motion.span>
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg"
        >
          NorthVave builds premium websites, custom software, CRMs and automations for businesses that refuse to be average.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="#work"
            className="shimmer group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground animate-pulse-glow"
          >
            See Our Work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-primary/60 hover:text-primary"
          >
            Start a Project
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="relative h-12 w-[2px] overflow-hidden rounded-full bg-border/40">
          <div className="absolute inset-x-0 h-4 bg-gradient-to-b from-transparent via-primary to-transparent animate-scroll-down" />
        </div>
      </motion.div>
    </section>
  );
};
