import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Play } from 'lucide-react-native';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../App';
import { liveReplayStyles } from '../styles/screens.styles';
import { colors } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';

type LiveReplayScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'LiveReplay'>;
};

// Sample replay data - replace with real data from API
const replayData = [
    {
        id: '1',
        title: 'Morning Cardio Session',
        thumbnail: 'https://via.placeholder.com/120x80',
        timeAgo: '1 day ago',
        duration: '57 mins'
    },
    {
        id: '2',
        title: 'HIIT Workout Challenge',
        thumbnail: 'https://via.placeholder.com/120x80',
        timeAgo: '3 days ago',
        duration: '45 mins'
    },
    {
        id: '3',
        title: 'Yoga for Beginners',
        thumbnail: 'https://via.placeholder.com/120x80',
        timeAgo: '1 week ago',
        duration: '62 mins'
    },
    {
        id: '4',
        title: 'Full Body Strength Training',
        thumbnail: 'https://via.placeholder.com/120x80',
        timeAgo: '2 weeks ago',
        duration: '50 mins'
    }
];

export default function LiveReplayScreen({ navigation }: LiveReplayScreenProps) {
    const { theme } = useTheme();
    const renderReplayItem = ({ item }: { item: typeof replayData[0] }) => (
        <TouchableOpacity
            style={[liveReplayStyles.replayItem, {backgroundColor: theme.background}]}
            onPress={() => navigation.navigate('ReplayDetail', { replayData: item })}
        >
            <Image
                source={{ uri: item.thumbnail }}
                style={liveReplayStyles.thumbnail}
                resizeMode="cover"
            />
            <View style={liveReplayStyles.contentContainer}>
                <Text style={[liveReplayStyles.title, {color: theme.text.primary}]}>{item.title}</Text>
                <Text style={[liveReplayStyles.subText, {color: theme.text.primary}]}>{`${item.timeAgo} - ${item.duration}`}</Text>
            </View>
            <View style={[liveReplayStyles.playButton,{backgroundColor: theme.primary}]}>
                <Play size={20} color={colors.white} />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[liveReplayStyles.container,{backgroundColor: theme.background}]} edges={['left', 'right']}>
            <FlatList
                data={replayData}
                renderItem={renderReplayItem}
                keyExtractor={item => item.id}
                contentContainerStyle={liveReplayStyles.listContent}
            />
        </SafeAreaView>
    );
} 