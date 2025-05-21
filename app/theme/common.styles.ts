import { StyleSheet } from 'react-native';
import { spacing, layout } from './spacing';
import { typography } from './typography';

export const commonStyles = (theme: any) =>
  StyleSheet.create({
    // Layout
    flex1: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    centerAligned: {
      alignItems: 'center',
    },
    spaceBetween: {
      justifyContent: 'space-between',
    },

    // Buttons
    primaryButton: {
      backgroundColor: theme.primary,
      height: layout.buttonHeight,
      borderRadius: layout.borderRadius,
      justifyContent: 'center',
      alignItems: 'center',
    },
    primaryButtonText: {
      color: theme.white,
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.bold,
    },
    secondaryButton: {
      backgroundColor: theme.white,
      height: layout.buttonHeight,
      borderRadius: layout.borderRadius,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.primary,
    },
    secondaryButtonText: {
      color: theme.primary,
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.bold,
    },

    // Inputs
    textInput: {
      height: layout.inputHeight,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: layout.borderRadius,
      paddingHorizontal: spacing.md,
      marginBottom: spacing.md,
      fontSize: typography.sizes.md,
    },

    // Text
    title: {
      fontSize: typography.sizes.xxl,
      fontWeight: typography.weights.bold,
      color: theme.primary,
    },
    subtitle: {
      fontSize: typography.sizes.md,
      color: theme.textSecondary,
      marginTop: spacing.sm,
    },
    heading: {
      fontSize: typography.sizes.xl,
      fontWeight: typography.weights.bold,
      color: theme.textPrimary,
    },
    subheading: {
      fontSize: typography.sizes.md,
      color: theme.textSecondary,
    },
    bodyText: {
      fontSize: typography.sizes.sm,
      color: theme.textSecondary,
      lineHeight: 20,
    },
    link: {
      color: theme.primary,
      textDecorationLine: 'underline',
    },

    // Spacing
    paddingHorizontal: {
      paddingHorizontal: spacing.lg,
    },
    marginBottom: {
      marginBottom: spacing.md,
    },
    marginTop: {
      marginTop: spacing.md,
    },
    padding: {
      padding: spacing.md,
    },
  });


  