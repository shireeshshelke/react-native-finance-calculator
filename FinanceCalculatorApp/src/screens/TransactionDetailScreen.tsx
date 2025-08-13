import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';

import {RootStackParamList, Transaction} from '@/types';
import {useApp} from '@/services/AppContext';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import {globalStyles} from '@/styles/globalStyles';
import {Spacing} from '@/styles/theme';
import {CATEGORIES} from '@/constants';

type TransactionDetailRouteProp = RouteProp<RootStackParamList, 'TransactionDetail'>;

const TransactionDetailScreen: React.FC = () => {
  const route = useRoute<TransactionDetailRouteProp>();
  const navigation = useNavigation();
  const {actions} = useApp();

  const {mode, transaction} = route.params;

  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date(),
    type: 'expense' as 'income' | 'expense',
  });

  useEffect(() => {
    if (mode === 'edit' && transaction) {
      setFormData({
        amount: transaction.amount.toString(),
        category: transaction.category,
        description: transaction.description,
        date: new Date(transaction.date),
        type: transaction.type,
      });
    }
  }, [mode, transaction]);

  const handleSave = async () => {
    if (!formData.amount || !formData.category || !formData.description) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    try {
      const transactionData = {
        ...formData,
        amount,
      };

      if (mode === 'add') {
        await actions.addTransaction(transactionData);
      } else if (mode === 'edit' && transaction) {
        await actions.updateTransaction({
          ...transaction,
          ...transactionData,
        });
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save transaction');
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ScrollView 
        style={[globalStyles.container, globalStyles.screenPadding]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Card>
          <Input
            label="Amount"
            value={formData.amount}
            onChangeText={(value) => setFormData(prev => ({...prev, amount: value}))}
            keyboardType="numeric"
            placeholder="Enter amount"
            required
          />

          <Input
            label="Description"
            value={formData.description}
            onChangeText={(value) => setFormData(prev => ({...prev, description: value}))}
            placeholder="Enter description"
            required
          />

          {/* Simple category selection - in a real app, you'd want a picker */}
          <Input
            label="Category"
            value={formData.category}
            onChangeText={(value) => setFormData(prev => ({...prev, category: value}))}
            placeholder="Enter category"
            required
          />
        </Card>

        <Button
          title={mode === 'add' ? 'Add Transaction' : 'Update Transaction'}
          onPress={handleSave}
          variant="primary"
          gradient
          style={styles.saveButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: Spacing.xxxl,
  },
  saveButton: {
    marginTop: Spacing.lg,
  },
});

export default TransactionDetailScreen;