import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video, ResizeMode } from 'expo-av';
import { RootStackParamList } from '../../App';
import { replayDetailStyles, videoStyles } from '../styles/screens.styles';

type ReplayDetailScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ReplayDetail'>;
  route: RouteProp<RootStackParamList, 'ReplayDetail'>;
};

export default function ReplayDetailScreen({
  navigation,
  route,
}: ReplayDetailScreenProps) {
  const { replayData } = route.params;

  return (
    <SafeAreaView style={replayDetailStyles.container}>
      {/* Video section */}
      <View style={{ flexShrink: 0 }}>
        <View
          style={[
            videoStyles.videoContainer,
            { backgroundColor: '#333', height: 200 },
          ]}
        >
          <Video
            source={{ uri: replayData.hls_url }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            style={{ width: '100%', height: '100%' }}
            shouldPlay
            onError={(e) => console.log('Replay video error:', e)}
          />
        </View>
      </View>
      <View style={replayDetailStyles.content}>
        <View style={replayDetailStyles.detailsContainer}>
          <Text style={replayDetailStyles.title}>{replayData.title}</Text>
          <Text
            style={replayDetailStyles.timeInfo}
          >{`${replayData.timeAgo} - ${replayData.duration}`}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
