import * as yup from 'yup';

// Common validation schemas
export const transactionSchema = yup.object().shape({
  amount: yup
    .number()
    .required('Amount is required')
    .positive('Amount must be positive')
    .max(10000000, 'Amount too large'),

  category: yup
    .string()
    .required('Category is required')
    .min(2, 'Category too short'),

  description: yup
    .string()
    .required('Description is required')
    .min(3, 'Description too short')
    .max(100, 'Description too long'),

  date: yup
    .date()
    .required('Date is required')
    .max(new Date(), 'Date cannot be in the future'),

  type: yup
    .string()
    .oneOf(['income', 'expense'], 'Invalid transaction type')
    .required('Transaction type is required'),
});

export const budgetSchema = yup.object().shape({
  category: yup
    .string()
    .required('Category is required')
    .min(2, 'Category too short'),

  amount: yup
    .number()
    .required('Budget amount is required')
    .positive('Budget amount must be positive')
    .max(10000000, 'Budget amount too large'),

  period: yup
    .string()
    .oneOf(['monthly', 'weekly', 'yearly'], 'Invalid period')
    .required('Period is required'),
});

export const emiCalculationSchema = yup.object().shape({
  principal: yup
    .number()
    .required('Loan amount is required')
    .positive('Loan amount must be positive')
    .max(100000000, 'Loan amount too large'),

  rate: yup
    .number()
    .required('Interest rate is required')
    .positive('Interest rate must be positive')
    .max(50, 'Interest rate too high'),

  tenure: yup
    .number()
    .required('Tenure is required')
    .positive('Tenure must be positive')
    .integer('Tenure must be whole number')
    .max(480, 'Tenure too long'), // 40 years max
});

export const sipCalculationSchema = yup.object().shape({
  monthlyInvestment: yup
    .number()
    .required('Monthly investment is required')
    .positive('Monthly investment must be positive')
    .max(1000000, 'Monthly investment too large'),

  annualReturn: yup
    .number()
    .required('Expected return is required')
    .positive('Expected return must be positive')
    .max(50, 'Expected return too high'),

  years: yup
    .number()
    .required('Investment period is required')
    .positive('Investment period must be positive')
    .integer('Investment period must be whole number')
    .max(50, 'Investment period too long'),
});

export const fdCalculationSchema = yup.object().shape({
  principal: yup
    .number()
    .required('Deposit amount is required')
    .positive('Deposit amount must be positive')
    .max(100000000, 'Deposit amount too large'),

  rate: yup
    .number()
    .required('Interest rate is required')
    .positive('Interest rate must be positive')
    .max(20, 'Interest rate too high'),

  tenure: yup
    .number()
    .required('Tenure is required')
    .positive('Tenure must be positive')
    .integer('Tenure must be whole number')
    .max(120, 'Tenure too long'), // 10 years max

  compounding: yup
    .number()
    .oneOf([1, 2, 4, 12, 365], 'Invalid compounding frequency')
    .required('Compounding frequency is required'),
});

// Validation helper functions
export const validateField = async (
  schema: yup.AnySchema,
  value: any,
  field?: string
): Promise<string | null> => {
  try {
    if (field) {
      await schema.validateAt(field, { [field]: value });
    } else {
      await schema.validate(value);
    }
    return null;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return error.message;
    }
    return 'Validation failed';
  }
};

export const validateForm = async (
  schema: yup.AnySchema,
  data: any
): Promise<{ isValid: boolean; errors: Record<string, string> }> => {
  try {
    await schema.validate(data, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: Record<string, string> = {};
      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path] = err.message;
        }
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: 'Validation failed' } };
  }
};

// Custom validation rules
export const customValidations = {
  phoneNumber: (value: string): boolean => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(value);
  },

  panNumber: (value: string): boolean => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(value);
  },

  ifscCode: (value: string): boolean => {
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    return ifscRegex.test(value);
  },

  strongPassword: (value: string): boolean => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(value);
  },
};