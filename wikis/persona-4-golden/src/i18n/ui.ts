import type { P4Language } from '@types2/p4';
import en from "@data/en/ui.json";
import es from "@data/es/ui.json";

export const languages: Record<P4Language, string> = {
  'en': 'English',
  'es': 'Español',
};

export const defaultLang: P4Language = 'es'; // Tu idioma por defecto

export const ui = {
  en,
  es,
} as const;
