import "server-only";
import type { Locale } from "./locales";
import type { Dictionary } from "./types";

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((m) => m.en),
  ta: () => import("./dictionaries/ta").then((m) => m.ta),
  kn: () => import("./dictionaries/kn").then((m) => m.kn),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const load = loaders[locale] ?? loaders.en;
  return load();
}
