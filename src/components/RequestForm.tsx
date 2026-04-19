import { useState, type SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import {
  Alert,
  Box,
  Button,
  Grid,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined';
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
import { useFormik } from 'formik';
import type { SvgIconComponent } from '@mui/icons-material';

import { requestFormSchema } from '@/validation/requestFormSchema';
import type { RootState } from '@/store';
import { locales } from '@/locales';
import type { RequestFormProps } from '@/types/RequestFormProps';

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

const initialFormValues = {
  productName: '',
  category: '',
  quantity: '',
  leadTimeAmount: '',
  leadTimeUnit: 'day',
  description: '',
};

type FormPhase = 'form' | 'success';

export default function RequestForm({ onSendingOverlayChange }: Readonly<RequestFormProps>) {
  const currentLocale = useSelector((state: RootState) => state.locale.currentLocale);
  const t = locales[currentLocale].common;

  const [formPhase, setFormPhase] = useState<FormPhase>('form');
  const [isSending, setIsSending] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: requestFormSchema(t),
    onSubmit: () => {},
  });

  const handleFormSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      await formik.setTouched({
        productName: true,
        category: true,
        quantity: true,
        leadTimeAmount: true,
        leadTimeUnit: true,
        description: true,
      });
      setErrorSnackbarOpen(true);
      return;
    }

    console.log('Request form data', { ...formik.values });

    setIsSending(true);
    onSendingOverlayChange?.(true);
    try {
      await new Promise((r) => setTimeout(r, 2000));
      formik.resetForm({ values: initialFormValues });
      setFormPhase('success');
    } finally {
      setIsSending(false);
      onSendingOverlayChange?.(false);
    }
  };

  if (formPhase === 'success') {
    return (
      <Stack spacing={2} sx={{ py: 2, alignItems: 'center', textAlign: 'center', maxWidth: 480, mx: 'auto' }}>
        <TaskAltIcon sx={{ fontSize: 56, color: 'success.main' }} />
        <Typography variant='h6' sx={{ fontWeight: 600 }}>
          {t.requestSuccess}
        </Typography>
      </Stack>
    );
  }

  const leadTimeGroupError =
    (formik.touched.leadTimeAmount && Boolean(formik.errors.leadTimeAmount)) ||
    (formik.touched.leadTimeUnit && Boolean(formik.errors.leadTimeUnit));
  const leadTimeHelper =
    (formik.touched.leadTimeAmount && formik.errors.leadTimeAmount) ||
    (formik.touched.leadTimeUnit && formik.errors.leadTimeUnit);

  return (
    <Box component='form' onSubmit={handleFormSubmit} sx={{ display: 'grid', gap: 2 }}>
      <Stack direction='row' spacing={1} sx={{ mb: 3 }}>
        <SendIcon fontSize='large' />
        <Typography variant='h6'>{t.sendRequest}</Typography>
      </Stack>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            disabled={isSending}
            name='productName'
            label={t.productName}
            value={formik.values.productName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.productName && Boolean(formik.errors.productName)}
            helperText={formik.touched.productName && formik.errors.productName}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <Inventory2OutlinedIcon fontSize='small' sx={{ color: 'action.active' }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            select
            fullWidth
            disabled={isSending}
            name='category'
            label={t.category}
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
                        {t.categorySelectPlaceholder}
                      </Typography>
                    );
                  }
                  const Icon = categoryFieldIcons[key] ?? CategoryOutlinedIcon;
                  return (
                    <Box component='span' sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                      <Icon sx={{ fontSize: 20, color: 'action.active', flexShrink: 0 }} />
                      <Box component='span' sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {t.categories[key as keyof typeof t.categories]}
                      </Box>
                    </Box>
                  );
                },
              },
            }}
          >
            <MenuItem value='' disabled>
              <em>{t.categorySelectPlaceholder}</em>
            </MenuItem>
            {Object.entries(t.categories).map(([key, value]) => {
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
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            disabled={isSending}
            name='quantity'
            label={t.quantity}
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type='number'
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <NumbersOutlinedIcon fontSize='small' sx={{ color: 'action.active' }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
              width: '100%',
              columnGap: 0,
              alignItems: 'stretch',
            }}
          >
            <TextField
              fullWidth
              disabled={isSending}
              name='leadTimeAmount'
              label={t.leadTime}
              type='number'
              value={formik.values.leadTimeAmount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='0'
              error={leadTimeGroupError}
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: { min: 1 },
                input: {
                  startAdornment: (
                    <InputAdornment position='start'>
                      <ScheduleOutlinedIcon fontSize='small' sx={{ color: 'action.active' }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                minWidth: 0,
                gridColumn: 1,
                alignSelf: 'stretch',
                height: '100%',
                '& .MuiOutlinedInput-root': {
                  height: '100%',
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                },
              }}
            />
            <TextField
              select
              fullWidth
              hiddenLabel
              disabled={isSending}
              name='leadTimeUnit'
              value={formik.values.leadTimeUnit}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={leadTimeGroupError}
              slotProps={{
                htmlInput: { 'aria-label': `${t.leadTime} unit` },
              }}
              sx={{
                minWidth: 0,
                gridColumn: 2,
                alignSelf: 'stretch',
                height: '100%',
                '& .MuiOutlinedInput-root': {
                  height: '100%',
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  marginLeft: '-1px',
                },
              }}
            >
              <MenuItem value='day'>{t.leadTimeUnitDay}</MenuItem>
              <MenuItem value='week'>{t.leadTimeUnitWeek}</MenuItem>
              <MenuItem value='month'>{t.leadTimeUnitMonth}</MenuItem>
            </TextField>
          </Box>
          {leadTimeHelper ? (
            <Typography variant='caption' color='error' sx={{ display: 'block', mt: 0.5, ml: 1.75 }}>
              {leadTimeHelper}
            </Typography>
          ) : null}
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            multiline
            minRows={5}
            disabled={isSending}
            name='description'
            label={t.description}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment
                    position='start'
                    sx={{
                      alignSelf: 'flex-start',
                      m: 0,
                      mt: 0,
                      pr: 1,
                      height: 'auto',
                    }}
                  >
                    <NotesOutlinedIcon fontSize='small' sx={{ color: 'action.active' }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>
      </Grid>

      <Button type='submit' variant='contained' size='large' startIcon={<SendIcon />} disabled={isSending}>
        {t.sendRequest}
      </Button>

      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setErrorSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setErrorSnackbarOpen(false)} severity='error' variant='filled' sx={{ width: '100%' }}>
          {t.requestFormValidationError}
        </Alert>
      </Snackbar>
    </Box>
  );
}
