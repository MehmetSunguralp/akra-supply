import * as Yup from 'yup';

const leadTimeUnits = ['day', 'week', 'month'] as const;

export const requestFormSchema = (t: { requiredField: string }) =>
  Yup.object({
    productName: Yup.string().required(t.requiredField),
    category: Yup.string().required(t.requiredField),
    quantity: Yup.number().required(t.requiredField),
    leadTimeAmount: Yup.mixed<number | string>()
      .required(t.requiredField)
      .test('positive-number', t.requiredField, (value) => {
        if (value === '' || value === null || value === undefined) return false;
        const n = Number(value);
        return !Number.isNaN(n) && n > 0;
      }),
    leadTimeUnit: Yup.string()
      .oneOf([...leadTimeUnits], t.requiredField)
      .required(t.requiredField),
    description: Yup.string().required(t.requiredField),
  });
