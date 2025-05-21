import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video, ResizeMode } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { videoStyles } from '../styles/screens.styles';

type LivestreamData = {
  stream_url: string;
  title: string;
  viewer_count: number;
};

export default function LivestreamScreen() {
  const [streamData, setStreamData] = useState<LivestreamData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const fetchLivestreamData = async () => {
      setIsLoading(true);
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

        if (live) {
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchLivestreamData();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          {streamData.title}
        </Text>
        <Text style={{ color: 'gray' }}>{streamData.viewer_count} viewers</Text>
      </View>
    </SafeAreaView>
  );
}
