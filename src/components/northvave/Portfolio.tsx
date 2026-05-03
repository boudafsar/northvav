import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useMemo, useState } from "react";
import { categories, type Project } from "@/data/projects";
import { PortfolioCard } from "./PortfolioCard";
import { PreviewModal } from "./PreviewModal";
import { useProjects } from "@/hooks/useProjects";
import { useSiteContent } from "@/hooks/useSiteContent";

export const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const [preview, setPreview] = useState<Project | null>(null);
  const { projects } = useProjects();
  const { t } = useSiteContent();

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects]
  );

  return (
    <section id="work" className="relative scroll-mt-24 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-primary">{t("portfolio.eyebrow", "// Selected Work")}</span>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              <span className="text-gradient">{t("portfolio.title", "Work That Speaks.")}</span>
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              {t("portfolio.subtitle", "Live, in-production websites and platforms. Hover any card to preview in a clean frame.")}
            </p>
          </div>
        </motion.div>

        {/* Filter pills */}
        <LayoutGroup>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 flex flex-wrap gap-2"
          >
            {categories.map((c) => {
              const active = c === filter;
              return (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`relative rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                    active
                      ? "border-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 -z-0 rounded-full bg-gradient-primary glow-blue"
                    />
                  )}
                  <span className="relative z-10">{c}</span>
                </button>
              );
            })}
          </motion.div>

          <motion.div
            layout
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <PortfolioCard key={p.url} project={p} onPreview={setPreview} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>

      <PreviewModal url={preview?.url ?? null} name={preview?.name} onClose={() => setPreview(null)} />
    </section>
  );
};
