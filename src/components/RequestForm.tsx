import { useSelector } from 'react-redux';
import { Alert, Box, Button, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from 'formik';
import { requestFormSchema } from '@/validation/requestFormSchema';
import type { RootState } from '@/store';
import { locales } from '@/locales';

export default function RequestForm() {
  const currentLocale = useSelector((state: RootState) => state.locale.currentLocale);
  const t = locales[currentLocale].common;

  const formik = useFormik({
    initialValues: {
      productName: '',
      category: '',
      quantity: '',
      leadTime: '',
      description: '',
    },
    validationSchema: requestFormSchema(t),
    onSubmit: async (_, helpers) => {
      await new Promise((r) => setTimeout(r, 900));
      helpers.resetForm();
      helpers.setStatus('success');
      helpers.setSubmitting(false);
    },
  });

  return (
    <Box component='form' onSubmit={formik.handleSubmit} sx={{ mt: 3, display: 'grid', gap: 2 }}>
      <Stack direction='row' spacing={1} sx={{ mb: 3 }}>
        <SendIcon fontSize='large' />
        <Typography variant='h6'>{t.sendRequest}</Typography>
      </Stack>

      {formik.status === 'success' && <Alert severity='success'>{t.requestSuccess}</Alert>}

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            name='productName'
            label={t.productName}
            value={formik.values.productName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.productName && Boolean(formik.errors.productName)}
            helperText={formik.touched.productName && formik.errors.productName}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            select
            fullWidth
            name='category'
            label={t.category}
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={formik.touched.category && formik.errors.category}
          >
            {Object.entries(t.categories).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            name='quantity'
            label={t.quantity}
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            name='leadTime'
            label={t.leadTime}
            value={formik.values.leadTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.leadTime && Boolean(formik.errors.leadTime)}
            helperText={formik.touched.leadTime && formik.errors.leadTime}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            multiline
            minRows={5}
            name='description'
            label={t.description}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
        </Grid>
      </Grid>

      <Button type='submit' variant='contained' disabled={formik.isSubmitting}>
        {formik.isSubmitting ? t.sending : t.sendRequest}
      </Button>
    </Box>
  );
}
