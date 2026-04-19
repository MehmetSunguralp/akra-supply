import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { navMenu } from '@/constants/navMenu';
import { locales } from '@/locales';
import type { NavMenuItem } from '@/types/navMenu';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const isNavItemSelected = (pathname: string, item: NavMenuItem) => {
  if (!item.url) return false;
  if (item.id === 'manufacturers') {
    return pathname === '/manufacturers' || pathname.startsWith('/manufacturers/');
  }
  return pathname === item.url;
};

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
        <List>
          {mainMenu.map((menuItem) => {
            const Icon = menuItem.icon;

            return (
              <ListItem key={menuItem.id} disablePadding>
                <ListItemButton
                  onClick={() => goTo(menuItem)}
                  disabled={!menuItem.enabled}
                  selected={isNavItemSelected(pathname, menuItem)}
                >
                  <ListItemIcon>
                    <Icon fontSize='medium' />
                  </ListItemIcon>

                  <ListItemText primary={menuStrings[menuItem.id]} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Box sx={{ mt: 'auto' }}>
          <Divider />

          <List>
            {settingsItem && (
              <ListItem disablePadding>
                <ListItemButton
                  disabled={!settingsItem.enabled}
                  selected={isNavItemSelected(pathname, settingsItem)}
                  onClick={() => goTo(settingsItem)}
                >
                  <ListItemIcon>
                    <settingsItem.icon fontSize='small' />
                  </ListItemIcon>

                  <ListItemText primary={menuStrings[settingsItem.id]} />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Box>
    </Box>
  );
};
