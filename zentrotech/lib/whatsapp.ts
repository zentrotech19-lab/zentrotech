import { SITE } from "@/lib/constants";

const WA_NUMBER = SITE.phone.replace(/[^\d]/g, "");

export function waLink(prefillText: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(prefillText)}`;
}
