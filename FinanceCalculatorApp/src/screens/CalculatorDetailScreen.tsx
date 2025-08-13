import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute, RouteProp} from '@react-navigation/native';

import {RootStackParamList} from '@/types';
import {useApp} from '@/services/AppContext';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import {globalStyles} from '@/styles/globalStyles';
import {Colors, Spacing, FontSize} from '@/styles/theme';
import {
  calculateEMI,
  calculateSIP,
  calculateFD,
  calculateLumpsum,
  calculateSWP,
  calculateNPS,
  formatCurrency,
  formatLargeNumber,
} from '@/utils/financialCalculations';
import {DEFAULT_VALUES} from '@/constants';

type CalculatorDetailRouteProp = RouteProp<RootStackParamList, 'CalculatorDetail'>;

const CalculatorDetailScreen: React.FC = () => {
  const route = useRoute<CalculatorDetailRouteProp>();
  const {actions} = useApp();
  const {type} = route.params;

  // State for different calculator types
  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [results, setResults] = useState<Record<string, any>>({});

  useEffect(() => {
    // Initialize with default values
    setInputs(DEFAULT_VALUES[type.toUpperCase() as keyof typeof DEFAULT_VALUES] || {});
  }, [type]);

  useEffect(() => {
    // Calculate results whenever inputs change
    calculateResults();
  }, [inputs]);

  const updateInput = (key: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({...prev, [key]: numValue}));
  };

  const calculateResults = () => {
    try {
      switch (type) {
        case 'emi':
          if (inputs.principal && inputs.rate && inputs.tenure) {
            const result = calculateEMI(inputs.principal, inputs.rate, inputs.tenure);
            setResults(result);
          }
          break;
        case 'sip':
          if (inputs.monthlyInvestment && inputs.annualReturn && inputs.years) {
            const result = calculateSIP(inputs.monthlyInvestment, inputs.annualReturn, inputs.years);
            setResults(result);
          }
          break;
        case 'fd':
          if (inputs.principal && inputs.rate && inputs.tenure) {
            const result = calculateFD(inputs.principal, inputs.rate, inputs.tenure, inputs.compounding || 4);
            setResults(result);
          }
          break;
        case 'lumpsum':
          if (inputs.principal && inputs.annualReturn && inputs.years) {
            const result = calculateLumpsum(inputs.principal, inputs.annualReturn, inputs.years);
            setResults(result);
          }
          break;
        case 'swp':
          if (inputs.corpus && inputs.withdrawalAmount && inputs.annualReturn && inputs.years) {
            const result = calculateSWP(inputs.corpus, inputs.withdrawalAmount, inputs.annualReturn, inputs.years);
            setResults(result);
          }
          break;
        case 'nps':
          if (inputs.monthlyContribution && inputs.annualReturn && inputs.years) {
            const result = calculateNPS(inputs.monthlyContribution, inputs.annualReturn, inputs.years);
            setResults(result);
          }
          break;
      }
    } catch (error) {
      console.error('Calculation error:', error);
    }
  };

  const saveScenario = () => {
    const scenarioName = `${type.toUpperCase()} - ${new Date().toLocaleDateString()}`;
    actions.addScenario({
      name: scenarioName,
      type: type as any,
      inputs,
      results,
    });
    Alert.alert('Success', 'Scenario saved successfully!');
  };

  const renderEMICalculator = () => (
    <>
      <Card style={styles.inputCard}>
        <Text style={styles.cardTitle}>Loan Details</Text>
        <Input
          label="Loan Amount (₹)"
          value={inputs.principal?.toString() || ''}
          onChangeText={(value) => updateInput('principal', value)}
          keyboardType="numeric"
          placeholder="Enter loan amount"
        />
        <Input
          label="Interest Rate (% per annum)"
          value={inputs.rate?.toString() || ''}
          onChangeText={(value) => updateInput('rate', value)}
          keyboardType="numeric"
          placeholder="Enter interest rate"
        />
        <Input
          label="Loan Tenure (Months)"
          value={inputs.tenure?.toString() || ''}
          onChangeText={(value) => updateInput('tenure', value)}
          keyboardType="numeric"
          placeholder="Enter tenure in months"
        />
      </Card>

      {results.emi && (
        <Card style={styles.resultCard}>
          <Text style={styles.cardTitle}>Results</Text>
          <View style={styles.resultGrid}>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Monthly EMI</Text>
              <Text style={styles.resultValue}>{formatCurrency(results.emi)}</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Total Interest</Text>
              <Text style={styles.resultValue}>{formatLargeNumber(results.totalInterest)}</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Total Amount</Text>
              <Text style={styles.resultValue}>{formatLargeNumber(results.totalAmount)}</Text>
            </View>
          </View>
        </Card>
      )}
    </>
  );

  const renderSIPCalculator = () => (
    <>
      <Card style={styles.inputCard}>
        <Text style={styles.cardTitle}>SIP Details</Text>
        <Input
          label="Monthly Investment (₹)"
          value={inputs.monthlyInvestment?.toString() || ''}
          onChangeText={(value) => updateInput('monthlyInvestment', value)}
          keyboardType="numeric"
          placeholder="Enter monthly SIP amount"
        />
        <Input
          label="Expected Return (% per annum)"
          value={inputs.annualReturn?.toString() || ''}
          onChangeText={(value) => updateInput('annualReturn', value)}
          keyboardType="numeric"
          placeholder="Enter expected return"
        />
        <Input
          label="Investment Period (Years)"
          value={inputs.years?.toString() || ''}
          onChangeText={(value) => updateInput('years', value)}
          keyboardType="numeric"
          placeholder="Enter investment period"
        />
      </Card>

      {results.maturityValue && (
        <Card style={styles.resultCard}>
          <Text style={styles.cardTitle}>Results</Text>
          <View style={styles.resultGrid}>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Maturity Value</Text>
              <Text style={styles.resultValue}>{formatLargeNumber(results.maturityValue)}</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Total Investment</Text>
              <Text style={styles.resultValue}>{formatLargeNumber(results.totalInvestment)}</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Wealth Gained</Text>
              <Text style={styles.resultValue}>{formatLargeNumber(results.wealthGained)}</Text>
            </View>
          </View>
        </Card>
      )}
    </>
  );

  const renderGenericCalculator = () => (
    <Card style={styles.comingSoon}>
      <Text style={styles.comingSoonTitle}>🚧 Under Development</Text>
      <Text style={styles.comingSoonText}>
        This calculator is currently under development and will be available soon.
      </Text>
    </Card>
  );

  const renderCalculator = () => {
    switch (type) {
      case 'emi':
        return renderEMICalculator();
      case 'sip':
        return renderSIPCalculator();
      default:
        return renderGenericCalculator();
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ScrollView 
        style={[globalStyles.container, globalStyles.screenPadding]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderCalculator()}

        {(results.emi || results.maturityValue) && (
          <Button
            title="Save Scenario"
            onPress={saveScenario}
            variant="primary"
            gradient
            style={styles.saveButton}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: Spacing.xxxl,
  },
  inputCard: {
    marginBottom: Spacing.lg,
  },
  resultCard: {
    marginBottom: Spacing.lg,
    backgroundColor: Colors.primary + '08',
    borderWidth: 1,
    borderColor: Colors.primary + '20',
  },
  cardTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  resultGrid: {
    gap: Spacing.md,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outline + '50',
  },
  resultLabel: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  resultValue: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.primary,
  },
  saveButton: {
    marginTop: Spacing.lg,
  },
  comingSoon: {
    alignItems: 'center',
    paddingVertical: Spacing.xxxl,
  },
  comingSoonTitle: {
    fontSize: FontSize.xl,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  comingSoonText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default CalculatorDetailScreen;