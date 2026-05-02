import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Project } from "@/data/projects";

export type DbProject = Project & { id: string; display_order: number };

let cache: DbProject[] | null = null;
const listeners = new Set<(p: DbProject[]) => void>();

const fetchAll = async () => {
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });
  const list = (data ?? []) as DbProject[];
  cache = list;
  listeners.forEach((l) => l(list));
  return list;
};

export const refreshProjects = () => fetchAll();

export const useProjects = () => {
  const [projects, setProjects] = useState<DbProject[]>(cache ?? []);
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    listeners.add(setProjects);
    if (!cache) {
      fetchAll().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
    return () => {
      listeners.delete(setProjects);
    };
  }, []);

  return { projects, loading };
};