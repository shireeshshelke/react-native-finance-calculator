import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {TabParamList, RootStackParamList} from '@/types';
import {Colors} from '@/styles/theme';

// Import screens
import HomeScreen from '@/screens/HomeScreen';
import CalculatorsScreen from '@/screens/CalculatorsScreen';
import ExpensesScreen from '@/screens/ExpensesScreen';
import InsightsScreen from '@/screens/InsightsScreen';
import CalculatorDetailScreen from '@/screens/CalculatorDetailScreen';
import TransactionDetailScreen from '@/screens/TransactionDetailScreen';
import BudgetDetailScreen from '@/screens/BudgetDetailScreen';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Calculators':
              iconName = focused ? 'calculator' : 'calculator-variant-outline';
              break;
            case 'Expenses':
              iconName = focused ? 'wallet' : 'wallet-outline';
              break;
            case 'Insights':
              iconName = focused ? 'chart-line' : 'chart-line-variant';
              break;
            default:
              iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopWidth: 1,
          borderTopColor: Colors.outline,
          paddingVertical: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Calculators"
        component={CalculatorsScreen}
        options={{
          tabBarLabel: 'Calculators',
        }}
      />
      <Tab.Screen
        name="Expenses"
        component={ExpensesScreen}
        options={{
          tabBarLabel: 'Expenses',
        }}
      />
      <Tab.Screen
        name="Insights"
        component={InsightsScreen}
        options={{
          tabBarLabel: 'Insights',
        }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.surface,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        cardStyle: {
          backgroundColor: Colors.background,
        },
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CalculatorDetail"
        component={CalculatorDetailScreen}
        options={({route}) => ({
          title: getCalculatorTitle(route.params.type),
          headerBackTitle: 'Back',
        })}
      />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetailScreen}
        options={({route}) => ({
          title: route.params.mode === 'add' ? 'Add Transaction' : 'Edit Transaction',
          headerBackTitle: 'Back',
        })}
      />
      <Stack.Screen
        name="BudgetDetail"
        component={BudgetDetailScreen}
        options={({route}) => ({
          title: route.params.mode === 'add' ? 'Add Budget' : 'Edit Budget',
          headerBackTitle: 'Back',
        })}
      />
    </Stack.Navigator>
  );
}

function getCalculatorTitle(type: string): string {
  switch (type) {
    case 'emi':
      return 'EMI Calculator';
    case 'sip':
      return 'SIP Calculator';
    case 'fd':
      return 'FD Calculator';
    case 'lumpsum':
      return 'Lumpsum Calculator';
    case 'swp':
      return 'SWP Calculator';
    case 'nps':
      return 'NPS Calculator';
    default:
      return 'Calculator';
  }
}

export default AppNavigator;