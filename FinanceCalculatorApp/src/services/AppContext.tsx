import React, {createContext, useContext, useReducer, useEffect, ReactNode} from 'react';
import {Transaction, Budget, SavedScenario, Category, AppState} from '@/types';
import {StorageService} from './StorageService';
import {CATEGORIES} from '@/constants';

// Action types
type AppAction =
  | {type: 'SET_LOADING'; payload: boolean}
  | {type: 'SET_ERROR'; payload: string | null}
  | {type: 'LOAD_DATA'; payload: {transactions: Transaction[]; budgets: Budget[]; scenarios: SavedScenario[]}}
  | {type: 'ADD_TRANSACTION'; payload: Transaction}
  | {type: 'UPDATE_TRANSACTION'; payload: Transaction}
  | {type: 'DELETE_TRANSACTION'; payload: string}
  | {type: 'ADD_BUDGET'; payload: Budget}
  | {type: 'UPDATE_BUDGET'; payload: Budget}
  | {type: 'DELETE_BUDGET'; payload: string}
  | {type: 'ADD_SCENARIO'; payload: SavedScenario}
  | {type: 'UPDATE_SCENARIO'; payload: SavedScenario}
  | {type: 'DELETE_SCENARIO'; payload: string};

// Initial state
const initialState: AppState = {
  transactions: [],
  budgets: [],
  categories: CATEGORIES,
  savedScenarios: [],
  isLoading: false,
  error: null,
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return {...state, isLoading: action.payload};

    case 'SET_ERROR':
      return {...state, error: action.payload};

    case 'LOAD_DATA':
      return {
        ...state,
        transactions: action.payload.transactions,
        budgets: action.payload.budgets,
        savedScenarios: action.payload.scenarios,
      };

    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };

    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };

    case 'ADD_BUDGET':
      return {
        ...state,
        budgets: [...state.budgets, action.payload],
      };

    case 'UPDATE_BUDGET':
      return {
        ...state,
        budgets: state.budgets.map(b =>
          b.id === action.payload.id ? action.payload : b
        ),
      };

    case 'DELETE_BUDGET':
      return {
        ...state,
        budgets: state.budgets.filter(b => b.id !== action.payload),
      };

    case 'ADD_SCENARIO':
      return {
        ...state,
        savedScenarios: [...state.savedScenarios, action.payload],
      };

    case 'UPDATE_SCENARIO':
      return {
        ...state,
        savedScenarios: state.savedScenarios.map(s =>
          s.id === action.payload.id ? action.payload : s
        ),
      };

    case 'DELETE_SCENARIO':
      return {
        ...state,
        savedScenarios: state.savedScenarios.filter(s => s.id !== action.payload),
      };

    default:
      return state;
  }
}

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  actions: {
    loadData: () => Promise<void>;
    addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    updateTransaction: (transaction: Transaction) => Promise<void>;
    deleteTransaction: (id: string) => Promise<void>;
    addBudget: (budget: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    updateBudget: (budget: Budget) => Promise<void>;
    deleteBudget: (id: string) => Promise<void>;
    addScenario: (scenario: Omit<SavedScenario, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    updateScenario: (scenario: SavedScenario) => Promise<void>;
    deleteScenario: (id: string) => Promise<void>;
  };
} | null>(null);

// Provider component
export function AppProvider({children}: {children: ReactNode}) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data on app start
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      dispatch({type: 'SET_LOADING', payload: true});

      const [transactions, budgets, scenarios] = await Promise.all([
        StorageService.getTransactions(),
        StorageService.getBudgets(),
        StorageService.getSavedScenarios(),
      ]);

      dispatch({
        type: 'LOAD_DATA',
        payload: {transactions, budgets, scenarios},
      });
    } catch (error) {
      dispatch({type: 'SET_ERROR', payload: 'Failed to load data'});
      console.error('Error loading data:', error);
    } finally {
      dispatch({type: 'SET_LOADING', payload: false});
    }
  };

  const addTransaction = async (transactionData: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const transaction: Transaction = {
        ...transactionData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await StorageService.saveTransaction(transaction);
      dispatch({type: 'ADD_TRANSACTION', payload: transaction});
    } catch (error) {
      dispatch({type: 'SET_ERROR', payload: 'Failed to save transaction'});
      console.error('Error adding transaction:', error);
    }
  };

  const updateTransaction = async (transaction: Transaction) => {
    try {
      const updatedTransaction = {
        ...transaction,
        updatedAt: new Date(),
      };

      await StorageService.saveTransaction(updatedTransaction);
      dispatch({type: 'UPDATE_TRANSACTION', payload: updatedTransaction});
    } catch (error) {
      dispatch({type: 'SET_ERROR', payload: 'Failed to update transaction'});
      console.error('Error updating transaction:', error);
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await StorageService.deleteTransaction(id);
      dispatch({type: 'DELETE_TRANSACTION', payload: id});
    } catch (error) {
      dispatch({type: 'SET_ERROR', payload: 'Failed to delete transaction'});
      console.error('Error deleting transaction:', error);
    }
  };

  const addBudget = async (budgetData: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const budget: Budget = {
        ...budgetData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await StorageService.saveBudget(budget);
      dispatch({type: 'ADD_BUDGET', payload: budget});
    } catch (error) {
      dispatch({type: 'SET_ERROR', payload: 'Failed to save budget'});
      console.error('Error adding budget:', error);
    }
  };

  const updateBudget = async (budget: Budget) => {
    try {
      const updatedBudget = {
        ...budget,
        updatedAt: new Date(),
      };

      await StorageService.saveBudget(updatedBudget);
      dispatch({type: 'UPDATE_BUDGET', payload: updatedBudget});
    } catch (error) {
      dispatch({type: 'SET_ERROR', payload: 'Failed to update budget'});
      console.error('Error updating budget:', error);
    }
  };

  const deleteBudget = async (id: string) => {
    try {
      await StorageService.deleteBudget(id);
      dispatch({type: 'DELETE_BUDGET', payload: id});
    } catch (error) {
      dispatch({type: 'SET_ERROR', payload: 'Failed to delete budget'});
      console.error('Error deleting budget:', error);
    }
  };

  const addScenario = async (scenarioData: Omit<SavedScenario, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const scenario: SavedScenario = {
        ...scenarioData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await StorageService.saveScenario(scenario);
      dispatch({type: 'ADD_SCENARIO', payload: scenario});
    } catch (error) {
      dispatch({type: 'SET_ERROR', payload: 'Failed to save scenario'});
      console.error('Error adding scenario:', error);
    }
  };

  const updateScenario = async (scenario: SavedScenario) => {
    try {
      const updatedScenario = {
        ...scenario,
        updatedAt: new Date(),
      };

      await StorageService.saveScenario(updatedScenario);
      dispatch({type: 'UPDATE_SCENARIO', payload: updatedScenario});
    } catch (error) {
      dispatch({type: 'SET_ERROR', payload: 'Failed to update scenario'});
      console.error('Error updating scenario:', error);
    }
  };

  const deleteScenario = async (id: string) => {
    try {
      await StorageService.deleteScenario(id);
      dispatch({type: 'DELETE_SCENARIO', payload: id});
    } catch (error) {
      dispatch({type: 'SET_ERROR', payload: 'Failed to delete scenario'});
      console.error('Error deleting scenario:', error);
    }
  };

  const actions = {
    loadData,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addBudget,
    updateBudget,
    deleteBudget,
    addScenario,
    updateScenario,
    deleteScenario,
  };

  return (
    <AppContext.Provider value={{state, dispatch, actions}}>
      {children}
    </AppContext.Provider>
  );
}

// Hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}