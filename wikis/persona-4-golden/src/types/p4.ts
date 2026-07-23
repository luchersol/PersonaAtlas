/**
 * Idiomas soportados por la aplicación
 */
export type P4Language = 'en' | 'es';

export interface DefaultParams {
  lang: P4Language;
}

/**
 * Información base y metadata de las secciones principales (p4-info.json)
 */
export interface P4SectionInfo {
  title: string;
  subtitle: string;
  description: string;
  mechanic: string;
}

export interface P4DungeonEntry {
  id: string;
  name: string;
  area: string;
  floors: string;
  reward: string;
  description: string;
}

export interface P4ShadowEntry {
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

export interface P4ObjectEntry {
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

export interface P4Affinity {
  element: string;
  state: AffinityState;
}

export interface P4Skill {
  name: string;
  level: number;
}

export interface P4Stats {
  st: number;
  ma: number;
  en: number;
  ag: number;
  lu: number;
}

export interface P4CompendiumEntry {
  slug: string;
  name: string;
  arcana: string;
  level: number;

  image: string;
  url: string;

  stats: P4Stats;

  affinities: P4Affinity[];

  skills: P4Skill[];
}

export interface P4SkillCardEntry {
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
 * Diccionario general que mapea cada sección con su información (Formato de Objeto de p4-info.json)
 */
export interface P4DataDictionary {
  'velvet-room': P4SectionInfo;
  'tv-world': P4SectionInfo;
  'social-links': P4SectionInfo;
  'midnight-channel': P4SectionInfo;
  'quests': P4SectionInfo;
  [key: string]: P4SectionInfo; // Por si añades más secciones en el futuro
}

/**
 * Ficha individual de una misión secundaria (quests-list.json)
 */
export interface P4Quest {
  id: number;
  name: string;
  title: string;
  client: string;
  location: string;
  reward: string;
  day: string;
  description: string;
  requirements: string;
}

export interface RankItem {
  level: string | number;       // El nivel del rango (ej: "2", 3, "MAX")
  bestAnswers: string[];        // Array con las opciones de diálogo óptimas
  notes?: string;               // Notas opcionales (ej: habilidades desbloqueadas)
}

/**
 * Ficha de perfil de un personaje en Social Links (social-links-list.json)
 */
export interface P4SocialLink {
  id: string;
  name: string;
  arcana: string;
  image: string;       // Ruta local a la imagen en /public/images/characters/
  arcanaCard: string;  // Ruta local a la imagen en /public/images/cards/
  location: string;
  description: string;
  ranks: RankItem[];
}

/**
 * Estado de sintonización o vital de una víctima del canal (Midnight Channel)
 */
export type BroadcastStatus = 'Alert' | 'Deceased' | 'Safe' | 'Alerta' | 'Fallecido' | 'A Salvo';

/**
 * Datos de una transmisión en el Midnight Channel (midnight-channel-list.json)
 */
export interface P4MidnightChannel {
  id: string;
  name: string;
  airDate: string;
  status: BroadcastStatus;
  image: string;       // Ruta local a la imagen de la transmisión
  route: string;       // Ruta de navegación interna (ej: /midnight-channel/mayumi-yamano)
  broadcastSummary: string;
}