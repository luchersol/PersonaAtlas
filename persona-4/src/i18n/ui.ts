import type { P4Language } from '../types/p4';


export const languages: Record<P4Language, string> = {
  en: 'English',
  es: 'Español',
};

export const defaultLang: P4Language = 'es'; // Tu idioma por defecto

export const ui = {
  en: {
    'nav.back': 'Go back to Inaba',
    'nav.board': 'Back to Board',
    'nav.quests': 'Quests',
    'quest.client': 'Client',
    'quest.location': 'Location',
    'quest.reward': 'Reward',
    'quest.briefing': 'Mission Briefing',
    'quest.requirements': 'Requirements',
  },
  es: {
    'nav.back': 'Volver a Inaba',
    'nav.board': 'Volver al Tablón',
    'nav.quests': 'Misiones',
    'quest.client': 'Cliente',
    'quest.location': 'Ubicación',
    'quest.reward': 'Recompensa',
    'quest.briefing': 'Detalles de la Misión',
    'quest.requirements': 'Requisitos',
  },
} as const;