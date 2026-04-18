import { useMediaQuery } from '@mui/material';
import { MobileBar } from './MobileBar';

export const Navigation = () => {
  const isMobile = useMediaQuery('(max-width: 900px)');
  return isMobile ? <MobileBar /> : <div>DesktopSidebar</div>;
};
