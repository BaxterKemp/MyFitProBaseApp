import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, useTheme } from './app/theme/ThemeContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { View, TouchableOpacity, Image } from 'react-native';
import { Cast, Settings } from 'lucide-react-native';

// Import screens
import LoginScreen from './app/screens/LoginScreen';
import HomeScreen from './app/screens/HomeScreen';
import LivestreamScreen from './app/screens/LivestreamScreen';
import ViewersListScreen from './app/screens/ViewersListScreen';
import LiveReplayScreen from './app/screens/LiveReplayScreen';
import ReplayDetailScreen from './app/screens/ReplayDetailScreen';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Define the stack navigator parameter list
export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Livestream: undefined;
    ViewersList: undefined;
    LiveReplay: undefined;
    ReplayDetail: {
        replayData: {
            id: string;
            title: string;
            thumbnail: string;
            timeAgo: string;
            duration: string;
        }
    };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Logo placeholder component
const LogoTitle = () => {
    const { theme } = useTheme();
    return (
        <Image 
        source={{ uri: theme.logo }}
        style={{
        width: 120,
        height: 36,
        resizeMode: 'contain',
        }}
        />
    );
};

export default function App() {
    const { theme } = useTheme();
    useEffect(() => {
        // Hide the splash screen after we've handled any initial setup
        SplashScreen.hideAsync();
    }, []);

    return (
        <ThemeProvider>
            <SafeAreaProvider>
                <NavigationContainer>
                    <StatusBar style="auto" />
                    <Stack.Navigator
                        screenOptions={{
                            headerTitle: () => <LogoTitle />,
                            headerTitleAlign: 'center',
                            headerStyle: {
                                backgroundColor: theme.background,
                            },
                            headerShadowVisible: true,
                            animation: 'slide_from_right',
                            animationTypeForReplace: 'push',
                            gestureEnabled: true,
                            gestureDirection: 'horizontal',
                        }}
                    >
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{
                                headerTitle: "Home",
                                headerLeft: () => null,
                                headerBackVisible: false,
                                gestureEnabled: false,
                            }}
                        />
                        <Stack.Screen
                            name="Livestream"
                            component={LivestreamScreen}
                            options={{
                                headerShown: true,
                                headerBackTitle: "Leave",
                                headerRight: () => (
                                    <TouchableOpacity
                                        onPress={() => console.log('Cast button pressed')}
                                    >
                                        <Cast size={24} />
                                    </TouchableOpacity>
                                ),
                            }}
                        />
                        <Stack.Screen
                            name="ViewersList"
                            component={ViewersListScreen}
                            options={{
                                presentation: 'modal',
                                headerShown: false,
                                animation: 'slide_from_bottom',
                            }}
                        />
                        <Stack.Screen
                            name="LiveReplay"
                            component={LiveReplayScreen}
                            options={{
                                headerTitle: "Live Replay",
                                headerBackTitle: "Back",
                                headerShown: true,
                                animation: 'slide_from_right',
                                headerStyle:{
                                    backgroundColor: theme.background,
                                }
                            }}
                        />
                        <Stack.Screen
                            name="ReplayDetail"
                            component={ReplayDetailScreen}
                            options={{
                                headerTitle: "Replay",
                                headerShown: true,
                                animation: 'slide_from_right',
                                headerRight: () => (
                                    <TouchableOpacity
                                        onPress={() => console.log('Cast button pressed')}
                                    >
                                        <Cast size={24} />
                                    </TouchableOpacity>
                                ),
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </ThemeProvider>
    );
} 