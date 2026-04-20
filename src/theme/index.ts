import { createTheme, type Theme, type ThemeOptions } from '@mui/material/styles';

import type { ThemeName } from '@/types/themes';

const commonThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: 'Open Sans, sans-serif',
  },
  shape: { borderRadius: 12 },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'body2' },
          style: {
            opacity: 0.6,
          },
        },
      ],
    },
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.paper}`,
        },
        '*::-webkit-scrollbar': {
          width: 8,
          height: 8,
        },
        '*::-webkit-scrollbar-track': {
          background: theme.palette.background.paper,
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.primary.main,
          borderRadius: 999,
          border: `2px solid ${theme.palette.background.paper}`,
        },
        '*::-webkit-scrollbar-thumb:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      }),
    },
  },
};

export const THEME_ORDER: ThemeName[] = ['akra', 'ocean', 'dark', 'luxury'];

const akra = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'dark',
    primary: { main: '#d4b87a', light: '#e9d4a8', dark: '#a68548' },
    secondary: { main: '#7c8aa6', light: '#a3b0cc', dark: '#5a6785' },
    background: {
      default: '#060a14',
      paper: '#101a2e',
    },
    text: {
      primary: '#f4f6fb',
      secondary: '#9fb0ce',
    },
    divider: 'rgba(158, 179, 214, 0.2)',
    success: { main: '#4ade80' },
    warning: { main: '#fbbf24' },
    error: { main: '#f87171' },
    info: { main: '#7dd3fc' },
  },
});

const dark = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'dark',
    primary: { main: '#38bdf8', light: '#7dd3fc', dark: '#0ea5e9' },
    secondary: { main: '#818cf8', light: '#a5b4fc', dark: '#4f46e5' },
    background: {
      default: '#020617',
      paper: '#0c1328',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
    },
    divider: 'rgba(56, 189, 248, 0.18)',
    success: { main: '#4ade80' },
    warning: { main: '#fcd34d' },
    error: { main: '#fb7185' },
    info: { main: '#67e8f9' },
  },
});

const ocean = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'light',
    primary: { main: '#0369a1', light: '#0ea5e9', dark: '#075985' },
    secondary: { main: '#0d9488', light: '#2dd4bf', dark: '#0f766e' },
    background: {
      default: '#e8f4fc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0c1929',
      secondary: '#3d5a73',
    },
    divider: 'rgba(3, 105, 161, 0.14)',
    success: { main: '#059669' },
    warning: { main: '#d97706' },
    error: { main: '#dc2626' },
    info: { main: '#0284c7' },
  },
});

const luxury = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'light',
    primary: { main: '#8f5c10', light: '#b45309', dark: '#713f12' },
    secondary: { main: '#c2410c', light: '#ea580c', dark: '#9a3412' },
    background: {
      default: '#fff8e7',
      paper: '#fffef5',
    },
    text: {
      primary: '#1c1410',
      secondary: '#5c4f42',
    },
    divider: 'rgba(143, 92, 16, 0.16)',
    success: { main: '#15803d' },
    warning: { main: '#ca8a04' },
    error: { main: '#b91c1c' },
    info: { main: '#0e7490' },
  },
});

export const themes: Record<ThemeName, Theme> = {
  akra,
  dark,
  ocean,
  luxury,
};
