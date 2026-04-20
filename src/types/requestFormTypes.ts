export type RequestFormValues = {
  productName: string;
  category: string;
  quantity: string;
  leadTimeAmount: string;
  leadTimeUnit: string;
  description: string;
};

export type RequestFormLabels = {
  sendRequest: string;
  productName: string;
  category: string;
  categorySelectPlaceholder: string;
  categories: Record<string, string>;
  quantity: string;
  leadTime: string;
  leadTimeUnitDay: string;
  leadTimeUnitWeek: string;
  leadTimeUnitMonth: string;
  description: string;
  requestFormValidationError: string;
};
