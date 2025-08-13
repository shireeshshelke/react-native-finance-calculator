import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {Colors, BorderRadius, Spacing, Shadows} from '@/styles/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevated?: boolean;
  padding?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  elevated = false,
  padding = true,
}) => {
  return (
    <View
      style={[
        styles.card,
        elevated && styles.elevated,
        padding && styles.padding,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
  },
  elevated: {
    ...Shadows.md,
  },
  padding: {
    padding: Spacing.lg,
  },
});

export default Card;