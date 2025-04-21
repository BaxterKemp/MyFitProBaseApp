import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackActions } from '@react-navigation/native';
import { globalStyles, homeStyles } from '../styles/screens.styles';
import { RootStackParamList } from '../../App';

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

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={globalStyles.headerContainer}>
                {/* TODO: Add API Logo implementation */}
            </View>

            {/* Live indicator below logo */}
            <View style={homeStyles.liveButtonContainer}>
                <View style={homeStyles.liveIndicator}>
                    <Text style={homeStyles.liveText}>● LIVE</Text>
                </View>
            </View>

            {/* Main buttons area */}
            <View style={homeStyles.buttonContainer}>

            </View>

            {/* Logout button at bottom */}
            <View style={homeStyles.logoutButtonContainer}>

            </View>
        </SafeAreaView>
    );
} 