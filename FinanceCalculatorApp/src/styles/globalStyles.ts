import {StyleSheet} from 'react-native';
import {Colors, Spacing, FontSize, BorderRadius, Shadows} from './theme';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  screenPadding: {
    paddingHorizontal: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginVertical: Spacing.sm,
    ...Shadows.sm,
  },
  cardElevated: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginVertical: Spacing.sm,
    ...Shadows.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  // Typography
  h1: {
    fontSize: FontSize.xxxl,
    fontWeight: '700',
    color: Colors.text,
  },
  h2: {
    fontSize: FontSize.xxl,
    fontWeight: '600',
    color: Colors.text,
  },
  h3: {
    fontSize: FontSize.xl,
    fontWeight: '600',
    color: Colors.text,
  },
  h4: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  body1: {
    fontSize: FontSize.md,
    color: Colors.text,
  },
  body2: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  caption: {
    fontSize: FontSize.xs,
    color: Colors.textLight,
  },
  button: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: Colors.primary,
  },
  buttonSecondary: {
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.surface,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.outline,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.text,
    backgroundColor: Colors.surface,
  },
  inputFocused: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  inputError: {
    borderColor: Colors.error,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.outline,
    marginVertical: Spacing.md,
  },
  spacingXs: {
    margin: Spacing.xs,
  },
  spacingSm: {
    margin: Spacing.sm,
  },
  spacingMd: {
    margin: Spacing.md,
  },
  spacingLg: {
    margin: Spacing.lg,
  },
  paddingXs: {
    padding: Spacing.xs,
  },
  paddingSm: {
    padding: Spacing.sm,
  },
  paddingMd: {
    padding: Spacing.md,
  },
  paddingLg: {
    padding: Spacing.lg,
  },
  marginXs: {
    margin: Spacing.xs,
  },
  marginSm: {
    margin: Spacing.sm,
  },
  marginMd: {
    margin: Spacing.md,
  },
  marginLg: {
    margin: Spacing.lg,
  },
});