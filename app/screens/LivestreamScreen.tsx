import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackActions } from '@react-navigation/native';
import { globalStyles, homeStyles, videoStyles, commentStyles } from '../styles/screens.styles';
import { RootStackParamList } from '../../App';
import { colors } from '../theme/colors';
import { EyeIcon, ArrowUp } from 'lucide-react-native';

type LivestreamScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Livestream'>;
};

// Comment type definition
type Reaction = {
    type: string;
    count: number;
};

type Comment = {
    id: string;
    userName: string;
    text: string;
    timestamp: string;
    reactions: Reaction[];
};

export default function LivestreamScreen({ navigation }: LivestreamScreenProps) {
    // Comment Input Value
    const [comment, setComment] = useState('');

    const flatListRef = useRef<FlatList>(null);

    const insets = useSafeAreaInsets();

    const isLive = true; // TODO: Implement API call to check if the business is live
    const viewerCount = 8; // TODO: Replace with API data

    // Comment Data TODO: Replace with API data
    const comments: Comment[] = [
        {
            id: '1',
            userName: 'John',
            text: 'This is awesome!',
            timestamp: '2:30 PM',
            reactions: [
                { type: '😊', count: 3 },
                { type: '❤️', count: 2 }
            ]
        },
        {
            id: '2',
            userName: 'Sarah',
            text: 'Great session today! Loved the content.',
            timestamp: '2:32 PM',
            reactions: [
                { type: '😊', count: 1 },
                { type: '❤️', count: 3 },
                { type: '💪', count: 2 }
            ]
        },
        {
            id: '3',
            userName: 'Mike',
            text: 'When is the next session?',
            timestamp: '2:35 PM',
            reactions: []
        },
        {
            id: '4',
            userName: 'Emma',
            text: 'Could you please explain that last part again?',
            timestamp: '2:37 PM',
            reactions: [
                { type: '👍', count: 1 }
            ]
        },
        {
            id: '5',
            userName: 'David',
            text: 'Thanks for the tips!',
            timestamp: '2:39 PM',
            reactions: [
                { type: '🙏', count: 4 }
            ]
        }
    ]

    const handleViewersList = () => {
        navigation.navigate('ViewersList');
    };

    const handleSendComment = () => {
        if (comment.trim() === '') return;

        // Instead of adding the comment, just log to console
        console.log('Comment submitted:', comment);

        // Clear the input field
        setComment('');
    };

    // Scroll to bottom of the comments list
    const scrollToBottom = () => {
        if (comments.length > 0 && flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: false });
        }
    };

    // Comment Item Renderer
    const renderComment = ({ item }: { item: Comment }) => (
        <View style={commentStyles.commentItem}>
            <View style={commentStyles.commentHeader}>
                <Text style={commentStyles.userName}>{item.userName}</Text>
                <Text style={commentStyles.timestamp}>{item.timestamp}</Text>
            </View>
            <Text style={commentStyles.commentText}>{item.text}</Text>
            <View style={commentStyles.reactionsContainer}>
                <TouchableOpacity
                    style={commentStyles.addReactionButton}
                    onPress={() => {
                        // TODO: Implement reaction picker
                        // TODO: Submit reaction to API
                    }}
                >
                    <Text style={commentStyles.addReactionText}>+</Text>
                </TouchableOpacity>
                {item.reactions.map((reaction, index) => (
                    <TouchableOpacity
                        key={index}
                        style={commentStyles.reactionButton}
                        onPress={() => {
                            // TODO: Submit clicked emoji reaction to API
                        }}
                    >
                        <Text style={commentStyles.reactionText}>{reaction.type}</Text>
                        <Text style={commentStyles.reactionCount}>{reaction.count}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    // Page Renderer
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
                <View style={globalStyles.container}>
                    {/* Video section */}
                    <View style={{ flexShrink: 0 }}>
                        <View style={[videoStyles.videoContainer, {
                            backgroundColor: '#333',
                            height: 200, // Fixed height instead of percentage
                        }]}>
                            {/* TODO:
                            - Add video implementation
                            - Add video poster from API if "isLive" is false
                            */}
                        </View>

                        {/* Live data section */}
                        <View style={videoStyles.livestreamInfoContainer}>
                            {isLive ?
                                <View style={videoStyles.liveIndicatorContainer}>
                                    <Text style={videoStyles.liveText}>● LIVE</Text>
                                </View>
                                : <View style={videoStyles.offlineIndicator}>
                                    <Text style={videoStyles.offlineText}>OFFLINE</Text>
                                </View>}
                            <TouchableOpacity
                                style={videoStyles.viewerCountContainer}
                                onPress={handleViewersList}
                            >
                                <Text><EyeIcon size={16} color={colors.white} /></Text>
                                <Text style={videoStyles.viewerCountText}>{viewerCount}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Comments section */}
                    <View style={[commentStyles.container, { flex: 1 }]}>
                        <FlatList
                            ref={flatListRef}
                            data={comments}
                            renderItem={renderComment}
                            keyExtractor={item => item.id}
                            contentContainerStyle={{ paddingBottom: 10 }}
                            onLayout={scrollToBottom}
                            onContentSizeChange={scrollToBottom}
                            maintainVisibleContentPosition={{
                                minIndexForVisible: 0,
                                autoscrollToTopThreshold: 100
                            }}
                            removeClippedSubviews={false}
                            initialNumToRender={comments.length}
                            maxToRenderPerBatch={comments.length}
                            windowSize={21}
                        />

                        {/* Comment input */}
                        <View style={[
                            commentStyles.inputContainer,
                            { paddingBottom: Math.max(10, insets.bottom) }
                        ]}>
                            <TextInput
                                style={commentStyles.textInput}
                                placeholder="Add a comment..."
                                value={comment}
                                onChangeText={setComment}
                            />
                            <TouchableOpacity
                                onPress={handleSendComment}
                                style={[
                                    commentStyles.sendButton,
                                    comment.trim() ? commentStyles.sendButtonActive : commentStyles.sendButtonInactive
                                ]}
                                disabled={!comment.trim()}
                            >
                                <ArrowUp size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
} 