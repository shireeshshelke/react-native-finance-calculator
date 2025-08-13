import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';

export const Colors = {
  primary: '#2563eb',
  primaryLight: '#3b82f6',
  primaryDark: '#1d4ed8',
  secondary: '#10b981',
  secondaryLight: '#34d399',
  accent: '#f59e0b',
  accentLight: '#fbbf24',
  success: '#22c55e',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  background: '#f8fafc',
  surface: '#ffffff',
  surfaceVariant: '#f1f5f9',
  onSurface: '#1e293b',
  onSurfaceVariant: '#475569',
  outline: '#cbd5e1',
  shadow: '#000000',
  text: '#1e293b',
  textSecondary: '#64748b',
  textLight: '#94a3b8',
  disabled: '#cbd5e1',
  placeholder: '#94a3b8',
};

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.primary,
    onPrimary: '#ffffff',
    primaryContainer: Colors.primaryLight,
    onPrimaryContainer: Colors.primary,
    secondary: Colors.secondary,
    onSecondary: '#ffffff',
    secondaryContainer: Colors.secondaryLight,
    onSecondaryContainer: Colors.secondary,
    tertiary: Colors.accent,
    onTertiary: '#ffffff',
    error: Colors.error,
    onError: '#ffffff',
    background: Colors.background,
    onBackground: Colors.text,
    surface: Colors.surface,
    onSurface: Colors.onSurface,
    surfaceVariant: Colors.surfaceVariant,
    onSurfaceVariant: Colors.onSurfaceVariant,
    outline: Colors.outline,
    shadow: Colors.shadow,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const FontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 999,
};

export const Shadows = {
  sm: {
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  md: {
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};