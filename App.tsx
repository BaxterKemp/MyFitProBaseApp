import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { View, TouchableOpacity } from 'react-native';
import { Cast, Settings } from 'lucide-react-native';

// Import screens
import LoginScreen from './app/screens/LoginScreen';
import HomeScreen from './app/screens/HomeScreen';
import LivestreamScreen from './app/screens/LivestreamScreen';
import ViewersListScreen from './app/screens/ViewersListScreen';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Define the stack navigator parameter list
export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Livestream: undefined;
    ViewersList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Logo placeholder component
const LogoTitle = () => {
    return (
        <View style={{
            width: 120,
            height: 36,
            backgroundColor: 'lightgray',
            borderRadius: 4
        }} />
    );
};

export default function App() {
    useEffect(() => {
        // Hide the splash screen after we've handled any initial setup
        SplashScreen.hideAsync();
    }, []);

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <StatusBar style="auto" />
                <Stack.Navigator
                    screenOptions={{
                        headerTitle: () => <LogoTitle />,
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: 'white',
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
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
} 