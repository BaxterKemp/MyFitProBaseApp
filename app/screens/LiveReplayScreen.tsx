import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Play } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../App';
import { liveReplayStyles } from '../styles/screens.styles';
import { colors } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';

type LiveReplayScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'LiveReplay'>;
};

type ReplayVideo = {
  id: number;
  uuid: string;
  title: string;
  length: number;
  thumbnail_url: string;
  hls_url: string;
  status: string;
};

export default function LiveReplayScreen({
  navigation,
}: LiveReplayScreenProps) {
  const [replays, setReplays] = useState<ReplayVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchReplays = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('Token');
        if (!token) {
          throw new Error('No token found. Please log in again.');
        }

        const response = await fetch(
          'https://api.myfitpro.com/v1/business/993/videos',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          }
        );

        const text = await response.text();

        if (!response.ok) {
          throw new Error(`HTTP ${response.status} - ${text}`);
        }

        let data: ReplayVideo[];
        try {
          data = JSON.parse(text);
        } catch (err) {
          const message =
            err && typeof err === 'object' && 'message' in err
              ? (err as { message: string }).message
              : String(err);
          throw new Error('Invalid JSON response: ' + message);
        }

        const finishedVideos = data.filter(
          (video) => video.status === 'Finished'
        );
        setReplays(finishedVideos);
      } catch (error: any) {
        console.error('Error fetching replay videos:', error.message);
        Alert.alert('Error', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReplays();
  }, []);

  const formatDuration = (length: number) => {
    const minutes = Math.floor(length / 60);
    const seconds = length % 60;
    return `${minutes}m ${seconds}s`;
  };

  const renderReplayItem = ({ item }: { item: ReplayVideo }) => (
    <TouchableOpacity
      style={[liveReplayStyles.replayItem, { backgroundColor: theme.background }]}
      onPress={() =>
        navigation.navigate('ReplayDetail', {
          replayData: {
            id: item.uuid,
            title: item.title,
            thumbnail: item.thumbnail_url,
            duration: item.length.toString(),
            hls_url: item.hls_url,
            timeAgo: 'N/A',
          },
        })
      }
    >
      <Image
        source={{ uri: item.thumbnail_url }}
        style={liveReplayStyles.thumbnail}
        resizeMode="cover"
      />
      <View style={liveReplayStyles.contentContainer}>
        <Text style={[liveReplayStyles.title, { color: theme.text.primary }]}>{item.title}</Text>
        <Text style={[liveReplayStyles.subText, { color: theme.text.primary }]}>
          {formatDuration(item.length)}
        </Text>
      </View>
      <View style={[liveReplayStyles.playButton, { backgroundColor: theme.primary }]}>
        <Play size={20} color={colors.white} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[liveReplayStyles.container, { backgroundColor: theme.background }]} edges={['left', 'right']}>
      {isLoading ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading...</Text>
      ) : (
        <FlatList
          data={replays}
          renderItem={renderReplayItem}
          keyExtractor={(item) => item.uuid}
          contentContainerStyle={liveReplayStyles.listContent}
        />
      )}
    </SafeAreaView>
  );
}
