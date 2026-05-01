import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Lock } from "lucide-react";
import { useEffect } from "react";

type Props = { url: string | null; name?: string; onClose: () => void };

export const PreviewModal = ({ url, name, onClose }: Props) => {
  useEffect(() => {
    if (!url) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [url, onClose]);

  return (
    <AnimatePresence>
      {url && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex flex-col bg-background/95 backdrop-blur-xl no-cursor"
        >
          {/* Custom NorthVave browser bar */}
          <div className="flex items-center gap-3 border-b border-border bg-secondary-bg px-4 py-3">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" /> Close
            </button>
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            </div>
            <div className="flex flex-1 items-center justify-center">
              <div className="flex w-full max-w-md items-center gap-2 rounded-md border border-border bg-background/60 px-3 py-1.5 text-xs text-muted-foreground">
                <Lock className="h-3 w-3 text-cyan" />
                <span className="truncate">northvave.studio/preview/{name?.toLowerCase().replace(/\s+/g, "-") ?? ""}</span>
              </div>
            </div>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-glow"
            >
              Open <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          {/* Iframe */}
          <div className="relative flex-1 bg-background">
            <iframe
              src={url}
              title={name ?? "Preview"}
              className="h-full w-full border-0"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
