import { ThemeProvider, CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/index';
import { themes } from '@/theme/index';

type Props = {
  children: React.ReactNode;
};

export default function AppThemeProvider({ children }: Props) {
  const currentTheme = useSelector((state: RootState) => state.theme.currentTheme);

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
