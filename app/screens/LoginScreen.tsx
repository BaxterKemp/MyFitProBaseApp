import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../App';
import { globalStyles, loginStyles } from '../styles/screens.styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


type LoginScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            alert('Please enter both email and password.');
            return;
        }
    
        const form = new FormData();
        form.append('email', email.trim());
        form.append('password', password.trim());
    
        const options = {
            method: 'POST',
            url: 'https://api.myfitpro.com/v1/user/login',
            headers: {
                'Content-Type': 'multipart/form-data', // Do NOT add boundary manually
                Accept: 'application/json',
            },
            data: form,
        };
    
        try {
            const { data } = await axios.request(options);
            console.log('Login successful:', data);
    
            // Store token if needed
            // await AsyncStorage.setItem('authToken', data.token);
    
            navigation.push('Home');
        } catch (error: any) {
            console.error('Login error:', error.response?.data || error.message);
            alert('Login failed. Please try again.');
        }
    };
    
    return (
        <SafeAreaView style={[globalStyles.container, styles.container]}>
            <View style={globalStyles.headerContainer}>
                {/* TODO: Add API Logo implementation */}
            </View>

            <View style={globalStyles.mainContent}>
                <View style={globalStyles.formContainer}>
                    <TextInput
                        style={globalStyles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="words"
                    />

                    <TextInput
                        style={globalStyles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity
                        style={globalStyles.primaryButton}
                        onPress={handleLogin}
                    >
                        <Text style={globalStyles.primaryButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>

                <View style={globalStyles.bottomContent}>
                    <View style={loginStyles.termsContainer}>
                        <Text style={loginStyles.termsText}>
                            By continuing you accept our{' '}
                            <Text style={globalStyles.linkText} onPress={() => console.log('Terms pressed')}> {/* TODO: Add Terms of Service link */}
                                terms of service
                            </Text>
                            {' '}and{' '}
                            <Text style={globalStyles.linkText} onPress={() => console.log('Privacy pressed')}> {/* TODO: Add Privacy Policy link */}
                                privacy policy
                            </Text>
                        </Text>
                    </View>

                    <View style={loginStyles.contactContainer}>
                        <Text style={loginStyles.termsText}>
                            Not a member?{' '}
                            <Text style={globalStyles.linkText} onPress={() => console.log('Contact pressed')}> {/* TODO: Add Contact Us link */}
                                Contact us
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    }
}); 