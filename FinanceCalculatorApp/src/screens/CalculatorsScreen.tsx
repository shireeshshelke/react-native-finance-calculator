import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Card from '@/components/common/Card';
import {globalStyles} from '@/styles/globalStyles';
import {Colors, Spacing, FontSize, BorderRadius} from '@/styles/theme';
import {CALCULATOR_TYPES} from '@/constants';

const CalculatorsScreen: React.FC = () => {
  const navigation = useNavigation();

  const navigateToCalculator = (type: string) => {
    navigation.navigate('CalculatorDetail', {type});
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={[globalStyles.container, globalStyles.screenPadding]}>
        <View style={styles.header}>
          <Text style={globalStyles.h1}>Financial Calculators</Text>
          <Text style={styles.subtitle}>
            Plan your finances with our comprehensive calculator suite
          </Text>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.grid}>
            {CALCULATOR_TYPES.map((calculator) => (
              <TouchableOpacity
                key={calculator.id}
                onPress={() => navigateToCalculator(calculator.id)}
                style={styles.calculatorCard}
              >
                <Card style={styles.cardContent}>
                  <View style={[styles.iconContainer, {backgroundColor: calculator.color + '20'}]}>
                    <Text style={styles.icon}>{calculator.icon}</Text>
                  </View>
                  <View style={styles.textContent}>
                    <Text style={styles.title}>{calculator.name}</Text>
                    <Text style={styles.description} numberOfLines={2}>
                      {calculator.description}
                    </Text>
                  </View>
                  <Icon name="chevron-right" size={20} color={Colors.textLight} />
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: Spacing.xl,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  scrollContent: {
    paddingBottom: Spacing.xxxl,
  },
  grid: {
    gap: Spacing.md,
  },
  calculatorCard: {
    marginBottom: Spacing.md,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  icon: {
    fontSize: 24,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  description: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
});

export default CalculatorsScreen;