import { motion } from "framer-motion";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Send, Mail, AtSign } from "lucide-react";
import { ParticleField } from "./ParticleField";
import { useSiteContent } from "@/hooks/useSiteContent";

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  need: z.enum(["Website", "SaaS", "Automation", "Other"]),
  message: z.string().trim().min(10, "Tell us a little more").max(1200),
});

export const Contact = () => {
  const { t } = useSiteContent();
  const [form, setForm] = useState({ name: "", email: "", need: "Website", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) errs[issue.path[0] as string] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Message received. We'll be in touch within 24 hours.");
      setForm({ name: "", email: "", need: "Website", message: "" });
    }, 800);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-28">
      <ParticleField />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      <div className="relative mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-primary">{t("contact.eyebrow", "// Contact")}</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="text-gradient">{t("contact.title", "Let's Build Something.")}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            {t("contact.subtitle", "Tell us what you're working on. We reply to every serious enquiry within 24 hours.")}
          </p>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-12 space-y-5 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" error={errors.name}>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={80}
                placeholder="Your name"
                className="w-full rounded-lg border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={160}
                placeholder="you@company.com"
                className="w-full rounded-lg border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </Field>
          </div>
          <Field label="What do you need?" error={errors.need}>
            <select
              value={form.need}
              onChange={(e) => setForm({ ...form, need: e.target.value })}
              className="w-full rounded-lg border border-border bg-background/60 px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option>Website</option>
              <option>SaaS</option>
              <option>Automation</option>
              <option>Other</option>
            </select>
          </Field>
          <Field label="Message" error={errors.message}>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              maxLength={1200}
              rows={5}
              placeholder="Tell us about your project, timeline, and goals…"
              className="w-full resize-none rounded-lg border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </Field>
          <button
            type="submit"
            disabled={submitting}
            className="shimmer inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_30px_hsl(var(--primary)/0.6)] disabled:opacity-60"
          >
            {submitting ? "Sending…" : (<>Send Message <Send className="h-4 w-4" /></>)}
          </button>
        </motion.form>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
            <AtSign className="h-4 w-4 text-primary" /> {t("contact.handle", "@northvave")}
          </a>
          <a href={`mailto:${t("contact.email", "hello@northvave.studio")}`} className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
            <Mail className="h-4 w-4 text-primary" /> {t("contact.email", "hello@northvave.studio")}
          </a>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <label className="block">
    <div className="mb-2 flex items-center justify-between">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      {error && <span className="text-[11px] text-destructive">{error}</span>}
    </div>
    {children}
  </label>
);
