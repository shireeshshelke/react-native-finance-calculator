import React from 'react';
import {render} from '@testing-library/react-native';
import {calculateEMI, calculateSIP} from '../utils/financialCalculations';

describe('Financial Calculations', () => {
  describe('EMI Calculator', () => {
    it('should calculate EMI correctly', () => {
      const result = calculateEMI(100000, 10, 12);
      expect(result.emi).toBeGreaterThan(0);
      expect(result.totalAmount).toBeGreaterThan(result.emi);
      expect(result.totalInterest).toBeGreaterThan(0);
    });

    it('should handle zero values', () => {
      const result = calculateEMI(0, 10, 12);
      expect(result.emi).toBe(0);
      expect(result.totalAmount).toBe(0);
      expect(result.totalInterest).toBe(0);
    });
  });

  describe('SIP Calculator', () => {
    it('should calculate SIP returns correctly', () => {
      const result = calculateSIP(5000, 12, 10);
      expect(result.maturityValue).toBeGreaterThan(result.totalInvestment);
      expect(result.wealthGained).toBeGreaterThan(0);
      expect(result.totalInvestment).toBe(5000 * 12 * 10);
    });

    it('should handle single year investment', () => {
      const result = calculateSIP(1000, 12, 1);
      expect(result.totalInvestment).toBe(12000);
      expect(result.maturityValue).toBeGreaterThan(12000);
    });
  });
});