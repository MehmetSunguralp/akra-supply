import type { SvgIconComponent } from '@mui/icons-material';

export interface NavMenuItem {
  id: string;
  enabled: boolean;
  icon: SvgIconComponent;
}
