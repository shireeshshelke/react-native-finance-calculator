export const CATEGORIES: Array<{name: string; color: string; icon: string; type: 'income' | 'expense'}> = [
  // Expense Categories
  {name: 'Food & Dining', color: '#f59e0b', icon: '🍽️', type: 'expense'},
  {name: 'Transportation', color: '#8b5cf6', icon: '🚗', type: 'expense'},
  {name: 'Groceries', color: '#10b981', icon: '🛒', type: 'expense'},
  {name: 'Entertainment', color: '#f97316', icon: '🎬', type: 'expense'},
  {name: 'Utilities', color: '#06b6d4', icon: '⚡', type: 'expense'},
  {name: 'Healthcare', color: '#84cc16', icon: '🏥', type: 'expense'},
  {name: 'Shopping', color: '#ec4899', icon: '🛍️', type: 'expense'},
  {name: 'Education', color: '#3b82f6', icon: '📚', type: 'expense'},
  {name: 'Travel', color: '#6366f1', icon: '✈️', type: 'expense'},
  {name: 'Insurance', color: '#14b8a6', icon: '🛡️', type: 'expense'},
  {name: 'Rent', color: '#f43f5e', icon: '🏠', type: 'expense'},
  {name: 'Other', color: '#64748b', icon: '📦', type: 'expense'},

  // Income Categories  
  {name: 'Salary', color: '#22c55e', icon: '💼', type: 'income'},
  {name: 'Business', color: '#10b981', icon: '🏢', type: 'income'},
  {name: 'Investment', color: '#3b82f6', icon: '📈', type: 'income'},
  {name: 'Freelance', color: '#8b5cf6', icon: '💻', type: 'income'},
  {name: 'Other Income', color: '#06b6d4', icon: '💰', type: 'income'},
];

export const PAYMENT_METHODS = [
  {label: 'Cash', value: 'cash', icon: '💵'},
  {label: 'Credit Card', value: 'credit_card', icon: '💳'},
  {label: 'Debit Card', value: 'debit_card', icon: '💳'},
  {label: 'UPI', value: 'upi', icon: '📱'},
  {label: 'Net Banking', value: 'net_banking', icon: '🏦'},
  {label: 'Wallet', value: 'wallet', icon: '📱'},
];

export const CALCULATOR_TYPES = [
  {
    id: 'emi',
    name: 'EMI Calculator',
    icon: '💳',
    description: 'Calculate loan EMIs and amortization',
    color: '#3b82f6',
  },
  {
    id: 'sip',
    name: 'SIP Calculator',
    icon: '📈',
    description: 'Plan systematic investment returns',
    color: '#10b981',
  },
  {
    id: 'fd',
    name: 'FD Calculator',
    icon: '🏦',
    description: 'Fixed deposit maturity calculator',
    color: '#f59e0b',
  },
  {
    id: 'lumpsum',
    name: 'Lumpsum Calculator',
    icon: '💰',
    description: 'One-time investment growth',
    color: '#8b5cf6',
  },
  {
    id: 'swp',
    name: 'SWP Calculator',
    icon: '🔄',
    description: 'Systematic withdrawal planning',
    color: '#f97316',
  },
  {
    id: 'nps',
    name: 'NPS Calculator',
    icon: '🏛️',
    description: 'National pension scheme projections',
    color: '#14b8a6',
  },
];

export const CURRENCY = {
  symbol: '₹',
  code: 'INR',
  name: 'Indian Rupee',
};

export const DATE_FORMATS = {
  display: 'DD MMM YYYY',
  input: 'YYYY-MM-DD',
  api: 'YYYY-MM-DD',
};

export const BUDGET_PERIODS = [
  {label: 'Monthly', value: 'monthly'},
  {label: 'Weekly', value: 'weekly'},
  {label: 'Yearly', value: 'yearly'},
];

export const COMPOUNDING_FREQUENCIES = [
  {label: 'Annually', value: 1},
  {label: 'Semi-annually', value: 2},
  {label: 'Quarterly', value: 4},
  {label: 'Monthly', value: 12},
  {label: 'Daily', value: 365},
];

export const DEFAULT_VALUES = {
  EMI: {
    principal: 1000000,
    rate: 8.5,
    tenure: 240, // months
  },
  SIP: {
    monthlyInvestment: 5000,
    annualReturn: 12,
    years: 10,
  },
  FD: {
    principal: 100000,
    rate: 6.5,
    tenure: 12, // months
    compounding: 4,
  },
  LUMPSUM: {
    principal: 100000,
    annualReturn: 12,
    years: 5,
  },
  SWP: {
    corpus: 1000000,
    withdrawalAmount: 8000,
    annualReturn: 8,
    years: 15,
  },
  NPS: {
    monthlyContribution: 5000,
    annualReturn: 10,
    years: 30,
  },
};

export const VALIDATION_MESSAGES = {
  required: 'This field is required',
  min: 'Value must be greater than {min}',
  max: 'Value must be less than {max}',
  email: 'Please enter a valid email',
  number: 'Please enter a valid number',
  positive: 'Value must be positive',
};

export const ANIMATION_DURATION = 300;
export const DEBOUNCE_DELAY = 500;

export const STORAGE_KEYS = {
  TRANSACTIONS: '@transactions',
  BUDGETS: '@budgets',
  SCENARIOS: '@scenarios',
  SETTINGS: '@settings',
  USER_PREFERENCES: '@user_preferences',
};

export const CHART_COLORS = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#f97316',
  '#14b8a6',
  '#ec4899',
  '#6366f1',
  '#84cc16',
];