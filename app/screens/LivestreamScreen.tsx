import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Text, ActivityIndicator, TextInput, TouchableOpacity, KeyboardAvoidingView, FlatList, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Video, ResizeMode } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commentStyles, globalStyles, homeStyles, videoStyles } from '../styles/screens.styles';
import { ArrowUp, EyeIcon } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/App';
import { RouteProp } from '@react-navigation/native';
import { ListRenderItemInfo } from 'react-native';

type LivestreamScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Livestream'>;
};

type LivestreamData = {
  stream_url: string;
  title: string;
  viewer_count: number;
};

type Event = {
  id: string;
  created_at: string;
  type: string;
  name: string;
  body: string;
  reaction_1_count: number;
  reaction_2_count: number;
  reaction_3_count: number;
  reaction_4_count: number;
  reaction_5_count: number;
};

type reactionAsset = {
  id: number;
  name: string;
  utf8: string;
};

const reactionAssets: reactionAsset[] = [
  { id: 1, name: "love", utf8: "❤️" },
  { id: 2, name: "like", utf8: "👍" },
  { id: 3, name: "strong", utf8: "💪" },
  { id: 4, name: "sweat", utf8: "😅" },
  { id: 5, name: "medal", utf8: "🏅" }
];

export default function LivestreamScreen({ navigation }: LivestreamScreenProps) {

  const [comment, setComment] = useState('');

  const [isLive, setIsLive] = useState(false);
  const [streamData, setStreamData] = useState<LivestreamData | null>(null);

  const [events, setEvents] = useState<Event[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  // Fetch livestream status
  useEffect(() => {
    const fetchLivestreamData = async () => {
      try {
        const token = await AsyncStorage.getItem('Token');
        const statusRes = await fetch(
          'https://api.myfitpro.com/v1/business/993/status',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          }
        );
        const statusData = await statusRes.json();
        const live = statusData['is-live'];
        setIsLive(live);
      } catch (err) {
        console.error('Failed to fetch livestream:', err);
        setStreamData(null);
      }
    };

    const interval = setInterval(fetchLivestreamData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch livestream data
  useEffect(() => {
    const fetchStreamStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('Token');
        if (isLive) {
          const detailsRes = await fetch(
            'https://api.myfitpro.com/v1/business/993',
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
              },
            }
          );
          const detailsData = await detailsRes.json();

          setStreamData({
            stream_url: detailsData.stream_url,
            title: detailsData.name,
            viewer_count: detailsData.viewer_count ?? 0,
          });
        } else {
          setStreamData(null);
        }
      } catch (err) {
        console.error('Failed to fetch livestream:', err);
        setStreamData(null);
      }

    }
    fetchStreamStatus();
  }, [isLive]);

  // Fetch events/comments
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoadingComments(true);
        const token = await AsyncStorage.getItem('Token');
        const response = await fetch(
          'https://api.myfitpro.com/v1/business/993/events',
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoadingComments(false);
      }
    };
    const interval = setInterval(fetchEvents, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSendComment = async () => {
    if (comment.trim() === '') return;

    const form = new FormData();
    form.append('body', comment);

    try {
      const token = await AsyncStorage.getItem('Token');
      const response = await fetch('https://api.myfitpro.com/v1/business/993/comments', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      if (!response.ok) {
        throw new Error('Failed to send comment');
      }

      const data = await response.json();
      console.log('Comment posted:', data);

      setComment('');
    }
    catch (error) {
      console.error('Error sending comment:', error);
    }
  };

  const handleViewersList = () => {
    navigation.navigate('ViewersList');
  };

  // Scroll to bottom of the comments list
  const scrollToBottom = () => {
    if (events.length > 0 && flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: false });
    }
  };

  const renderEvent = ({ item }: ListRenderItemInfo<Event>) => (
    <View style={[commentStyles.commentItem, { backgroundColor: theme.background }]}>
      <View style={[commentStyles.commentHeader, { backgroundColor: theme.background }]}>
        {item.type === 'login' ? (
          <Text style={[commentStyles.userName, { color: theme.text.primary }]}>{item.name + " Logged in"}</Text>
        ) : <Text style={commentStyles.userName}>{item.name}</Text>
        }
        <Text style={[commentStyles.timestamp, { color: theme.text.primary }]}>{item.created_at}</Text>
      </View>
      {item.type === 'comment' ? (
        <Text style={[commentStyles.commentText, { color: theme.text.primary }]}>{item.body}</Text>
      ) : <Text style={commentStyles.commentText}>{""}</Text>
      }
      <View style={[commentStyles.reactionsContainer, { backgroundColor: theme.background }]}>
        <TouchableOpacity
          style={[commentStyles.addReactionButton, { backgroundColor: theme.primary }]}
          onPress={() => {
            // TODO: Implement reaction picker
            // TODO: Submit reaction to API
          }}
        >
          <Text style={[commentStyles.addReactionText, { backgroundColor: theme.primary }]}>+</Text>
        </TouchableOpacity>
        {item.reaction_1_count > 0 && (

          <TouchableOpacity
            style={commentStyles.reactionButton}
            onPress={() => {
              // TODO: Submit clicked emoji reaction to API
            }}
          >
            <Text style={commentStyles.reactionText}>
              {reactionAssets[0].utf8}
            </Text>
            <Text style={commentStyles.reactionCount}>{item.reaction_1_count}</Text>
          </TouchableOpacity>
        )}
        {item.reaction_2_count > 0 && (
          <TouchableOpacity
            style={commentStyles.reactionButton}
            onPress={() => {
              // TODO: Submit clicked emoji reaction to API
            }}
          >
            <Text style={commentStyles.reactionText}>
              {reactionAssets[1].utf8}
            </Text>
            <Text style={commentStyles.reactionCount}>{item.reaction_2_count}</Text>
          </TouchableOpacity>
        )}
        {item.reaction_3_count > 0 && (
          <TouchableOpacity
            style={commentStyles.reactionButton}
            onPress={() => {
              // TODO: Submit clicked emoji reaction to API
            }}
          >
            <Text style={commentStyles.reactionText}>
              {reactionAssets[2].utf8}
            </Text>
            <Text style={commentStyles.reactionCount}>{item.reaction_3_count}</Text>
          </TouchableOpacity>
        )}
        {item.reaction_4_count > 0 && (
          <TouchableOpacity
            style={commentStyles.reactionButton}
            onPress={() => {
              // TODO: Submit clicked emoji reaction to API
            }}
          >
            <Text style={commentStyles.reactionText}>
              {reactionAssets[3].utf8}
            </Text>
            <Text style={commentStyles.reactionCount}>{item.reaction_4_count}</Text>
          </TouchableOpacity>
        )}
        {item.reaction_5_count > 0 && (
          <TouchableOpacity
            style={[commentStyles.reactionButton, { backgroundColor: theme.primary }]}
            onPress={() => {
              // TODO: Submit clicked emoji reaction to API
            }}
          >
            <Text style={commentStyles.reactionText}>
              {reactionAssets[4].utf8}
            </Text>
            <Text style={commentStyles.reactionCount}>{item.reaction_5_count}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (!isLive) {
    return (
      <SafeAreaView edges={['bottom']}>
        <Image
          source={{ uri: theme.banner }}
          style={[{ marginHorizontal: 0, marginTop: 0, marginBottom: 20, width: '100%', height: 275, backgroundColor: 'black' }]}
          resizeMode="center"
        />
        <View style={[homeStyles.liveButtonContainer, { alignItems: 'flex-start', margin: 10 }]}>
          <View style={homeStyles.offlineIndicator}>
            <Text style={homeStyles.offlineText}>OFFLINE</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (!streamData?.stream_url) {
    return (
      <SafeAreaView>
        <Text style={{ textAlign: 'center', marginTop: 40 }}>
          Stream URL not available.
        </Text>
      </SafeAreaView>
    );
  }

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
              <View
                style={{ width: '100%', aspectRatio: 16 / 9, backgroundColor: 'black' }}
              >
                <Video
                  source={{ uri: streamData.stream_url }}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  style={{ width: '100%', height: '100%' }}
                  shouldPlay
                  onError={(e) => console.log('Video error:', e)}
                />
              </View>
            </View>

            {/* Live data section */}
            <View style={[videoStyles.livestreamInfoContainer, { backgroundColor: theme.background }]}>
              {isLive ?
                <View style={videoStyles.liveIndicatorContainer}>
                  <Text style={videoStyles.liveText}>● LIVE</Text>
                </View>
                : <View style={videoStyles.offlineIndicator}>
                  <Text style={videoStyles.offlineText}>OFFLINE</Text>
                </View>}
              <TouchableOpacity
                style={[videoStyles.viewerCountContainer, { backgroundColor: theme.primary }]}
                onPress={handleViewersList}
              >
                <Text><EyeIcon size={16} color={colors.white} /></Text>
                <Text style={videoStyles.viewerCountText}>{streamData.viewer_count}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Comments section */}
          <View style={[commentStyles.container, { flex: 1 }, { backgroundColor: theme.background }]}>
            <FlatList
              ref={flatListRef}
              data={events}
              renderItem={renderEvent}
              keyExtractor={item => item.id}
              contentContainerStyle={{ paddingBottom: 10 }}
              onLayout={scrollToBottom}
              onContentSizeChange={scrollToBottom}
              maintainVisibleContentPosition={{
                minIndexForVisible: 0,
                autoscrollToTopThreshold: 100
              }}
              removeClippedSubviews={false}
              initialNumToRender={events.length}
              maxToRenderPerBatch={events.length}
              windowSize={21}
            />

            {/* Comment input */}
            <View style={[
              commentStyles.inputContainer,
              { paddingBottom: Math.max(10, insets.bottom) },
              { backgroundColor: theme.background }
            ]}>
              <TextInput
                style={[commentStyles.textInput, { backgroundColor: theme.background }]}
                placeholder="Add a comment..."
                value={comment}
                onChangeText={setComment}
              />
              <TouchableOpacity
                onPress={handleSendComment}
                style={[
                  commentStyles.sendButton,
                  comment.trim() ? { backgroundColor: theme.primary } : commentStyles.sendButtonInactive
                ]}
                disabled={!comment.trim()}
              >
                <ArrowUp size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView >
  );
} 