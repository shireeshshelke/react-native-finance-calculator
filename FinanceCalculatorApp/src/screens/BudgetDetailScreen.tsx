import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {globalStyles} from '@/styles/globalStyles';
import {Colors, Spacing, FontSize} from '@/styles/theme';
import Card from '@/components/common/Card';

const BudgetDetailScreen: React.FC = () => {
  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={[globalStyles.container, globalStyles.screenPadding]}>
        <Card style={styles.comingSoon}>
          <Text style={styles.comingSoonTitle}>🚧 Coming Soon</Text>
          <Text style={styles.comingSoonText}>
            Budget management features are under development.
          </Text>
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default BudgetDetailScreen;