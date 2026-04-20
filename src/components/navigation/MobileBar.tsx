import { navMenu } from '@/constants/navMenu';
import { locales } from '@/locales';
import type { RootState } from '@/store';
import type { NavMenuItem } from '@/types/navMenu';
import { Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavigationItems } from './NavigationItems';

export const MobileBar = () => {
  const currentLocale = useSelector((state: RootState) => state.locale.currentLocale);
  const menuStrings: Record<string, string> = locales[currentLocale].navMenu;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const goTo = (item: NavMenuItem) => {
    if (!item.enabled || !item.url) return;
    navigate(item.url);
  };

  return (
    <Paper
      component='nav'
      elevation={0}
      square
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        paddingX: 1,
        zIndex: (theme) => theme.zIndex.appBar,
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        backdropFilter: 'blur(10px)',
      }}
    >
      <NavigationItems items={navMenu} pathname={pathname} labels={menuStrings} variant='mobile' onNavigate={goTo} />
    </Paper>
  );
};
