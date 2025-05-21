import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { commonStyles as commonStylesFunc} from '../theme/common.styles';
import { layout, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { ThemeContext, ThemeProvider } from '@react-navigation/native';

const commonStyles = commonStylesFunc(colors); 

export const globalStyles = StyleSheet.create({
    headerContainer: {
        ...commonStyles.centerAligned,
        height: 159,
        marginTop: spacing.lg,
        marginBottom: spacing.xxxl,
        marginHorizontal: spacing.lg,
        resizeMode: 'contain'
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
    offlineIndicator: {
        backgroundColor: 'gray',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        marginRight: spacing.lg,
        borderRadius: 20,
    },
    offlineText: {
        color: colors.white,
        fontWeight: typography.weights.extraBold,
        fontSize: typography.sizes.xs,
    },
});

export const videoStyles = StyleSheet.create({
    videoContainer: {
        ...commonStyles.centerAligned,
        height: 200,
        backgroundColor: 'lightgray', // TODO: remove this once the video implementation is complete
    },
    livestreamInfoContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        height: 60,
        backgroundColor: 'none',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
    },
    viewerCountContainer: {
        backgroundColor: '#007AFF',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xs,
    },
    viewerCountText: {
        color: colors.white,
        fontWeight: typography.weights.extraBold,
        fontSize: typography.sizes.xs,
    },
    liveText: {
        color: colors.white,
        fontWeight: typography.weights.extraBold,
        fontSize: typography.sizes.xs,
    },
    liveIndicatorContainer: {
        backgroundColor: colors.live,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: 20,
    },
    offlineIndicator: {
        backgroundColor: 'gray',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: 20,
    },
    offlineText: {
        color: colors.white,
        fontWeight: typography.weights.extraBold,
        fontSize: typography.sizes.xs,
    },
});

export const viewersListStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text.primary,
    },
    closeButton: {
        padding: 5,
    },
    listContent: {
        paddingHorizontal: 20,
    },
    viewerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    viewerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    viewerInitial: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    viewerName: {
        fontSize: 16,
        color: colors.text.primary,
    },
});

export const commentStyles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: colors.border
    },
    commentItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4
    },
    userName: {
        fontWeight: 'bold'
    },
    timestamp: {
        color: 'gray',
        fontSize: 12
    },
    commentText: {
        marginBottom: 8
    },
    reactionsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    addReactionButton: {
        backgroundColor: '#4285F4',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 50,
        marginRight: 8
    },
    reactionButton: {
        backgroundColor: '#4285F4',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 50,
        marginRight: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    reactionText: {
        marginRight: 4
    },
    reactionCount: {
        color: 'white',
        fontWeight: 'bold'
    },
    addReactionText: {
        color: 'white',
        fontWeight: 'bold'
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        backgroundColor: colors.background,
        alignItems: 'center'
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginRight: 10,
        height: 40,
        backgroundColor: 'white'
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sendButtonActive: {
        backgroundColor: '#4285F4'
    },
    sendButtonInactive: {
        backgroundColor: '#E0E0E0'
    }
});

export const replayDetailStyles = StyleSheet.create({
    container: {
        ...commonStyles.container,
    },
    content: {
        padding: spacing.lg,
    },
    detailsContainer: {
        alignItems: 'flex-start',
    },
    title: {
        fontSize: typography.sizes.lg,
        fontWeight: typography.weights.bold,
        color: colors.text.primary,
        marginBottom: spacing.sm,
    },
    timeInfo: {
        fontSize: typography.sizes.md,
        color: colors.text.secondary,
        marginBottom: spacing.xl,
    }
});

export const liveReplayStyles = StyleSheet.create({
    container: {
        ...commonStyles.container,
    },
    listContent: {
        paddingVertical: spacing.md,
    },
    replayItem: {
        flexDirection: 'row',
        padding: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        alignItems: 'center',
    },
    thumbnail: {
        width: 120,
        height: 80,
        borderRadius: 4,
    },
    contentContainer: {
        flex: 1,
        marginHorizontal: spacing.md,
    },
    title: {
        fontSize: typography.sizes.md,
        fontWeight: typography.weights.semibold,
        color: colors.text.primary,
        marginBottom: spacing.xs,
    },
    subText: {
        fontSize: typography.sizes.sm,
        color: colors.text.secondary,
    },
    playButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
});