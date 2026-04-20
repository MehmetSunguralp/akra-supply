import SendIcon from '@mui/icons-material/Send';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined';
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import { Alert, Button, Grid, InputAdornment, Snackbar, Stack, TextField, Typography } from '@mui/material';
import type { FormikProps } from 'formik';

import { RequestFormCategoryField } from './RequestFormCategoryField';
import { RequestFormLeadTimeField } from './RequestFormLeadTimeField';
import type { RequestFormLabels, RequestFormValues } from '@/types/requestFormTypes';

type RequestFormFieldsProps = {
  labels: RequestFormLabels;
  isSending: boolean;
  errorSnackbarOpen: boolean;
  formik: FormikProps<RequestFormValues>;
  onCloseError: () => void;
};

export const RequestFormFields = ({
  labels,
  isSending,
  errorSnackbarOpen,
  formik,
  onCloseError,
}: RequestFormFieldsProps) => {
  return (
    <>
      <Stack direction='row' spacing={1} sx={{ mb: 3 }}>
        <SendIcon fontSize='large' />
        <Typography variant='h6'>{labels.sendRequest}</Typography>
      </Stack>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            disabled={isSending}
            name='productName'
            label={labels.productName}
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
          <RequestFormCategoryField labels={labels} isSending={isSending} formik={formik} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            disabled={isSending}
            name='quantity'
            label={labels.quantity}
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
          <RequestFormLeadTimeField labels={labels} isSending={isSending} formik={formik} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            multiline
            minRows={5}
            disabled={isSending}
            name='description'
            label={labels.description}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start' sx={{ alignSelf: 'flex-start', m: 0, pr: 1, height: 'auto' }}>
                    <NotesOutlinedIcon fontSize='small' sx={{ color: 'action.active' }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>
      </Grid>

      <Button type='submit' variant='contained' size='large' startIcon={<SendIcon />} disabled={isSending}>
        {labels.sendRequest}
      </Button>

      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={6000}
        onClose={onCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={onCloseError} severity='error' variant='filled' sx={{ width: '100%' }}>
          {labels.requestFormValidationError}
        </Alert>
      </Snackbar>
    </>
  );
};
