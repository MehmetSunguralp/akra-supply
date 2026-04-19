import { configureStore } from '@reduxjs/toolkit';
import { persistPreferencesMiddleware } from '@/store/middleware/persistPreferencesMiddleware';
import themeReducer from '@/store/slices/themeSlice';
import localeReducer from '@/store/slices/localeSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    locale: localeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistPreferencesMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
