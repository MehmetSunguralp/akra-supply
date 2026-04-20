import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { navMenu } from '@/constants/navMenu';
import { locales } from '@/locales';
import type { NavMenuItem } from '@/types/navMenu';
import { NavigationItems } from './NavigationItems';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export const DesktopSidebar = () => {
  const currentLocale = useSelector((state: RootState) => state.locale.currentLocale);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const menuStrings: Record<string, string> = locales[currentLocale].navMenu;
  const mainMenu = navMenu.filter((item) => item.id !== 'settings');
  const settingsItem = navMenu.find((item) => item.id === 'settings');

  const goTo = (item: NavMenuItem) => {
    if (!item.enabled || !item.url) return;
    navigate(item.url);
  };

  return (
    <Box
      component='aside'
      sx={{
        width: 240,
        minWidth: 240,
        height: '100vh',
        borderRight: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        top: 0,
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ py: 2.5, px: 2 }}>
        <Typography
          variant='h1'
          sx={{
            fontSize: 26,
            fontWeight: 700,
            textAlign: 'center',
            userSelect: 'none',
          }}
        >
          AKRA
          <Box component='span' sx={{ fontWeight: 400 }}>
            TECH
          </Box>
        </Typography>
      </Box>

      <Box sx={{ px: 1, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <NavigationItems items={mainMenu} pathname={pathname} labels={menuStrings} variant='desktop' onNavigate={goTo} />

        <Box sx={{ mt: 'auto' }}>
          <Divider />

          {settingsItem ? (
            <NavigationItems
              items={[settingsItem]}
              pathname={pathname}
              labels={menuStrings}
              variant='desktop'
              onNavigate={goTo}
            />
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};
