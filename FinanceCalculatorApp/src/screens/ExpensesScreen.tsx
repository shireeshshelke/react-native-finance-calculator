import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useApp} from '@/services/AppContext';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import {globalStyles} from '@/styles/globalStyles';
import {Colors, Spacing, FontSize, BorderRadius} from '@/styles/theme';
import {formatCurrency} from '@/utils/financialCalculations';
import {Transaction} from '@/types';

const ExpensesScreen: React.FC = () => {
  const navigation = useNavigation();
  const {state, actions} = useApp();
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');

  const filteredTransactions = useMemo(() => {
    let transactions = state.transactions;

    if (filter !== 'all') {
      transactions = transactions.filter(t => t.type === filter);
    }

    return transactions.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [state.transactions, filter]);

  const totalStats = useMemo(() => {
    const income = state.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = state.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return { income, expenses, balance: income - expenses };
  }, [state.transactions]);

  const navigateToAddTransaction = () => {
    navigation.navigate('TransactionDetail', { mode: 'add' });
  };

  const navigateToEditTransaction = (transaction: Transaction) => {
    navigation.navigate('TransactionDetail', { 
      mode: 'edit', 
      transaction 
    });
  };

  const handleDeleteTransaction = (transaction: Transaction) => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => actions.deleteTransaction(transaction.id)
        },
      ]
    );
  };

  const renderTransaction = ({item}: {item: Transaction}) => {
    const categoryInfo = state.categories.find(c => c.name === item.category);

    return (
      <TouchableOpacity 
        onPress={() => navigateToEditTransaction(item)}
        onLongPress={() => handleDeleteTransaction(item)}
      >
        <Card style={styles.transactionCard}>
          <View style={styles.transactionContent}>
            <View style={styles.transactionLeft}>
              <View
                style={[
                  styles.categoryIcon,
                  { backgroundColor: (categoryInfo?.color || Colors.primary) + '20' }
                ]}
              >
                <Text style={styles.categoryEmoji}>
                  {categoryInfo?.icon || '💰'}
                </Text>
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionDescription} numberOfLines={1}>
                  {item.description}
                </Text>
                <Text style={styles.transactionCategory}>
                  {item.category} • {new Date(item.date).toLocaleDateString()}
                </Text>
              </View>
            </View>
            <View style={styles.transactionRight}>
              <Text
                style={[
                  styles.transactionAmount,
                  { color: item.type === 'income' ? Colors.secondary : Colors.error }
                ]}
              >
                {item.type === 'income' ? '+' : '-'}{formatCurrency(item.amount)}
              </Text>
              <Icon name="chevron-right" size={16} color={Colors.textLight} />
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="receipt-outline" size={64} color={Colors.textLight} />
      <Text style={styles.emptyTitle}>No transactions yet</Text>
      <Text style={styles.emptySubtitle}>
        Start tracking your expenses and income
      </Text>
      <Button
        title="Add First Transaction"
        onPress={navigateToAddTransaction}
        variant="primary"
        gradient
        style={styles.emptyButton}
      />
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={[globalStyles.container, globalStyles.screenPadding]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={globalStyles.h1}>Transactions</Text>
          <TouchableOpacity onPress={navigateToAddTransaction}>
            <Icon name="plus-circle" size={32} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Text style={styles.statLabel}>Balance</Text>
            <Text style={[styles.statValue, { color: totalStats.balance >= 0 ? Colors.secondary : Colors.error }]}>
              {formatCurrency(totalStats.balance)}
            </Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statLabel}>Income</Text>
            <Text style={[styles.statValue, { color: Colors.secondary }]}>
              {formatCurrency(totalStats.income)}
            </Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statLabel}>Expenses</Text>
            <Text style={[styles.statValue, { color: Colors.error }]}>
              {formatCurrency(totalStats.expenses)}
            </Text>
          </Card>
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          {(['all', 'income', 'expense'] as const).map((filterType) => (
            <TouchableOpacity
              key={filterType}
              style={[
                styles.filterButton,
                filter === filterType && styles.filterButtonActive
              ]}
              onPress={() => setFilter(filterType)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === filterType && styles.filterTextActive
                ]}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transactions List */}
        <FlatList
          data={filteredTransactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={filteredTransactions.length === 0 ? styles.emptyContainer : styles.listContainer}
          ListEmptyComponent={renderEmptyState}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    ...globalStyles.rowBetween,
    marginBottom: Spacing.xl,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  statLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  statValue: {
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
    backgroundColor: Colors.surfaceVariant,
    borderRadius: BorderRadius.md,
    padding: 4,
  },
  filterButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderRadius: BorderRadius.sm,
  },
  filterButtonActive: {
    backgroundColor: Colors.surface,
  },
  filterText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  filterTextActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: Spacing.xxxl,
  },
  emptyContainer: {
    flex: 1,
  },
  transactionCard: {
    marginBottom: Spacing.sm,
    padding: 0,
  },
  transactionContent: {
    ...globalStyles.rowBetween,
    padding: Spacing.lg,
  },
  transactionLeft: {
    ...globalStyles.row,
    flex: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  categoryEmoji: {
    fontSize: 18,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: FontSize.md,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 2,
  },
  transactionCategory: {
    fontSize: FontSize.xs,
    color: Colors.textLight,
  },
  transactionRight: {
    alignItems: 'flex-end',
    ...globalStyles.row,
  },
  transactionAmount: {
    fontSize: FontSize.md,
    fontWeight: '600',
    marginRight: Spacing.sm,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emptyTitle: {
    fontSize: FontSize.xl,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontSize: FontSize.md,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  emptyButton: {
    paddingHorizontal: Spacing.xl,
  },
});

export default ExpensesScreen;