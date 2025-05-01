import { StackActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../App';
import { globalStyles, homeStyles } from '../styles/screens.styles';
import React, { useEffect, useRef, useState } from 'react';

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
        navigation.navigate('LiveReplay');
    };
        const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        const fetchLivestreamStatus = async () => {
            try {
                const response = await fetch('https://api.myfitpro.com/v1/business/YOUR_BUSINESS_ID/status');
                const data = await response.json();
                setIsLive(data.isLive);
            } catch (error) {
                console.error('Failed to fetch livestream status:', error);
                setIsLive(false);
            }
        };

        fetchLivestreamStatus();
    }, []);

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