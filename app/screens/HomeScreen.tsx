import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackActions } from '@react-navigation/native';
import { globalStyles, homeStyles } from '../styles/screens.styles';
import { RootStackParamList } from '../../App';

type HomeScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
    const handleLogout = () => {
        navigation.dispatch(StackActions.pop());
    };

    const handleLivestream = () => {
        navigation.navigate('Livestream');
    };

    const handleLiveReplay = () => {
        // TODO: Implement live replay functionality
        console.log('Live replay button pressed');
    };

    const isLive = true; // TODO: Implement API call to check if the business is live

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.headerContainer}>
                {/* TODO: Add API Logo implementation */}
            </View>

            {/* Live indicator */}
            {isLive ?
                <View style={homeStyles.liveButtonContainer}>
                    <View style={homeStyles.liveIndicator}>
                        <Text style={homeStyles.liveText}>● LIVE</Text>
                    </View>
                </View>
                : <View style={homeStyles.liveButtonContainer}>
                    <View style={homeStyles.offlineIndicator}>
                        <Text style={homeStyles.offlineText}>OFFLINE</Text>
                    </View>
                </View>}


            {/* Main buttons area */}
            <View style={homeStyles.buttonContainer}>
                <TouchableOpacity
                    style={[homeStyles.button, homeStyles.mainButton]}
                    onPress={handleLivestream}
                >
                    <Text style={globalStyles.primaryButtonText}>Live Stream</Text>
                </TouchableOpacity>
                {true && ( // TODO: Only show if business has Live Replay enabled
                    <TouchableOpacity
                        style={[homeStyles.button, homeStyles.mainButton]}
                        onPress={handleLiveReplay}
                    >
                        <Text style={globalStyles.primaryButtonText}>Live Replay</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Logout button at bottom */}
            <View style={homeStyles.logoutButtonContainer}>
                <TouchableOpacity
                    style={[homeStyles.button, homeStyles.logoutButton]}
                    onPress={handleLogout}
                >
                    <Text style={homeStyles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
} 