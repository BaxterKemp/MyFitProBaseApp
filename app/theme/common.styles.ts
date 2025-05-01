import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { spacing, layout } from './spacing';
import { typography } from './typography';

export const commonStyles = StyleSheet.create({
    // Layout
    flex1: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    centerAligned: {
        alignItems: 'center',
    },
    spaceBetween: {
        justifyContent: 'space-between',
    },

    // Buttons
    primaryButton: {
        backgroundColor: colors.primary,
        height: layout.buttonHeight,
        borderRadius: layout.borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
    },
    primaryButtonText: {
        color: colors.white,
        fontSize: typography.sizes.md,
        fontWeight: typography.weights.bold,
    },
    secondaryButton: {
        backgroundColor: colors.white,
        height: layout.buttonHeight,
        borderRadius: layout.borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.primary,
    },
    secondaryButtonText: {
        color: colors.primary,
        fontSize: typography.sizes.md,
        fontWeight: typography.weights.bold,
    },

    // Inputs
    textInput: {
        height: layout.inputHeight,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: layout.borderRadius,
        paddingHorizontal: spacing.md,
        marginBottom: spacing.md,
        fontSize: typography.sizes.md,
    },

    // Text
    title: {
        fontSize: typography.sizes.xxl,
        fontWeight: typography.weights.bold,
        color: colors.primary,
    },
    subtitle: {
        fontSize: typography.sizes.md,
        color: colors.text.secondary,
        marginTop: spacing.sm,
    },
    heading: {
        fontSize: typography.sizes.xl,
        fontWeight: typography.weights.bold,
        color: colors.text.primary,
    },
    subheading: {
        fontSize: typography.sizes.md,
        color: colors.text.secondary,
    },
    bodyText: {
        fontSize: typography.sizes.sm,
        color: colors.text.secondary,
        lineHeight: 20,
    },
    link: {
        color: colors.primary,
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