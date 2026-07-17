/**
 * Idiomas soportados por la aplicación
 */
export type P3RLanguage = 'en' | 'es';

export interface Params {
  lang: P3RLanguage;
}

/**
 * Información base y metadata de las secciones principales (p3r-info.json)
 */
export interface P3RSectionInfo {
  title: string;
  subtitle: string;
  description: string;
  mechanic: string;
}

export interface P3RDungeonEntry {
  id: string;
  name: string;
  area: string;
  floors: string;
  reward: string;
  description: string;
}

export interface P3RShadowEntry {
  id: string;
  name: string;
  dungeon: string;
  weakness: string;
  weaknesses?: string[];
  hp?: string;
  ep?: string;
  abilities?: string[];
  description: string;
  reward: string;
}

export interface P3RObjectEntry {
  id: string;
  name: string;
  category: string;
  usage: string;
  source: string;
  description: string;
  healHp?: number | string;
  healEp?: number | string;
  statusEffect?: string;
}

export type AffinityState =
  | "wk"
  | "rs"
  | "nu"
  | "rp"
  | "dr"
  | "normal";

export interface P3RAffinity {
  element: string;
  state: AffinityState;
}

export interface P3RSkill {
  name: string;
  level: number;
}

export interface P3RStats {
  st: number;
  ma: number;
  en: number;
  ag: number;
  lu: number;
}

export interface P3RCompendiumEntry {
  slug: string;
  name: string;
  arcana: string;
  level: number;

  image: string;
  url: string;

  stats: P3RStats;

  affinities: P3RAffinity[];

  skills: P3RSkill[];
}

export interface P3RSkillCardEntry {
  id: string;
  name: string;

  // Existentes
  type: string;
  effect: string;
  source: string;

  // Utilizados por el componente
  kind?: 'attack' | 'heal' | 'support' | string;
  icon?: string;
  element?: string;
  strength?: number | string;
  cost?: number | string;
  costType?: string;
  target?: 'one' | 'all' | 'party' | 'self' | string;
  healing?: number | string;
}

export interface P3RQuest {
  id: string;
  title: string;
  description: string;
  client?: string;
  location?: string;
  reward: string;
}

export interface P3RSocialLink {
  id: string;
  arcana: string;
  character: string;
  description: string;
  available?: string;
  availability?: string;
  location?: string;
  confidant_name?: string;
}

export interface P3RMoonlight {
  id: string;
  target: string;
  description: string;
  info: string;
}
