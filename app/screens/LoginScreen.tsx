import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, Image, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../App';
import { globalStyles, loginStyles } from '../styles/screens.styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from '../theme/ThemeContext';
import { BUSINESS_ID } from '../Business_ID';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [name, setName] = useState('');
  const [class_password, setPassword] = useState('');
  const { theme } = useTheme();


  const handleLogin = async () => {
    const trimmedName = name.trim();
    const trimmedPassword = class_password.trim();
    


    if (!trimmedName || !trimmedPassword) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', trimmedName);
    formData.append('class_password', trimmedPassword);
    formData.append('business_id', BUSINESS_ID);


    try {
      const response = await axios.post(
        'https://api.myfitpro.com/v1/login',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
        }
      );

      const data = response.data;

      if (data.token) {
        await AsyncStorage.setItem('Token', data.token);
        console.log("This is token data: " + data.token);

        // Optional: Store more for future use
        await AsyncStorage.setItem('LoginInfo', JSON.stringify({
          name: data.name,
          login_id: data.login_id,
          business_id: data.business_id,
          business_slug: data.business_slug,
          expires_at: data.expires_at
        }));

        console.log('Login successful:', data.message);
        navigation.replace('Home'); // Navigate to homepage
      } else {
        Alert.alert('Login Failed', 'No token received from server.');
      }

    } catch (error: any) {
      const message = error?.response?.data?.message || 'Login failed. Please check your credentials.';
      console.error('Login error:', message);
      Alert.alert('Login Failed', message);
    }
  };

  return (
    <SafeAreaView style={[globalStyles.container, styles.container, { backgroundColor: theme.background }]}>
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
            placeholder="Class Password"
            value={class_password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="off"
          />

          <TouchableOpacity
            style={[globalStyles.primaryButton, { backgroundColor: theme.primary }]}
            onPress={handleLogin}
          >
            <Text style={globalStyles.primaryButtonText}>Login</Text>
            {/* [globalStyles.primaryButtonText,{color: theme.text.primary}] */}
          </TouchableOpacity>
        </View>

        <View style={globalStyles.bottomContent}>
          <View style={loginStyles.termsContainer}>
            <Text style={[loginStyles.termsText, { color: theme.text.primary }]}>
              By continuing you accept our{' '}
              <Text style={[globalStyles.linkText, { color: theme.text.primary }]} onPress={() => console.log('Terms pressed')}> {/* TODO: Add Terms of Service link */}
                terms of service
              </Text>
              {' '}and{' '}
              <Text style={[globalStyles.linkText, { color: theme.text.primary }]} onPress={() => console.log('Privacy pressed')}> {/* TODO: Add Privacy Policy link */}
                privacy policy
              </Text>
            </Text>
          </View>

          <View style={loginStyles.contactContainer}>
            <Text style={[loginStyles.termsText, { color: theme.text.primary }]}>
              Not a member?{' '}
              <Text style={[globalStyles.linkText, { color: theme.text.primary }]} onPress={() => console.log('Contact pressed')}> {/* TODO: Add Contact Us link */}
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
  },
});
