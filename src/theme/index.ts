import { createTheme, type ThemeOptions } from '@mui/material/styles';

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
  },
};

export const themes = {
  akra: createTheme({
    ...commonThemeOptions,
    palette: {
      mode: 'dark',
      primary: { main: '#0F172A' },
      secondary: { main: '#C8A96B' },
      background: {
        default: '#F8FAFC',
        paper: '#FFFFFF',
      },
    },
  }),

  dark: createTheme({
    ...commonThemeOptions,
    palette: {
      mode: 'dark',
      primary: { main: '#FFA726' },
      secondary: { main: '#C7C7C7' },
      background: {
        default: '#0C0D18',
        paper: '#101324',
      },
    },
  }),

  ocean: createTheme({
    ...commonThemeOptions,
    palette: {
      mode: 'light',
      primary: { main: '#0EA5E9' },
      secondary: { main: '#14B8A6' },
    },
  }),

  luxury: createTheme({
    ...commonThemeOptions,
    palette: {
      mode: 'light',
      primary: { main: '#D4AF37' },
      secondary: { main: '#F5E6A8' },
    },
  }),
};
