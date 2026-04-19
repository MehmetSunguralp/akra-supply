import type { LocaleName } from '@/types/locale';
import type { ThemeName } from '@/types/themes';

export const PREFERENCE_STORAGE_KEYS = {
  locale: 'akra-locale',
  theme: 'akra-theme',
} as const;

const THEME_IDS: ThemeName[] = ['akra', 'dark', 'ocean', 'luxury'];

export function readPersistedLocale(): LocaleName {
  if (typeof window === 'undefined') return 'tr';
  try {
    const raw = localStorage.getItem(PREFERENCE_STORAGE_KEYS.locale);
    if (raw === 'en' || raw === 'tr') return raw;
  } catch {
    /* ignore */
  }
  return 'tr';
}

export function readPersistedTheme(): ThemeName {
  if (typeof window === 'undefined') return 'akra';
  try {
    const raw = localStorage.getItem(PREFERENCE_STORAGE_KEYS.theme);
    if (raw && (THEME_IDS as string[]).includes(raw)) return raw as ThemeName;
  } catch {
    /* ignore */
  }
  return 'akra';
}
