import type { NavMenuItem } from '@/types/navMenu';

export const isNavItemSelected = (pathname: string, item: NavMenuItem) => {
  if (!item.url) return false;
  if (item.id === 'manufacturers') {
    return pathname === '/manufacturers' || pathname.startsWith('/manufacturers/');
  }
  return pathname === item.url;
};
