import type { SvgIconComponent } from '@mui/icons-material';

export interface NavMenuItem {
  id: string;
  labelKey: string;
  enabled: boolean;
  icon: SvgIconComponent;
}
