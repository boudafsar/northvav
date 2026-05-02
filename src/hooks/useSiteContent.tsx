import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type ContentMap = Record<string, string>;

let cache: ContentMap | null = null;
const listeners = new Set<(c: ContentMap) => void>();

const fetchAll = async () => {
  const { data } = await supabase.from("site_content").select("key,value");
  const map: ContentMap = {};
  (data ?? []).forEach((r: { key: string; value: string }) => (map[r.key] = r.value));
  cache = map;
  listeners.forEach((l) => l(map));
  return map;
};

export const refreshSiteContent = () => fetchAll();

export const useSiteContent = () => {
  const [content, setContent] = useState<ContentMap>(cache ?? {});

  useEffect(() => {
    listeners.add(setContent);
    if (!cache) fetchAll();
    return () => {
      listeners.delete(setContent);
    };
  }, []);

  const t = (key: string, fallback = "") => content[key] ?? fallback;
  return { t, content };
};