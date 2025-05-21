import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, TextInput, TouchableOpacity, KeyboardAvoidingView, FlatList, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Video, ResizeMode } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commentStyles, globalStyles, videoStyles } from '../styles/screens.styles';
import { ArrowUp, EyeIcon } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/App';
import { RouteProp } from '@react-navigation/native';

import { ListRenderItemInfo } from 'react-native';
// type LivestreamData = {
//   stream_url: string;
//   title: string;
//   viewer_count: number;
// };

// export default function LivestreamScreen() {
//   const [streamData, setStreamData] = useState<LivestreamData | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isLive, setIsLive] = useState(false);

//   useEffect(() => {
//     const fetchLivestreamData = async () => {
//       setIsLoading(true);
//       try {
//         const token = await AsyncStorage.getItem('Token');
//         const statusRes = await fetch(
//           'https://api.myfitpro.com/v1/business/993/status',
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               Accept: 'application/json',
//             },
//           }
//         );
//         const statusData = await statusRes.json();
//         const live = statusData['is-live'];
//         setIsLive(live);

//         if (live) {
//           const detailsRes = await fetch(
//             'https://api.myfitpro.com/v1/business/993',
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 Accept: 'application/json',
//               },
//             }
//           );
//           const detailsData = await detailsRes.json();

//           setStreamData({
//             stream_url: detailsData.stream_url,
//             title: detailsData.name,
//             viewer_count: detailsData.viewer_count ?? 0,
//           });
//         } else {
//           setStreamData(null);
//         }
//       } catch (err) {
//         console.error('Failed to fetch livestream:', err);
//         setStreamData(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchLivestreamData();
//   }, []);

//   if (isLoading) {
//     return (
//       <SafeAreaView>
//         <ActivityIndicator size="large" />
//       </SafeAreaView>
//     );
//   }

//   if (!isLive) {
//     return (
//       <SafeAreaView>
//         <Text style={{ textAlign: 'center', marginTop: 40 }}>
//           Not currently live.
//         </Text>
//       </SafeAreaView>
//     );
//   }

//   if (!streamData?.stream_url) {
//     return (
//       <SafeAreaView>
//         <Text style={{ textAlign: 'center', marginTop: 40 }}>
//           Stream URL not available.
//         </Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View
//         style={{ width: '100%', aspectRatio: 16 / 9, backgroundColor: 'black' }}
//       >
//         <Video
//           source={{ uri: streamData.stream_url }}
//           useNativeControls
//           resizeMode={ResizeMode.CONTAIN}
//           style={{ width: '100%', height: '100%' }}
//           shouldPlay
//           onError={(e) => console.log('Video error:', e)}
//         />
//       </View>
//       <View style={{ padding: 16 }}>
//         <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
//           {streamData.title}
//         </Text>
//         <Text style={{ color: 'gray' }}>{streamData.viewer_count} viewers</Text>
//       </View>
//     </SafeAreaView>
//   );
// }

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
    <View style={commentStyles.commentItem}>
      <View style={commentStyles.commentHeader}>
        {item.type === 'login' ? (
          <Text style={commentStyles.userName}>{item.name + " Logged in"}</Text>
        ) : <Text style={commentStyles.userName}>{item.name}</Text>
        }
        <Text style={commentStyles.timestamp}>{item.created_at}</Text>
      </View>
      {item.type === 'comment' ? (
        <Text style={commentStyles.commentText}>{item.body}</Text>
      ) : <Text style={commentStyles.commentText}>{""}</Text>
      }
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
            style={commentStyles.reactionButton}
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
      <SafeAreaView>
        <Text style={{ textAlign: 'center', marginTop: 40 }}>
          Not currently live.
        </Text>
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
                <Text style={videoStyles.viewerCountText}>{streamData.viewer_count}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Comments section */}
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
      </SafeAreaView>
    </KeyboardAvoidingView >
  );
} 