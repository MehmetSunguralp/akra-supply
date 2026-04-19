import * as Yup from 'yup';

export const requestFormSchema = (t: { requiredField: string }) =>
  Yup.object({
    productName: Yup.string().required(t.requiredField),
    category: Yup.string().required(t.requiredField),
    quantity: Yup.string().required(t.requiredField),
    leadTime: Yup.string().required(t.requiredField),
    description: Yup.string().required(t.requiredField),
  });
