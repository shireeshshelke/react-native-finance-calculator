import AsyncStorage from '@react-native-async-storage/async-storage';
import {Transaction, Budget, SavedScenario, AppState} from '@/types';
import {STORAGE_KEYS} from '@/constants';

export class StorageService {
  // Transaction methods
  static async getTransactions(): Promise<Transaction[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting transactions:', error);
      return [];
    }
  }

  static async saveTransaction(transaction: Transaction): Promise<void> {
    try {
      const transactions = await this.getTransactions();
      const existingIndex = transactions.findIndex(t => t.id === transaction.id);

      if (existingIndex >= 0) {
        transactions[existingIndex] = transaction;
      } else {
        transactions.push(transaction);
      }

      await AsyncStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    } catch (error) {
      console.error('Error saving transaction:', error);
      throw error;
    }
  }

  static async deleteTransaction(id: string): Promise<void> {
    try {
      const transactions = await this.getTransactions();
      const filteredTransactions = transactions.filter(t => t.id !== id);
      await AsyncStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(filteredTransactions));
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  }

  // Budget methods
  static async getBudgets(): Promise<Budget[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.BUDGETS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting budgets:', error);
      return [];
    }
  }

  static async saveBudget(budget: Budget): Promise<void> {
    try {
      const budgets = await this.getBudgets();
      const existingIndex = budgets.findIndex(b => b.id === budget.id);

      if (existingIndex >= 0) {
        budgets[existingIndex] = budget;
      } else {
        budgets.push(budget);
      }

      await AsyncStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
    } catch (error) {
      console.error('Error saving budget:', error);
      throw error;
    }
  }

  static async deleteBudget(id: string): Promise<void> {
    try {
      const budgets = await this.getBudgets();
      const filteredBudgets = budgets.filter(b => b.id !== id);
      await AsyncStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(filteredBudgets));
    } catch (error) {
      console.error('Error deleting budget:', error);
      throw error;
    }
  }

  // Saved scenarios methods
  static async getSavedScenarios(): Promise<SavedScenario[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SCENARIOS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting scenarios:', error);
      return [];
    }
  }

  static async saveScenario(scenario: SavedScenario): Promise<void> {
    try {
      const scenarios = await this.getSavedScenarios();
      const existingIndex = scenarios.findIndex(s => s.id === scenario.id);

      if (existingIndex >= 0) {
        scenarios[existingIndex] = scenario;
      } else {
        scenarios.push(scenario);
      }

      await AsyncStorage.setItem(STORAGE_KEYS.SCENARIOS, JSON.stringify(scenarios));
    } catch (error) {
      console.error('Error saving scenario:', error);
      throw error;
    }
  }

  static async deleteScenario(id: string): Promise<void> {
    try {
      const scenarios = await this.getSavedScenarios();
      const filteredScenarios = scenarios.filter(s => s.id !== id);
      await AsyncStorage.setItem(STORAGE_KEYS.SCENARIOS, JSON.stringify(filteredScenarios));
    } catch (error) {
      console.error('Error deleting scenario:', error);
      throw error;
    }
  }

  // Settings methods
  static async getSettings(): Promise<Record<string, any>> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error getting settings:', error);
      return {};
    }
  }

  static async saveSetting(key: string, value: any): Promise<void> {
    try {
      const settings = await this.getSettings();
      settings[key] = value;
      await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving setting:', error);
      throw error;
    }
  }

  // Export/Import methods
  static async exportData(): Promise<string> {
    try {
      const [transactions, budgets, scenarios, settings] = await Promise.all([
        this.getTransactions(),
        this.getBudgets(),
        this.getSavedScenarios(),
        this.getSettings(),
      ]);

      const exportData = {
        transactions,
        budgets,
        scenarios,
        settings,
        exportDate: new Date().toISOString(),
        version: '1.0',
      };

      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      console.error('Error exporting data:', error);
      throw error;
    }
  }

  static async importData(jsonData: string): Promise<void> {
    try {
      const data = JSON.parse(jsonData);

      if (data.transactions) {
        await AsyncStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(data.transactions));
      }

      if (data.budgets) {
        await AsyncStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(data.budgets));
      }

      if (data.scenarios) {
        await AsyncStorage.setItem(STORAGE_KEYS.SCENARIOS, JSON.stringify(data.scenarios));
      }

      if (data.settings) {
        await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings));
      }
    } catch (error) {
      console.error('Error importing data:', error);
      throw error;
    }
  }

  // Clear all data
  static async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.TRANSACTIONS,
        STORAGE_KEYS.BUDGETS,
        STORAGE_KEYS.SCENARIOS,
        STORAGE_KEYS.SETTINGS,
      ]);
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  }
}