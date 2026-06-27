import type { P4Language } from '@types2/p4';


export const languages: Record<P4Language, string> = {
  en: 'English',
  es: 'Español',
};

export const defaultLang: P4Language = 'es'; // Tu idioma por defecto

export const ui = {
  en: {
    'nav.back': 'Go back to Inaba',
    "home.title.0": "Reach Out To",
    "home.title.1": "The Truth",
    "home.description": "Welcome to the ultimate database system. Select a concept from the navigation menu above to analyze the anomalies occurring inside the television world and the fog settling over Inaba.",
    "home.channel_tuned": "CHANNEL_TUNED: OK",
    "notebox.system": "SYSTEM_NOTE"
  },
  es: {
    "nav.back": "Volver a Inaba",
    "home.title.0": "Alcanza",
    "home.title.1": "La Verdad",
    "home.description": "Bienvenido al sistema definitivo de base de datos. Selecciona un concepto del menú de navegación superior para analizar las anomalías que ocurren dentro del mundo de la televisión y la niebla que se posa sobre Inaba.",
    "home.channel_tuned": "CANAL_SINTONIZADO: OK",
    "notebox.system": "NOTA DEL SISTEMA"
  },
} as const;
