import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {globalStyles} from '@/styles/globalStyles';
import {Colors, Spacing, FontSize} from '@/styles/theme';
import Card from '@/components/common/Card';

const InsightsScreen: React.FC = () => {
  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={[globalStyles.container, globalStyles.screenPadding]}>
        <Text style={globalStyles.h1}>Insights</Text>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
          <Card style={styles.comingSoon}>
            <Text style={styles.comingSoonTitle}>📊 Coming Soon!</Text>
            <Text style={styles.comingSoonText}>
              Detailed analytics and insights about your spending patterns, 
              budget performance, and financial trends will be available here.
            </Text>
          </Card>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
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

export default InsightsScreen;