import { Box, ButtonBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import { useLayoutEffect, useRef, useState } from 'react';

import type { NavMenuItem } from '@/types/navMenu';
import { isNavItemSelected } from './navSelection';

export type NavigationItemsVariant = 'desktop' | 'mobile';

type NavigationItemsProps = {
  items: NavMenuItem[];
  pathname: string;
  labels: Record<string, string>;
  variant: NavigationItemsVariant;
  onNavigate: (item: NavMenuItem) => void;
};

export const NavigationItems = ({ items, pathname, labels, variant, onNavigate }: NavigationItemsProps) => {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [itemWidth, setItemWidth] = useState<number>(96);

  useLayoutEffect(() => {
    if (variant !== 'mobile') return;
    const widths = itemRefs.current.map((node) => node?.offsetWidth ?? 0);
    const max = Math.max(...widths, 96);
    if (max !== itemWidth) {
      setItemWidth(max);
    }
  }, [labels, itemWidth, variant]);

  useLayoutEffect(() => {
    if (variant !== 'mobile') return;
    if (scrollerRef.current) scrollerRef.current.scrollLeft = 0;
  }, [variant]);

  if (variant === 'desktop') {
    return (
      <List>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() => onNavigate(item)}
                disabled={!item.enabled}
                selected={isNavItemSelected(pathname, item)}
              >
                <ListItemIcon>
                  <Icon fontSize='medium' />
                </ListItemIcon>
                <ListItemText primary={labels[item.id]} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    );
  }

  return (
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
      {items.map((item, index) => {
        const Icon = item.icon;
        const selected = isNavItemSelected(pathname, item);

        return (
          <ButtonBase
            key={item.id}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            onClick={() => onNavigate(item)}
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
                {labels[item.id]}
              </Typography>
            </Stack>
          </ButtonBase>
        );
      })}
    </Box>
  );
};
