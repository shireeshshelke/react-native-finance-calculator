// Financial Calculation Utilities

/**
 * Calculate EMI for a loan
 * Formula: EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
 */
export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureMonths: number
): {
  emi: number;
  totalAmount: number;
  totalInterest: number;
} {
  const monthlyRate = annualRate / (12 * 100);
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  const totalAmount = emi * tenureMonths;
  const totalInterest = totalAmount - principal;

  return {
    emi: Math.round(emi),
    totalAmount: Math.round(totalAmount),
    totalInterest: Math.round(totalInterest),
  };
}

/**
 * Generate amortization schedule for a loan
 */
export function generateAmortizationSchedule(
  principal: number,
  annualRate: number,
  tenureMonths: number,
  emi: number
): Array<{
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}> {
  const monthlyRate = annualRate / (12 * 100);
  let remainingBalance = principal;
  const schedule = [];

  for (let month = 1; month <= tenureMonths; month++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = emi - interestPayment;
    remainingBalance = remainingBalance - principalPayment;

    schedule.push({
      month,
      emi: Math.round(emi),
      principal: Math.round(principalPayment),
      interest: Math.round(interestPayment),
      balance: Math.round(Math.max(0, remainingBalance)),
    });
  }

  return schedule;
}

/**
 * Calculate SIP returns
 * Formula: M = P × ((1 + i)^n – 1) / i × (1 + i)
 */
export function calculateSIP(
  monthlyInvestment: number,
  annualReturn: number,
  years: number
): {
  maturityValue: number;
  totalInvestment: number;
  wealthGained: number;
} {
  const monthlyReturn = annualReturn / (12 * 100);
  const months = years * 12;

  const maturityValue =
    monthlyInvestment *
    (((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn) *
      (1 + monthlyReturn));

  const totalInvestment = monthlyInvestment * months;
  const wealthGained = maturityValue - totalInvestment;

  return {
    maturityValue: Math.round(maturityValue),
    totalInvestment: Math.round(totalInvestment),
    wealthGained: Math.round(wealthGained),
  };
}

/**
 * Calculate Step-up SIP returns
 */
export function calculateStepUpSIP(
  initialMonthlyInvestment: number,
  annualReturn: number,
  years: number,
  stepUpPercentage: number
): {
  maturityValue: number;
  totalInvestment: number;
  wealthGained: number;
} {
  const monthlyReturn = annualReturn / (12 * 100);
  let currentInvestment = initialMonthlyInvestment;
  let totalMaturityValue = 0;
  let totalInvestment = 0;

  for (let year = 0; year < years; year++) {
    // Calculate SIP for current year
    const yearlyResult = calculateSIP(currentInvestment, annualReturn, 1);

    // Compound the existing value for one more year
    const existingValueGrowth = totalMaturityValue * Math.pow(1 + annualReturn / 100, 1);

    totalMaturityValue = existingValueGrowth + yearlyResult.maturityValue;
    totalInvestment += yearlyResult.totalInvestment;

    // Step up for next year
    if (year < years - 1) {
      currentInvestment = currentInvestment * (1 + stepUpPercentage / 100);
    }
  }

  const wealthGained = totalMaturityValue - totalInvestment;

  return {
    maturityValue: Math.round(totalMaturityValue),
    totalInvestment: Math.round(totalInvestment),
    wealthGained: Math.round(wealthGained),
  };
}

/**
 * Calculate Fixed Deposit maturity
 * Formula: A = P(1 + r/n)^(nt)
 */
export function calculateFD(
  principal: number,
  annualRate: number,
  tenureMonths: number,
  compoundingFrequency: number = 4
): {
  maturityValue: number;
  interestEarned: number;
} {
  const years = tenureMonths / 12;
  const rate = annualRate / 100;

  const maturityValue =
    principal * Math.pow(1 + rate / compoundingFrequency, compoundingFrequency * years);

  const interestEarned = maturityValue - principal;

  return {
    maturityValue: Math.round(maturityValue),
    interestEarned: Math.round(interestEarned),
  };
}

/**
 * Calculate Lumpsum investment returns
 * Formula: A = P(1 + r)^t
 */
export function calculateLumpsum(
  principal: number,
  annualReturn: number,
  years: number
): {
  maturityValue: number;
  wealthGained: number;
} {
  const maturityValue = principal * Math.pow(1 + annualReturn / 100, years);
  const wealthGained = maturityValue - principal;

  return {
    maturityValue: Math.round(maturityValue),
    wealthGained: Math.round(wealthGained),
  };
}

/**
 * Calculate SWP (Systematic Withdrawal Plan)
 */
export function calculateSWP(
  corpus: number,
  monthlyWithdrawal: number,
  annualReturn: number,
  years: number
): {
  remainingCorpus: number;
  totalWithdrawal: number;
  monthsLasted: number;
} {
  const monthlyReturn = annualReturn / (12 * 100);
  const totalMonths = years * 12;
  let currentCorpus = corpus;
  let monthsLasted = 0;

  for (let month = 1; month <= totalMonths; month++) {
    // Add monthly return
    currentCorpus = currentCorpus * (1 + monthlyReturn);

    // Subtract withdrawal
    currentCorpus = currentCorpus - monthlyWithdrawal;

    if (currentCorpus <= 0) {
      monthsLasted = month;
      currentCorpus = 0;
      break;
    }
    monthsLasted = month;
  }

  const totalWithdrawal = monthlyWithdrawal * monthsLasted;

  return {
    remainingCorpus: Math.round(Math.max(0, currentCorpus)),
    totalWithdrawal: Math.round(totalWithdrawal),
    monthsLasted,
  };
}

/**
 * Calculate NPS (National Pension Scheme) returns
 */
export function calculateNPS(
  monthlyContribution: number,
  annualReturn: number,
  years: number,
  annuityRate: number = 6
): {
  retirementCorpus: number;
  totalContribution: number;
  wealthGained: number;
  monthlyPension: number;
} {
  // Calculate corpus using SIP formula
  const sipResult = calculateSIP(monthlyContribution, annualReturn, years);

  // Calculate pension from 40% corpus (as per NPS rules)
  const annuityCorpus = sipResult.maturityValue * 0.4;
  const monthlyPension = (annuityCorpus * annuityRate) / (100 * 12);

  return {
    retirementCorpus: sipResult.maturityValue,
    totalContribution: sipResult.totalInvestment,
    wealthGained: sipResult.wealthGained,
    monthlyPension: Math.round(monthlyPension),
  };
}

/**
 * Calculate CAGR (Compound Annual Growth Rate)
 */
export function calculateCAGR(
  initialValue: number,
  finalValue: number,
  years: number
): number {
  return ((Math.pow(finalValue / initialValue, 1 / years) - 1) * 100);
}

/**
 * Format currency for display
 */
export function formatCurrency(
  amount: number,
  currency: string = '₹',
  decimals: number = 0
): string {
  return `${currency}${amount.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

/**
 * Format large numbers with K, L, Cr suffixes
 */
export function formatLargeNumber(num: number): string {
  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(2)}Cr`;
  } else if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2)}L`;
  } else if (num >= 1000) {
    return `₹${(num / 1000).toFixed(1)}K`;
  }
  return `₹${num.toLocaleString('en-IN')}`;
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

/**
 * Convert months to years and months format
 */
export function formatTenure(months: number): string {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  } else if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  } else {
    return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  }
}