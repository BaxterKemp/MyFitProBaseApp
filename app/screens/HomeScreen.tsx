import { StackActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../App';
import { globalStyles, homeStyles } from '../styles/screens.styles';
import { useTheme } from '../theme/ThemeContext';
import { colors } from '../theme/colors';

type HomeScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
    const { theme } = useTheme();
    const handleLogout = () => {
        navigation.dispatch(StackActions.pop());
    };

    const handleLivestream = () => {
        navigation.navigate('Livestream');
    };

    const handleLiveReplay = () => {
        navigation.navigate('LiveReplay');
    };

    const isLive = true; // TODO: Implement API call to check if the business is live

    return (
        <View style={[globalStyles.container, {backgroundColor: theme.background}]}>
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
                    style={[homeStyles.button, homeStyles.mainButton, {backgroundColor: theme.primary}]}
                    onPress={handleLivestream}
                >
                    <Text style={globalStyles.primaryButtonText}>Live Stream</Text>
                </TouchableOpacity>
                {true && ( // TODO: Only show if business has Live Replay enabled
                    <TouchableOpacity
                        style={[homeStyles.button, homeStyles.mainButton,  {backgroundColor: theme.primary}]}
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