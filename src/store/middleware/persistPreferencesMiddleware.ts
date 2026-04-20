import type { Middleware } from '@reduxjs/toolkit';

import { PREFERENCE_STORAGE_KEYS } from '@/constants/preferencesStorage';
import { setLocale } from '@/store/slices/localeSlice';
import { setTheme } from '@/store/slices/themeSlice';

export const persistPreferencesMiddleware: Middleware = () => (next) => (action) => {
  const result = next(action);

  if (setLocale.match(action)) {
    try {
      localStorage.setItem(PREFERENCE_STORAGE_KEYS.locale, action.payload);
    } catch {}
  }

  if (setTheme.match(action)) {
    try {
      localStorage.setItem(PREFERENCE_STORAGE_KEYS.theme, action.payload);
    } catch {}
  }

  return result;
};
