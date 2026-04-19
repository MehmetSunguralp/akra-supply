import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@/store/slices/themeSlice';
import localeReducer from '@/store/slices/localeSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    locale: localeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
