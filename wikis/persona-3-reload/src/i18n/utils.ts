import type { P3RLanguage, P3RSectionInfo, P3RQuest, P3RSocialLink, P3RMoonlight, P3RDungeonEntry, P3RShadowEntry, P3RObjectEntry, P3RCompendiumEntry, P3RSkillCardEntry } from '@types2/p3r';
import { ui, defaultLang } from './ui';

export function useTranslations(lang: P3RLanguage) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

function getUrlData(lang: keyof typeof ui, path: string): string {
  return "../data/"+lang+"/"+path;
}

/**
 * NUEVO: Cargador dinámico de información general (p3r-info.json)
 */
export async function getP3RData(lang: keyof typeof ui, id: string): Promise<P3RSectionInfo> {
  const data = await import(getUrlData(lang, "p3r-info.json"));
  return data.default[id] as P3RSectionInfo;
}

/**
 * NUEVO: Cargador dinámico de misiones (quests-list.json)
 * El .default es necesario al usar import() dinámico con JSON
 */
export async function getQuestsList(lang: keyof typeof ui): Promise<P3RQuest[]> {
  const data = await import(getUrlData(lang, "quests-list.json"));
  return data.default as P3RQuest[];
}

export async function getSocialLinksList(lang: keyof typeof ui): Promise<P3RSocialLink[]> {
  const data = await import(getUrlData(lang, "social-links-list.json"));
  return data.default as P3RSocialLink[];
}

export async function getMoonlightList(lang: keyof typeof ui): Promise<P3RMoonlight[]> {
  const data = await import(getUrlData(lang, "moonlight-list.json"));
  return data.default as P3RMoonlight[];
}

export async function getTartarusDungeonsList(lang: keyof typeof ui): Promise<P3RDungeonEntry[]> {
  const data = await import(getUrlData(lang, "tartarus-dungeons.json"));
  return data.default as P3RDungeonEntry[];
}

export async function getTartarusShadowsList(lang: keyof typeof ui): Promise<P3RShadowEntry[]> {
  const data = await import(getUrlData(lang, "tartarus-shadows.json"));
  return data.default as P3RShadowEntry[];
}

export async function getObjectsList(lang: keyof typeof ui): Promise<P3RObjectEntry[]> {
  const data = await import(getUrlData(lang, "objects-list.json"));
  return data.default as P3RObjectEntry[];
}

export async function getCompendiumList(lang: keyof typeof ui): Promise<P3RCompendiumEntry[]> {
  const data = await import(getUrlData(lang, "personas.json"));
  return data.default as P3RCompendiumEntry[];
}

export async function getSkillCardsList(lang: keyof typeof ui): Promise<P3RSkillCardEntry[]> {
  const data = await import(getUrlData(lang, "velvet-room-skill-cards.json"));
  return data.default as P3RSkillCardEntry[];
}
