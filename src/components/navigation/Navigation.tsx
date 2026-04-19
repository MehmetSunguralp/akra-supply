import { useMediaQuery } from '@mui/material';
import { MobileBar } from './MobileBar';
import { DesktopSidebar } from './DesktopSidebar';

export const Navigation = () => {
  const isMobile = useMediaQuery('(max-width: 900px)');
  return isMobile ? <MobileBar /> : <DesktopSidebar />;
};
