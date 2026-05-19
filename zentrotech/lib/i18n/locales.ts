// Supported languages for the website. Adding a new locale here is the
// single source of truth — middleware, dictionaries, and the language
// switcher all derive from this list.

export const LOCALES = ["en", "ta", "kn"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_META: Record<Locale, { label: string; nativeLabel: string; htmlLang: string }> = {
  en: { label: "English", nativeLabel: "English", htmlLang: "en-IN" },
  ta: { label: "Tamil", nativeLabel: "தமிழ்", htmlLang: "ta-IN" },
  kn: { label: "Kannada", nativeLabel: "ಕನ್ನಡ", htmlLang: "kn-IN" },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
