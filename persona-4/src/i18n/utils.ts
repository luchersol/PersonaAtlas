import type { P4Language, P4SectionInfo, P4Quest, P4SocialLink, P4MidnightChannel } from '@types2/p4';
import { ui, defaultLang } from './ui';

export function useTranslations(lang: P4Language) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

function getUrlData(lang: keyof typeof ui, path: string): string {
  return "../data/"+lang+"/"+path;
}

/**
 * NUEVO: Cargador dinámico de información general (p4-info.json)
 */
export async function getP4Data(lang: keyof typeof ui, id: string): Promise<P4SectionInfo> {
  const data = await import(getUrlData(lang, "p4-info.json"));
  return data.default[id] as P4SectionInfo;
}

/**
 * NUEVO: Cargador dinámico de misiones (quests-list.json)
 * El .default es necesario al usar import() dinámico con JSON
 */
export async function getQuestsList(lang: keyof typeof ui): Promise<P4Quest[]> {
  const data = await import(getUrlData(lang, "quests-list.json"));
  return data.default as P4Quest[];
}

export async function getSocialLinksList(lang: keyof typeof ui): Promise<P4SocialLink[]> {
  const data = await import(getUrlData(lang, "social-links-list.json"));
  return data.default as P4SocialLink[];
}

export async function getMidnightChannelList(lang: keyof typeof ui): Promise<P4MidnightChannel[]> {
  const data = await import(getUrlData(lang, "midnight-channel-list.json"));
  return data.default as P4MidnightChannel[];
}