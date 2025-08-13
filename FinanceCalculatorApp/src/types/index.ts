// Common Types
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Transaction Types
export type TransactionType = 'income' | 'expense';

export interface Transaction extends BaseEntity {
  amount: number;
  category: string;
  description: string;
  date: Date;
  type: TransactionType;
  paymentMethod?: string;
  tags?: string[];
  receipt?: string;
}

// Budget Types
export interface Budget extends BaseEntity {
  category: string;
  amount: number;
  spent: number;
  period: 'monthly' | 'weekly' | 'yearly';
  startDate: Date;
  endDate: Date;
  alerts: boolean;
}

// Category Types
export interface Category {
  name: string;
  color: string;
  icon: string;
  type: TransactionType;
}

// Calculator Types
export interface EMICalculation {
  principal: number;
  rate: number;
  tenure: number;
  emi: number;
  totalInterest: number;
  totalAmount: number;
  amortizationSchedule?: AmortizationEntry[];
}

export interface AmortizationEntry {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface SIPCalculation {
  monthlyInvestment: number;
  annualReturn: number;
  years: number;
  maturityValue: number;
  totalInvestment: number;
  wealthGained: number;
}

export interface FDCalculation {
  principal: number;
  rate: number;
  tenure: number;
  compoundingFrequency: number;
  maturityValue: number;
  interestEarned: number;
}

export interface LumpsumCalculation {
  principal: number;
  annualReturn: number;
  years: number;
  maturityValue: number;
  wealthGained: number;
}

export interface SWPCalculation {
  corpus: number;
  withdrawalAmount: number;
  annualReturn: number;
  years: number;
  remainingCorpus: number;
  totalWithdrawal: number;
}

export interface NPSCalculation {
  monthlyContribution: number;
  annualReturn: number;
  years: number;
  retirementCorpus: number;
  totalContribution: number;
  wealthGained: number;
}

// Scenario Types
export interface SavedScenario extends BaseEntity {
  name: string;
  type: 'emi' | 'sip' | 'fd' | 'lumpsum' | 'swp' | 'nps';
  inputs: Record<string, any>;
  results: Record<string, any>;
  notes?: string;
}

// Navigation Types
export type RootStackParamList = {
  MainTabs: undefined;
  CalculatorDetail: {
    type: 'emi' | 'sip' | 'fd' | 'lumpsum' | 'swp' | 'nps';
    scenario?: SavedScenario;
  };
  TransactionDetail: {
    transaction?: Transaction;
    mode: 'add' | 'edit';
  };
  BudgetDetail: {
    budget?: Budget;
    mode: 'add' | 'edit';
  };
};

export type TabParamList = {
  Home: undefined;
  Calculators: undefined;
  Expenses: undefined;
  Insights: undefined;
};

// Chart Data Types
export interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    color?: (opacity: number) => string;
    colors?: Array<(opacity: number) => string>;
  }[];
}

// Insights Types
export interface SpendingInsight {
  category: string;
  amount: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  comparison: number; // percentage change from previous period
}

export interface BudgetInsight {
  category: string;
  budgeted: number;
  spent: number;
  remaining: number;
  daysLeft: number;
  projectedSpending: number;
  status: 'on-track' | 'over-budget' | 'under-budget';
}

// Form Types
export interface FormField {
  label: string;
  placeholder: string;
  type: 'text' | 'number' | 'date' | 'select';
  required: boolean;
  validation?: Record<string, any>;
  options?: Array<{label: string; value: string}>;
}

// App State Types
export interface AppState {
  transactions: Transaction[];
  budgets: Budget[];
  categories: Category[];
  savedScenarios: SavedScenario[];
  isLoading: boolean;
  error: string | null;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}