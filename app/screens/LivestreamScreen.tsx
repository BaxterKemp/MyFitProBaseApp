import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackActions } from '@react-navigation/native';
import { globalStyles, homeStyles, videoStyles } from '../styles/screens.styles';
import { RootStackParamList } from '../../App';
import { colors } from '../theme/colors';
import { EyeIcon } from 'lucide-react-native';

type LivestreamScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Livestream'>;
};

export default function LivestreamScreen({ navigation }: LivestreamScreenProps) {
    const handleLogout = () => {
        navigation.dispatch(StackActions.pop());
    };

    const handleLiveStream = () => {
        // Already on the LiveStream screen
    };

    const handleLiveReplay = () => {
        // TODO: Implement live replay functionality
        console.log('Live replay button pressed');
    };

    const handleViewersList = () => {
        navigation.navigate('ViewersList');
    };

    const isLive = true; // TODO: Implement API call to check if the business is live
    const viewerCount = 8; // Mock viewer count - would be replaced with API data

    return (
        <View style={globalStyles.container}>
            <View style={videoStyles.videoContainer}>
                {/* TODO: Add API Logo implementation */}
            </View>

            {/* Live indicator below logo */}
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
                    {/* TODO: Add API viewer count */}
                    <Text style={videoStyles.viewerCountText}>{viewerCount}</Text>
                </TouchableOpacity>
            </View>

            {/* Main buttons area */}
            <View style={homeStyles.buttonContainer}>

            </View>

            {/* Logout button at bottom */}
            <View style={homeStyles.logoutButtonContainer}>

            </View>
        </View>
    );
} 