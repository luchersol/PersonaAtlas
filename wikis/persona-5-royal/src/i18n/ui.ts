import type { P5Language } from '@types2/p5';
import en from "@data/en/ui.json";
import es from "@data/es/ui.json";

export const languages: Record<P5Language, string> = {
  'en': 'English',
  'es': 'Español',
};

export const defaultLang: P5Language = 'es'; // Tu idioma por defecto

export const ui = {
  en,
  es,
} as const;
