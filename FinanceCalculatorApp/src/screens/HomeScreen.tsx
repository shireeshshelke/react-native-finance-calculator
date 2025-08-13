import React, {useMemo} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

import {useApp} from '@/services/AppContext';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import {Colors, Spacing, FontSize} from '@/styles/theme';
import {globalStyles} from '@/styles/globalStyles';
import {formatCurrency, formatLargeNumber} from '@/utils/financialCalculations';
import {CALCULATOR_TYPES} from '@/constants';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const {state} = useApp();

  // Calculate dashboard metrics
  const dashboardMetrics = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyTransactions = state.transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return (
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      );
    });

    const monthlyIncome = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyExpenses = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalBudget = state.budgets.reduce((sum, b) => sum + b.amount, 0);
    const budgetUsed = (monthlyExpenses / totalBudget) * 100;

    const safeToSpend = monthlyIncome - monthlyExpenses;
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysPassed = new Date().getDate();
    const daysRemaining = daysInMonth - daysPassed;

    return {
      safeToSpend,
      monthlyIncome,
      monthlyExpenses,
      budgetUsed: isNaN(budgetUsed) ? 0 : budgetUsed,
      daysRemaining,
      totalBudget,
    };
  }, [state.transactions, state.budgets]);

  const recentTransactions = useMemo(() => {
    return state.transactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [state.transactions]);

  const quickCalculators = CALCULATOR_TYPES.slice(0, 4);

  const navigateToCalculator = (type: string) => {
    navigation.navigate('CalculatorDetail', {type});
  };

  const navigateToAddTransaction = () => {
    navigation.navigate('TransactionDetail', {mode: 'add'});
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ScrollView
        style={globalStyles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning!</Text>
            <Text style={styles.date}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Icon name="account-circle" size={40} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Safe to Spend Card */}
        <Card style={styles.safeToSpendCard} elevated>
          <View style={styles.safeToSpendHeader}>
            <Text style={styles.safeToSpendLabel}>Safe to Spend</Text>
            <Icon name="information" size={20} color={Colors.textLight} />
          </View>
          <Text style={styles.safeToSpendAmount}>
            {formatLargeNumber(dashboardMetrics.safeToSpend)}
          </Text>
          <Text style={styles.safeToSpendSubtitle}>
            Available this month • {dashboardMetrics.daysRemaining} days left
          </Text>
        </Card>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <Card style={styles.statCard}>
            <Icon name="trending-up" size={24} color={Colors.secondary} />
            <Text style={styles.statValue}>
              {formatCurrency(dashboardMetrics.monthlyIncome)}
            </Text>
            <Text style={styles.statLabel}>Income</Text>
          </Card>

          <Card style={styles.statCard}>
            <Icon name="trending-down" size={24} color={Colors.error} />
            <Text style={styles.statValue}>
              {formatCurrency(dashboardMetrics.monthlyExpenses)}
            </Text>
            <Text style={styles.statLabel}>Expenses</Text>
          </Card>

          <Card style={styles.statCard}>
            <Icon name="chart-donut" size={24} color={Colors.accent} />
            <Text style={styles.statValue}>
              {dashboardMetrics.budgetUsed.toFixed(0)}%
            </Text>
            <Text style={styles.statLabel}>Budget Used</Text>
          </Card>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <Button
              title="Add Expense"
              onPress={navigateToAddTransaction}
              variant="primary"
              size="medium"
              gradient
              icon={<Icon name="plus" size={20} color={Colors.surface} style={{marginRight: 8}} />}
              style={styles.actionButton}
            />
            <Button
              title="View Insights"
              onPress={() => navigation.navigate('Insights')}
              variant="outline"
              size="medium"
              style={styles.actionButton}
            />
          </View>
        </View>

        {/* Quick Calculators */}
        <View style={styles.section}>
          <View style={globalStyles.rowBetween}>
            <Text style={styles.sectionTitle}>Quick Calculators</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Calculators')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.calculatorGrid}>
            {quickCalculators.map((calc) => (
              <TouchableOpacity
                key={calc.id}
                style={[styles.calculatorCard, {backgroundColor: calc.color + '15'}]}
                onPress={() => navigateToCalculator(calc.id)}
              >
                <Text style={styles.calculatorIcon}>{calc.icon}</Text>
                <Text style={styles.calculatorName}>{calc.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={globalStyles.rowBetween}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Expenses')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <Card>
            {recentTransactions.length === 0 ? (
              <View style={styles.emptyState}>
                <Icon name="receipt" size={48} color={Colors.textLight} />
                <Text style={styles.emptyStateText}>No transactions yet</Text>
                <Text style={styles.emptyStateSubtext}>
                  Add your first transaction to get started
                </Text>
              </View>
            ) : (
              recentTransactions.map((transaction, index) => (
                <View
                  key={transaction.id}
                  style={[
                    styles.transactionItem,
                    index < recentTransactions.length - 1 && styles.transactionItemBorder,
                  ]}
                >
                  <View style={styles.transactionLeft}>
                    <View
                      style={[
                        styles.transactionIcon,
                        {
                          backgroundColor:
                            transaction.type === 'income'
                              ? Colors.secondary + '20'
                              : Colors.error + '20',
                        },
                      ]}
                    >
                      <Icon
                        name={transaction.type === 'income' ? 'arrow-down' : 'arrow-up'}
                        size={16}
                        color={transaction.type === 'income' ? Colors.secondary : Colors.error}
                      />
                    </View>
                    <View>
                      <Text style={styles.transactionDescription} numberOfLines={1}>
                        {transaction.description}
                      </Text>
                      <Text style={styles.transactionCategory}>
                        {transaction.category}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={[
                      styles.transactionAmount,
                      {
                        color:
                          transaction.type === 'income' ? Colors.secondary : Colors.error,
                      },
                    ]}
                  >
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </Text>
                </View>
              ))
            )}
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  header: {
    ...globalStyles.rowBetween,
    marginBottom: Spacing.xl,
  },
  greeting: {
    fontSize: FontSize.xl,
    fontWeight: '600',
    color: Colors.text,
  },
  date: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  profileButton: {
    padding: Spacing.xs,
  },
  safeToSpendCard: {
    marginBottom: Spacing.xl,
    backgroundColor: Colors.primary + '08',
    borderWidth: 1,
    borderColor: Colors.primary + '20',
  },
  safeToSpendHeader: {
    ...globalStyles.rowBetween,
    marginBottom: Spacing.sm,
  },
  safeToSpendLabel: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  safeToSpendAmount: {
    fontSize: FontSize.huge,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  safeToSpendSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textLight,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    marginHorizontal: Spacing.xs,
  },
  statValue: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
    marginTop: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.textLight,
    marginTop: Spacing.xs,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  seeAll: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  actionButton: {
    flex: 1,
  },
  calculatorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  calculatorCard: {
    width: '48%',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  calculatorIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  calculatorName: {
    fontSize: FontSize.sm,
    fontWeight: '500',
    color: Colors.text,
    textAlign: 'center',
  },
  transactionItem: {
    ...globalStyles.rowBetween,
    paddingVertical: Spacing.md,
  },
  transactionItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.outline,
  },
  transactionLeft: {
    ...globalStyles.row,
    flex: 1,
  },
  transactionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  transactionDescription: {
    fontSize: FontSize.md,
    fontWeight: '500',
    color: Colors.text,
  },
  transactionCategory: {
    fontSize: FontSize.xs,
    color: Colors.textLight,
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxxl,
  },
  emptyStateText: {
    fontSize: FontSize.lg,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginTop: Spacing.md,
  },
  emptyStateSubtext: {
    fontSize: FontSize.sm,
    color: Colors.textLight,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
});

export default HomeScreen;