/**
 * Idiomas soportados por la aplicación
 */
export type P5Language = 'es';

export interface DefaultParams {
  lang: P5Language;
}

/**
 * Información base y metadata de las secciones principales (p5-info.json)
 */
export interface P5SectionInfo {
  title: string;
  subtitle: string;
  description: string;
  mechanic: string;
}

export interface P5DungeonEntry {
  id: string;
  name: string;
  area: string;
  floors: string;
  reward: string;
  description: string;
}

export interface P5ShadowEntry {
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

export interface P5ObjectEntry {
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

export interface P5Affinity {
  element: string;
  state: AffinityState;
}

export interface P5Skill {
  name: string;
  level: number;
}

export interface P5Stats {
  st: number;
  ma: number;
  en: number;
  ag: number;
  lu: number;
}

export interface P5CompendiumEntry {
  slug: string;
  name: string;
  arcana: string;
  level: number;
  image: string;
  url: string;
  stats: P5Stats;
  affinities: P5Affinity[];
  skills: P5Skill[];
}

export interface P5SkillCardEntry {
  id: string;
  name: string;
  type: string;
  effect: string;
  source: string;
  kind?: 'attack' | 'heal' | 'support';
  element?: string;
  strength?: string;
  target?: 'one' | 'all' | 'party' | 'self' | string;
  cost?: number | string;
  costType?: 'PE' | 'HP' | 'SP' | string;
  healing?: number | string;
  icon?: string;
}

/**
 * Diccionario general que mapea cada sección con su información (Formato de Objeto de p5-info.json)
 */
export interface P5DataDictionary {
  'velvet-room': P5SectionInfo;
  'tv-world': P5SectionInfo;
  'confidents': P5SectionInfo;
  'midnight-channel': P5SectionInfo;
  'quests': P5SectionInfo;
  [key: string]: P5SectionInfo; // Por si añades más secciones en el futuro
}


export type P5Answers = Record<string, string[]>;

export type P5ConfidantSummary = Pick<
  P5Confidant,
  "id" | "name" | "arcana"
>;

export interface P5Confidant {
  id: string;
  name: string;
  arcana: P5Arcana;
  gifts?: string[];
  ranks: P5Rank[];
}

export interface P5Arcana {
  id: string;
  name: string;
}

export interface P5Rank {
  number: number;
  options: string[];
  requirement?: string;
  ability?: P5Ability | P5Ability[]
}

export interface P5Ability {
  name: string;
  description: string;
}