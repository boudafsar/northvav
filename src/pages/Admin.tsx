import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { refreshProjects, useProjects, type DbProject } from "@/hooks/useProjects";
import { refreshSiteContent, useSiteContent } from "@/hooks/useSiteContent";
import { toast } from "sonner";
import { Loader2, LogOut, Plus, Trash2, Save, ExternalLink, ArrowLeft } from "lucide-react";

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const [tab, setTab] = useState<"projects" | "content">("projects");

  useEffect(() => {
    document.title = "Admin — NorthVave";
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4 px-6 text-center">
        <h1 className="font-display text-2xl font-bold">Not authorized</h1>
        <p className="text-muted-foreground text-sm">This account doesn't have admin access.</p>
        <button onClick={signOut} className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Site
            </Link>
            <span className="font-display text-lg font-bold">NorthVave Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground sm:block">{user.email}</span>
            <button onClick={signOut} className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs hover:border-primary/60">
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl gap-6 px-6">
          {(["projects", "content"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative pb-3 text-sm font-medium transition-colors ${
                tab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "projects" ? "Projects" : "Site Text"}
              {tab === t && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-primary" />}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {tab === "projects" ? <ProjectsTab /> : <ContentTab />}
      </main>
    </div>
  );
};

const ProjectsTab = () => {
  const { projects } = useProjects();
  const [creating, setCreating] = useState(false);

  const addBlank = async () => {
    setCreating(true);
    const maxOrder = projects.reduce((m, p) => Math.max(m, p.display_order), 0);
    const { error } = await supabase.from("projects").insert({
      name: "New Project",
      url: "https://example.com",
      category: "SaaS",
      description: "",
      tags: [],
      display_order: maxOrder + 1,
    });
    setCreating(false);
    if (error) return toast.error(error.message);
    toast.success("Project added");
    refreshProjects();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Projects ({projects.length})</h2>
          <p className="text-sm text-muted-foreground">Add, edit, or remove portfolio entries shown on the homepage.</p>
        </div>
        <button
          onClick={addBlank}
          disabled={creating}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          <Plus className="h-4 w-4" /> Add Project
        </button>
      </div>
      <div className="space-y-4">
        {projects.map((p) => (
          <ProjectRow key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
};

const CATEGORIES = ["Healthcare", "E-Commerce", "SaaS", "Real Estate", "Fashion", "Community", "Coaching"];

const ProjectRow = ({ project }: { project: DbProject }) => {
  const [form, setForm] = useState({
    name: project.name,
    url: project.url,
    category: project.category,
    description: project.description,
    tags: project.tags.join(", "),
    display_order: project.display_order,
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const dirty =
    form.name !== project.name ||
    form.url !== project.url ||
    form.category !== project.category ||
    form.description !== project.description ||
    form.tags !== project.tags.join(", ") ||
    form.display_order !== project.display_order;

  const save = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("projects")
      .update({
        name: form.name.trim(),
        url: form.url.trim(),
        category: form.category,
        description: form.description,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        display_order: Number(form.display_order) || 0,
      })
      .eq("id", project.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    refreshProjects();
  };

  const remove = async () => {
    if (!confirm(`Delete "${project.name}"? This cannot be undone.`)) return;
    setDeleting(true);
    const { error } = await supabase.from("projects").delete().eq("id", project.id);
    setDeleting(false);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    refreshProjects();
  };

  return (
    <div className="rounded-xl border border-border bg-card/60 p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <Input label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <Input label="URL" value={form.url} onChange={(v) => setForm({ ...form, url: v })} />
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="mt-1.5 w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          >
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <Input
          label="Display Order"
          type="number"
          value={String(form.display_order)}
          onChange={(v) => setForm({ ...form, display_order: Number(v) })}
        />
        <Input label="Tags (comma separated)" value={form.tags} onChange={(v) => setForm({ ...form, tags: v })} className="sm:col-span-2" />
        <div className="sm:col-span-2">
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={2}
            className="mt-1.5 w-full resize-none rounded-lg border border-border bg-background/60 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary"
        >
          <ExternalLink className="h-3 w-3" /> Open live
        </a>
        <div className="flex gap-2">
          <button
            onClick={remove}
            disabled={deleting}
            className="inline-flex items-center gap-1.5 rounded-full border border-destructive/40 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10 disabled:opacity-60"
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </button>
          <button
            onClick={save}
            disabled={!dirty || saving}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const ContentTab = () => {
  const { content } = useSiteContent();
  const entries = Object.entries(content).sort(([a], [b]) => a.localeCompare(b));
  const [newKey, setNewKey] = useState("");

  const addKey = async () => {
    const key = newKey.trim();
    if (!key) return;
    const { error } = await supabase.from("site_content").insert({ key, value: "" });
    if (error) return toast.error(error.message);
    setNewKey("");
    refreshSiteContent();
    toast.success("Added");
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold">Site Text ({entries.length})</h2>
        <p className="text-sm text-muted-foreground">
          Edit any text shown on the homepage. Changes go live immediately.
        </p>
      </div>
      <div className="mb-6 flex gap-2 rounded-xl border border-border bg-card/60 p-3">
        <input
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          placeholder="new.key.name"
          className="flex-1 rounded-lg border border-border bg-background/60 px-3 py-2 text-sm focus:border-primary focus:outline-none"
        />
        <button
          onClick={addKey}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>
      <div className="space-y-3">
        {entries.map(([key, value]) => (
          <ContentRow key={key} contentKey={key} initialValue={value} />
        ))}
      </div>
    </div>
  );
};

const ContentRow = ({ contentKey, initialValue }: { contentKey: string; initialValue: string }) => {
  const [value, setValue] = useState(initialValue);
  const [saving, setSaving] = useState(false);
  const dirty = value !== initialValue;

  const save = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("site_content")
      .update({ value })
      .eq("key", contentKey);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    refreshSiteContent();
  };

  const remove = async () => {
    if (!confirm(`Delete key "${contentKey}"?`)) return;
    const { error } = await supabase.from("site_content").delete().eq("key", contentKey);
    if (error) return toast.error(error.message);
    refreshSiteContent();
    toast.success("Deleted");
  };

  const isLong = initialValue.length > 60 || value.length > 60;

  return (
    <div className="rounded-xl border border-border bg-card/60 p-4">
      <div className="flex items-center justify-between gap-3 mb-2">
        <code className="text-xs font-mono text-primary">{contentKey}</code>
        <button onClick={remove} className="text-muted-foreground hover:text-destructive">
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
      {isLong ? (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={3}
          className="w-full resize-y rounded-lg border border-border bg-background/60 px-3 py-2 text-sm focus:border-primary focus:outline-none"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-sm focus:border-primary focus:outline-none"
        />
      )}
      <div className="mt-3 flex justify-end">
        <button
          onClick={save}
          disabled={!dirty || saving}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
          Save
        </button>
      </div>
    </div>
  );
};

const Input = ({
  label,
  value,
  onChange,
  type = "text",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  className?: string;
}) => (
  <div className={className}>
    <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1.5 w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-sm focus:border-primary focus:outline-none"
    />
  </div>
);

export default Admin;