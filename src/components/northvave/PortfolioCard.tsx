import { motion } from "framer-motion";
import { ArrowUpRight, Eye } from "lucide-react";
import { useState } from "react";
import type { Project } from "@/data/projects";

type Props = { project: Project; onPreview: (p: Project) => void; index: number };

const screenshot = (url: string) =>
  `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800`;

export const PortfolioCard = ({ project, onPreview, index }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  // Vary heights for masonry feel
  const heights = ["h-[220px]", "h-[280px]", "h-[320px]", "h-[260px]"];
  const heightCls = heights[index % heights.length];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-primary/50 hover:shadow-[0_20px_60px_-10px_hsl(var(--primary)/0.35)]"
    >
      {/* Screenshot */}
      <div className={`relative ${heightCls} overflow-hidden bg-secondary-bg`}>
        {/* Logo fallback — shown while loading or if screenshot fails */}
        {(!loaded || errored) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-secondary-bg via-card to-background">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary shadow-[0_0_40px_hsl(var(--primary)/0.4)]">
              <span className="font-display text-2xl font-bold text-primary-foreground tracking-tight">NV</span>
              <span className="absolute inset-0 rounded-2xl border border-primary/30 animate-pulse" />
            </div>
            <div className="text-center px-4">
              <p className="font-display text-sm font-semibold text-foreground">{project.name}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {errored ? "Click to view live" : "Loading preview…"}
              </p>
            </div>
          </div>
        )}
        {!errored && (
          <img
            src={screenshot(project.url)}
            alt={`${project.name} preview`}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
            className={`h-full w-full object-cover object-top transition-all duration-700 group-hover:scale-105 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
        {/* Hover button */}
        <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 transition-all duration-500 group-hover:opacity-100">
          <button
            onClick={() => onPreview(project)}
            className="flex translate-y-3 items-center gap-2 rounded-full border border-primary/40 bg-primary/90 px-5 py-2.5 text-xs font-semibold text-primary-foreground backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 hover:bg-primary"
          >
            <Eye className="h-3.5 w-3.5" />
            View Live Site
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
        {/* Category chip */}
        <div className="absolute left-4 top-4">
          <span className="rounded-full border border-border/60 bg-background/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground backdrop-blur">
            {project.category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
            {project.name}
          </h3>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:rotate-45" />
        </div>
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span key={t} className="rounded-md border border-border/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};
