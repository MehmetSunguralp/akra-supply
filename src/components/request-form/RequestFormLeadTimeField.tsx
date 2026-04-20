import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import { Box, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import type { FormikProps } from 'formik';

import type { RequestFormLabels, RequestFormValues } from '@/types/requestFormTypes';

type RequestFormLeadTimeFieldProps = {
  labels: RequestFormLabels;
  isSending: boolean;
  formik: FormikProps<RequestFormValues>;
};

export const RequestFormLeadTimeField = ({ labels, isSending, formik }: RequestFormLeadTimeFieldProps) => {
  const leadTimeGroupError =
    (formik.touched.leadTimeAmount && Boolean(formik.errors.leadTimeAmount)) ||
    (formik.touched.leadTimeUnit && Boolean(formik.errors.leadTimeUnit));
  const leadTimeHelper =
    (formik.touched.leadTimeAmount && formik.errors.leadTimeAmount) ||
    (formik.touched.leadTimeUnit && formik.errors.leadTimeUnit);

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          width: '100%',
          alignItems: 'stretch',
        }}
      >
        <TextField
          fullWidth
          disabled={isSending}
          name='leadTimeAmount'
          label={labels.leadTime}
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
          sx={{ '& .MuiOutlinedInput-root': { borderTopRightRadius: 0, borderBottomRightRadius: 0 } }}
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
          slotProps={{ htmlInput: { 'aria-label': `${labels.leadTime} unit` } }}
          sx={{ '& .MuiOutlinedInput-root': { borderTopLeftRadius: 0, borderBottomLeftRadius: 0, marginLeft: '-1px' } }}
        >
          <MenuItem value='day'>{labels.leadTimeUnitDay}</MenuItem>
          <MenuItem value='week'>{labels.leadTimeUnitWeek}</MenuItem>
          <MenuItem value='month'>{labels.leadTimeUnitMonth}</MenuItem>
        </TextField>
      </Box>
      {leadTimeHelper ? (
        <Typography variant='caption' color='error' sx={{ display: 'block', mt: 0.5, ml: 1.75 }}>
          {leadTimeHelper}
        </Typography>
      ) : null}
    </>
  );
};
