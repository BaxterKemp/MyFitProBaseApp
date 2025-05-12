import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EyeIcon } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video, ResizeMode } from 'expo-av';
import axios from 'axios';
import { RootStackParamList } from '../../App';
import { globalStyles, videoStyles } from '../styles/screens.styles';
import { colors } from '../theme/colors';

type LivestreamScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Livestream'>;
};

export default function LivestreamScreen({
  navigation,
}: LivestreamScreenProps) {
  const [isLive, setIsLive] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<Video>(null);

  useEffect(() => {
    const fetchLivestreamData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          'rtmps://stream-crimson-king.myfitpro.com:8443/show/Vj3f4jFM4jfFXP3GkeHk7TjW8X627hrM'
        );

        console.log('Livestream API Response:', response.data);

        setIsLive(response.data.isLive);
        setViewerCount(response.data.viewerCount);
        setStreamUrl(response.data.streamUrl);
      } catch (err) {
        console.error('Failed to fetch livestream data:', err);
        setError('Failed to load livestream data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLivestreamData();
  }, []);

  const handleViewersList = () => {
    navigation.navigate('ViewersList');
  };

  if (loading) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>
          {error}
        </Text>
      </SafeAreaView>
    );
  }

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
            <View
              style={[
                videoStyles.videoContainer,
                { backgroundColor: '#000', height: 200 },
              ]}
            >
              {isLive && streamUrl ? (
                <Video
                  ref={videoRef}
                  source={{ uri: streamUrl }}
                  style={{ width: '100%', height: '100%' }}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  shouldPlay
                  onError={(e) => console.log('Video error:', e)}
                />
              ) : (
                <Text style={{ color: 'white', padding: 10 }}>
                  Stream is currently offline.
                </Text>
              )}
            </View>

            {/* Live data section */}
            <View style={videoStyles.livestreamInfoContainer}>
              {isLive ? (
                <View style={videoStyles.liveIndicatorContainer}>
                  <Text style={videoStyles.liveText}>● LIVE</Text>
                </View>
              ) : (
                <View style={videoStyles.offlineIndicator}>
                  <Text style={videoStyles.offlineText}>OFFLINE</Text>
                </View>
              )}
              <TouchableOpacity
                style={videoStyles.viewerCountContainer}
                onPress={handleViewersList}
              >
                <Text>
                  <EyeIcon size={16} color={colors.white} />
                </Text>
                <Text style={videoStyles.viewerCountText}>{viewerCount}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
