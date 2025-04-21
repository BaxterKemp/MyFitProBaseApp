import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { globalStyles, loginStyles } from '../styles/screens.styles';
import { RootStackParamList } from '../../App';

type LoginScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // TODO: Implement actual login logic
        console.log('Login pressed with:', { name, password });
        navigation.push('Home');
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
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
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