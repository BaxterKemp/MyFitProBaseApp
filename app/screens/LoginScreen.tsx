import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Image, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../App';
import { globalStyles, loginStyles } from '../styles/screens.styles';
import { useTheme } from '../theme/ThemeContext';

type LoginScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const { theme } = useTheme();
    

    const handleLogin = () => {
        // TODO: Implement actual login logic
        console.log('Login pressed with:', { name, password });
        navigation.push('Home');
    };

    return (
        <SafeAreaView style={[globalStyles.container, styles.container, {backgroundColor: theme.background}]}>
            <Image
                source={{ uri: theme.logo }}
                style={globalStyles.headerContainer}
                />
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
                        style={[globalStyles.primaryButton,{ backgroundColor: theme.primary}]}
                        onPress={handleLogin}
                    >
                        <Text style={globalStyles.primaryButtonText}>Login</Text>
                        {/* [globalStyles.primaryButtonText,{color: theme.text.primary}] */}
                    </TouchableOpacity>
                </View>

                <View style={globalStyles.bottomContent}>
                    <View style={loginStyles.termsContainer}>
                        <Text style={[loginStyles.termsText,{color: theme.text.primary}]}>
                            By continuing you accept our{' '}
                            <Text style={[globalStyles.linkText, {color: theme.text.primary}]} onPress={() => console.log('Terms pressed')}> {/* TODO: Add Terms of Service link */}
                                terms of service
                            </Text>
                            {' '}and{' '}
                            <Text style={[globalStyles.linkText, {color: theme.text.primary}]} onPress={() => console.log('Privacy pressed')}> {/* TODO: Add Privacy Policy link */}
                                privacy policy
                            </Text>
                        </Text>
                    </View>

                    <View style={loginStyles.contactContainer}>
                        <Text style={[loginStyles.termsText, {color: theme.text.primary}]}>
                            Not a member?{' '}
                            <Text style={[globalStyles.linkText, {color: theme.text.primary}]} onPress={() => console.log('Contact pressed')}> {/* TODO: Add Contact Us link */}
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