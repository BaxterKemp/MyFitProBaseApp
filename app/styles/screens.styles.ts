import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, layout } from '../theme/spacing';
import { typography } from '../theme/typography';
import { commonStyles } from '../theme/common.styles';

export const globalStyles = StyleSheet.create({
    headerContainer: {
        ...commonStyles.centerAligned,
        height: 159,
        backgroundColor: 'lightgray', // TODO: remove this once the API Logo implementation is complete
        marginTop: spacing.lg,
        marginBottom: spacing.xxxl,
        marginHorizontal: spacing.lg,
    },
    container: {
        ...commonStyles.container,
    },
    mainContent: {
        ...commonStyles.flex1,
        ...commonStyles.spaceBetween,
    },
    formContainer: {
        ...commonStyles.paddingHorizontal,
    },
    input: {
        ...commonStyles.textInput,
    },
    primaryButton: {
        ...commonStyles.primaryButton,
    },
    primaryButtonText: {
        ...commonStyles.primaryButtonText,
    },
    bottomContent: {
        ...commonStyles.paddingHorizontal,
    },
    linkText: {
        ...commonStyles.link,
    },
});

export const loginStyles = StyleSheet.create({
    termsContainer: {
        ...commonStyles.marginBottom,
    },
    contactContainer: {
        marginBottom: spacing.sm,
    },
    termsText: {
        ...commonStyles.bodyText,
    },
});

export const homeStyles = StyleSheet.create({
    headerContainer: {
        ...commonStyles.centerAligned,
        height: 80,
        marginTop: spacing.lg,
        marginBottom: spacing.lg,
    },
    liveIndicatorContainer: {
        position: 'absolute',
        top: spacing.xl,
        right: spacing.lg,
        zIndex: 1,
    },
    liveButtonContainer: {
        alignItems: 'flex-end',
    },
    liveIndicator: {
        backgroundColor: colors.live,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        marginRight: spacing.lg,
        borderRadius: 20,
    },
    liveText: {
        color: colors.white,
        fontWeight: typography.weights.extraBold,
        fontSize: typography.sizes.xs,
    },
    buttonContainer: {
        marginHorizontal: spacing.lg,
        marginTop: spacing.xl,
        gap: spacing.lg,
    },
    logoutButtonContainer: {
        position: 'absolute',
        bottom: spacing.xxxl,
        left: spacing.lg,
        right: spacing.lg,
    },
    button: {
        height: layout.buttonHeight,
        borderRadius: layout.borderRadius,
        ...commonStyles.centerAligned,
        justifyContent: 'center',
    },
    mainButton: {
        ...commonStyles.primaryButton,
    },
    logoutButton: {
        ...commonStyles.secondaryButton,
    },
    logoutText: {
        ...commonStyles.secondaryButtonText,
    },
});