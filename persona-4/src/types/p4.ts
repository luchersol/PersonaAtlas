/**
 * Idiomas soportados por la aplicación
 */
export type P4Language = 'en' | 'es';

export interface Params {
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
  route: string;       // Ruta de navegación interna (ej: /social-links/yosuke-hanamura)
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