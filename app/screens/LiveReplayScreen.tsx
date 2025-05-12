import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Play } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { RootStackParamList } from '../../App';
import { liveReplayStyles } from '../styles/screens.styles';
import { colors } from '../theme/colors';

type LiveReplayScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'LiveReplay'>;
};

type ReplayItem = {
  id: string;
  title: string;
  thumbnail: string;
  timeAgo: string;
  duration: string;
  hls_url: string;
};

export default function LiveReplayScreen({
  navigation,
}: LiveReplayScreenProps) {
  const [replayData, setReplayData] = useState<ReplayItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReplays = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          'https://api.myfitpro.com/v1/business/993/videos'
        );

        console.log('Replay API Response:', response.data);

        const formatted = response.data.map((video: any) => ({
          id: String(video.id),
          title: video.title,
          thumbnail: video.thumbnail_url,
          timeAgo: formatTimeAgo(video.created_at),
          duration: `${Math.round(video.length / 60)} mins`,
          hls_url: video.hls_url,
        }));

        setReplayData(formatted);
      } catch (err) {
        console.error('Failed to fetch replays:', err);
        setError('Failed to load replay data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReplays();
  }, []);

  const formatTimeAgo = (createdAt: string): string => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now.getTime() - created.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  };

  const renderReplayItem = ({ item }: { item: ReplayItem }) => (
    <TouchableOpacity
      style={liveReplayStyles.replayItem}
      onPress={() => navigation.navigate('ReplayDetail', { replayData: item })}
    >
      <Image
        source={{ uri: item.thumbnail }}
        style={liveReplayStyles.thumbnail}
        resizeMode="cover"
      />
      <View style={liveReplayStyles.contentContainer}>
        <Text style={liveReplayStyles.title}>{item.title}</Text>
        <Text
          style={liveReplayStyles.subText}
        >{`${item.timeAgo} - ${item.duration}`}</Text>
      </View>
      <View style={liveReplayStyles.playButton}>
        <Play size={20} color={colors.white} />
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={liveReplayStyles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={liveReplayStyles.container}>
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>
          {error}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={liveReplayStyles.container}>
      <FlatList
        data={replayData}
        renderItem={renderReplayItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={liveReplayStyles.listContent}
      />
    </SafeAreaView>
  );
}
