import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video, ResizeMode } from 'expo-av';
import { RootStackParamList } from '../../App';
import { replayDetailStyles } from '../styles/screens.styles';

type ReplayData = {
  id: string;
  title: string;
  thumbnail: string;
  timeAgo: string;
  duration: string;
  hls_url: string;
};

type ReplayDetailScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ReplayDetail'>;
  route: RouteProp<RootStackParamList, 'ReplayDetail'>;
};

export default function ReplayDetailScreen({ route }: ReplayDetailScreenProps) {
  const { replayData } = route.params as { replayData: ReplayData };

  const formatDuration = (length: number) => {
    const minutes = Math.floor(length / 60);
    const seconds = length % 60;
    return `${minutes}m ${seconds}s`;
  };

  if (!replayData) {
    return (
      <SafeAreaView style={replayDetailStyles.container}>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          Replay data not available.
        </Text>
      </SafeAreaView>
    );
  }

  if (!replayData.hls_url) {
    return (
      <SafeAreaView style={replayDetailStyles.container}>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          Video URL not available.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={replayDetailStyles.container} edges={['bottom']}>
      {/* Video Player */}
      <View
        style={{ width: '100%', aspectRatio: 16 / 9, backgroundColor: 'black' }}
      >
        <Video
          source={{ uri: replayData.hls_url }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      {/* Replay Details */}
      <View style={replayDetailStyles.content}>
        <View style={replayDetailStyles.detailsContainer}>
          <Text style={replayDetailStyles.title}>{replayData.title}</Text>
          <Text style={replayDetailStyles.timeInfo}>
            {`Duration: ${formatDuration(Number(replayData.duration))}`}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
