import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

import { navMenu } from '@/constants/navMenu';
import { locales } from '@/locales';

export const DesktopSidebar = () => {
  const currentLocale = useSelector(
    (state: RootState) => state.locale.currentLocale,
  );
  const menuStrings: Record<string, string> = locales[currentLocale].navMenu;

  const mainMenu = navMenu.filter((item) => item.id !== 'settings');
  const settingsItem = navMenu.find((item) => item.id === 'settings');

  return (
    <Drawer variant='permanent' open role='presentation'>
      <Toolbar>
        <Typography
          variant='h1'
          sx={{
            fontSize: 26,
            fontWeight: 700,
            width: '100%',
            textAlign: 'center',
          }}
        >
          AKRA
          <Box component={'span'} sx={{ fontWeight: 400 }}>
            TECH
          </Box>{' '}
        </Typography>
      </Toolbar>

      <Box
        sx={{
          px: 1,
          width: 240,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <List>
          {mainMenu.map((menuItem) => {
            const Icon = menuItem.icon;

            return (
              <ListItem key={menuItem.id} disablePadding>
                <ListItemButton
                  disabled={!menuItem.enabled}
                  selected={menuItem.id === 'manufacturers'}
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

        <Divider sx={{ mt: 'auto' }} />

        <List>
          {settingsItem && (
            <ListItem disablePadding>
              <ListItemButton disabled={!settingsItem.enabled}>
                <ListItemIcon>
                  <settingsItem.icon fontSize='small' />
                </ListItemIcon>

                <ListItemText primary={menuStrings[settingsItem.id]} />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  );
};
