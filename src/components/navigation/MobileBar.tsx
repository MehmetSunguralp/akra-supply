import { navMenu } from '@/constants/navMenu';
import { locales } from '@/locales';
import type { RootState } from '@/store';
import type { NavMenuItem } from '@/types/navMenu';
import { Box, ButtonBase, Paper, Stack, Typography } from '@mui/material';
import { useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const isNavItemSelected = (pathname: string, item: NavMenuItem) => {
  if (!item.url) return false;
  if (item.id === 'manufacturers') {
    return pathname === '/manufacturers' || pathname.startsWith('/manufacturers/');
  }
  return pathname === item.url;
};

export const MobileBar = () => {
  const currentLocale = useSelector((state: RootState) => state.locale.currentLocale);
  const menuStrings: Record<string, string> = locales[currentLocale].navMenu;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [itemWidth, setItemWidth] = useState<number>(96);

  useLayoutEffect(() => {
    const widths = itemRefs.current.map((node) => node?.offsetWidth ?? 0);
    const max = Math.max(...widths, 96);
    if (max !== itemWidth) {
      setItemWidth(max);
    }
  }, [currentLocale, itemWidth]);

  useLayoutEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollLeft = 0;
    }
  }, []);

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
      <Box
        ref={scrollerRef}
        sx={{
          display: 'flex',
          justifyContent: { xs: 'flex-start', sm: 'stretch' },
          gap: { xs: 0.75, sm: 0.5 },
          px: { xs: 2, sm: 1 },
          pt: 0.75,
          pb: 'calc(0.75rem + env(safe-area-inset-bottom))',
          overflowX: { xs: 'auto', sm: 'hidden' },
          overflowY: 'hidden',
          scrollSnapType: { xs: 'x proximity', sm: 'none' },
          WebkitOverflowScrolling: 'touch',
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
        }}
      >
        {navMenu.map((item, index) => {
          const Icon = item.icon;
          const selected = isNavItemSelected(pathname, item);

          return (
            <ButtonBase
              key={item.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              onClick={() => {
                if (item.enabled && item.url) navigate(item.url);
              }}
              disabled={!item.enabled}
              sx={{
                flex: { xs: '0 0 auto', sm: '1 1 0' },
                width: { xs: itemWidth, sm: 'auto' },
                minWidth: { xs: itemWidth, sm: 0 },
                px: 1.25,
                py: 0.75,
                borderRadius: 0.5,
                opacity: item.enabled ? 1 : 0.42,
                scrollSnapAlign: { xs: 'start', sm: 'none' },
                bgcolor: selected ? 'action.selected' : 'transparent',
                color: selected ? 'primary.main' : 'text.secondary',
              }}
            >
              <Stack spacing={0.5} sx={{ alignItems: 'center' }}>
                <Icon fontSize='small' />
                <Typography variant='caption' sx={{ fontWeight: selected ? 700 : 600, whiteSpace: 'nowrap' }}>
                  {menuStrings[item.id]}
                </Typography>
              </Stack>
            </ButtonBase>
          );
        })}
      </Box>
    </Paper>
  );
};
