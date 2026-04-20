import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import WeekendOutlinedIcon from '@mui/icons-material/WeekendOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import HardwareOutlinedIcon from '@mui/icons-material/HardwareOutlined';
import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined';
import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import type { SvgIconComponent } from '@mui/icons-material';
import { Box, ListItemIcon, ListItemText, MenuItem, TextField, Typography } from '@mui/material';
import type { FormikProps } from 'formik';

import type { RequestFormLabels, RequestFormValues } from '@/types/requestFormTypes';

const categoryFieldIcons: Record<string, SvgIconComponent> = {
  textile: CheckroomOutlinedIcon,
  furniture: WeekendOutlinedIcon,
  automotiveParts: DirectionsCarOutlinedIcon,
  foodPackaging: RestaurantOutlinedIcon,
  plasticInjection: ScienceOutlinedIcon,
  steelManufacturing: HardwareOutlinedIcon,
  electronics: MemoryOutlinedIcon,
  machinery: PrecisionManufacturingOutlinedIcon,
  constructionMaterials: ApartmentOutlinedIcon,
  medicalSupplies: MedicalServicesOutlinedIcon,
};

type RequestFormCategoryFieldProps = {
  labels: RequestFormLabels;
  isSending: boolean;
  formik: FormikProps<RequestFormValues>;
};

export const RequestFormCategoryField = ({ labels, isSending, formik }: RequestFormCategoryFieldProps) => {
  return (
    <TextField
      select
      fullWidth
      disabled={isSending}
      name='category'
      label={labels.category}
      value={formik.values.category}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.category && Boolean(formik.errors.category)}
      helperText={formik.touched.category && formik.errors.category}
      slotProps={{
        inputLabel: { shrink: true },
        select: {
          displayEmpty: true,
          renderValue: (selected: unknown) => {
            const key = selected as string;
            if (!key) {
              return (
                <Typography variant='body2' color='text.secondary' component='span'>
                  {labels.categorySelectPlaceholder}
                </Typography>
              );
            }
            const Icon = categoryFieldIcons[key] ?? CategoryOutlinedIcon;
            return (
              <Box component='span' sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                <Icon sx={{ fontSize: 20, color: 'action.active', flexShrink: 0 }} />
                <Box component='span' sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {labels.categories[key]}
                </Box>
              </Box>
            );
          },
        },
      }}
    >
      <MenuItem value='' disabled>
        <em>{labels.categorySelectPlaceholder}</em>
      </MenuItem>
      {Object.entries(labels.categories).map(([key, value]) => {
        const RowIcon = categoryFieldIcons[key] ?? CategoryOutlinedIcon;
        return (
          <MenuItem key={key} value={key}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <RowIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText primary={value} />
          </MenuItem>
        );
      })}
    </TextField>
  );
};
