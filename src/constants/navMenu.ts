import FactoryIcon from '@mui/icons-material/Factory';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';

import type { NavMenuItem } from '../types/navMenu';

export const navMenu: NavMenuItem[] = [
  {
    id: 'manufacturers',
    labelKey: 'navMenu.manufacturers',
    enabled: true,
    icon: FactoryIcon,
  },
  {
    id: 'products',
    labelKey: 'navMenu.products',
    enabled: false,
    icon: Inventory2Icon,
  },
  {
    id: 'requests',
    labelKey: 'navMenu.requests',
    enabled: false,
    icon: RequestQuoteIcon,
  },
  {
    id: 'shipping',
    labelKey: 'navMenu.shipping',
    enabled: false,
    icon: LocalShippingIcon,
  },
  {
    id: 'documents',
    labelKey: 'navMenu.documents',
    enabled: false,
    icon: DescriptionIcon,
  },
  {
    id: 'settings',
    labelKey: 'navMenu.settings',
    enabled: false,
    icon: SettingsIcon,
  },
];
