// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@/store/index.ts';
import AppThemeProvider from '@/providers/AppThemeProvider.tsx';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Provider store={store}>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  </Provider>,
  // </StrictMode>,
);
