import { useState, type SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { Box, Stack, Typography } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useFormik } from 'formik';

import { requestFormSchema } from '@/validation/requestFormSchema';
import type { RootState } from '@/store';
import { locales } from '@/locales';
import type { RequestFormProps } from '@/types/RequestFormProps';
import { RequestFormFields } from './RequestFormFields';
import type { RequestFormValues } from '@/types/requestFormTypes';

const initialFormValues: RequestFormValues = {
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

  const formik = useFormik<RequestFormValues>({
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
      await new Promise((resolve) => setTimeout(resolve, 2000));
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

  return (
    <Box component='form' onSubmit={handleFormSubmit} sx={{ display: 'grid', gap: 2 }}>
      <RequestFormFields
        labels={t}
        isSending={isSending}
        errorSnackbarOpen={errorSnackbarOpen}
        formik={formik}
        onCloseError={() => setErrorSnackbarOpen(false)}
      />
    </Box>
  );
}
