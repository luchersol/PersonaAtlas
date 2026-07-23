import type { 
  P5Language, 
  P5SectionInfo, 
  P5DungeonEntry, 
  P5ShadowEntry, 
  P5ObjectEntry, 
  P5CompendiumEntry, 
  P5SkillCardEntry, 
  P5Answers, 
  P5ConfidantSummary, 
  P5Confidant 
} from '@types2/p5';
import { ui, defaultLang } from './ui';

export const LANGUAGES = ['es'] as const satisfies readonly P5Language[];

/**
 * Registra TODOS los archivos JSON dentro de ../data/ para que Vite los empaquete
 * correctamente durante el 'npm run build'.
 */
const ALL_DATA_FILES = import.meta.glob<{ default: unknown }>('../data/**/*.json');

/**
 * Función auxiliar genérica para cargar cualquier JSON de la carpeta ../data/
 */
async function loadJsonData<T>(lang: P5Language, path: string): Promise<T> {
  const relativePath = `../data/${lang}/${path}`;
  const loader = ALL_DATA_FILES[relativePath];

  if (!loader) {
    throw new Error(`[P5 Data Error] No se encontró el archivo de datos: "${relativePath}"`);
  }

  const module = await loader();
  return module.default as T;
}

// --- Métodos de utilidad e idioma ---

export function getLanguageStaticPaths(): { params: { lang: P5Language }; }[] {
  return LANGUAGES.map((lang) => ({
    params: { lang },
  }));
}

export function useTranslations(lang: P5Language) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

// --- Cargadores de datos refactorizados ---

export async function getP5Data(lang: P5Language, id: string): Promise<P5SectionInfo> {
  const data = await loadJsonData<Record<string, P5SectionInfo>>(lang, "p5-info.json");
  return data[id];
}

export async function getP5Answers(lang: P5Language): Promise<P5Answers> {
  return loadJsonData<P5Answers>(lang, "classroom-answers.json");
}

export async function getConfidentsList(lang: P5Language): Promise<P5ConfidantSummary[]> {
  return loadJsonData<P5ConfidantSummary[]>(lang, "confidents/confidents-list.json");
}

export async function getConfident(lang: P5Language, id: string): Promise<P5Confidant> {
  return loadJsonData<P5Confidant>(lang, `confidents/${id}.json`);
}

export async function getTvWorldDungeonsList(lang: P5Language): Promise<P5DungeonEntry[]> {
  return loadJsonData<P5DungeonEntry[]>(lang, "tv-world-dungeons.json");
}

export async function getTvWorldShadowsList(lang: P5Language): Promise<P5ShadowEntry[]> {
  return loadJsonData<P5ShadowEntry[]>(lang, "tv-world-shadows.json");
}

export async function getObjectsList(lang: P5Language): Promise<P5ObjectEntry[]> {
  return loadJsonData<P5ObjectEntry[]>(lang, "objects-list.json");
}

export async function getCompendiumList(lang: P5Language): Promise<P5CompendiumEntry[]> {
  return loadJsonData<P5CompendiumEntry[]>(lang, "personas.json");
}

export async function getSkillCardsList(lang: P5Language): Promise<P5SkillCardEntry[]> {
  return loadJsonData<P5SkillCardEntry[]>(lang, "velvet-room-skill-cards.json");
}