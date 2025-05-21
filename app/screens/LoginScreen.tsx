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
  const [name, setName] = useState('');
  const [class_password, setPassword] = useState('');
  const [business_id, setID] = useState('');

  const handleLogin = async () => {
    const trimmedName = name.trim();
    const trimmedPassword = class_password.trim();
    const trimmedID = business_id.trim();

    if (!trimmedName || !trimmedPassword || !trimmedID) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('business_slug', ''); // as per your request sample, however Alex said the post data would just need to include name, class_password, and business_id.
    formData.append('business_id', trimmedID);
    formData.append('name', trimmedName);
    formData.append('class_password', trimmedPassword);

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
            placeholder="Class Password"
            value={class_password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="off"
          />

          <TextInput
            style={globalStyles.input}
            placeholder="Business ID"
            value={business_id}
            onChangeText={setID}
            secureTextEntry
            autoComplete="off"
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
              <Text
                style={globalStyles.linkText}
                onPress={() => console.log('Terms pressed')}
              >
                {' '}
                {/* TODO: Add Terms of Service link */}
                terms of service
              </Text>{' '}
              and{' '}
              <Text
                style={globalStyles.linkText}
                onPress={() => console.log('Privacy pressed')}
              >
                {' '}
                {/* TODO: Add Privacy Policy link */}
                privacy policy
              </Text>
            </Text>
          </View>

          <View style={loginStyles.contactContainer}>
            <Text style={loginStyles.termsText}>
              Not a member?{' '}
              <Text
                style={globalStyles.linkText}
                onPress={() => console.log('Contact pressed')}
              >
                {' '}
                {/* TODO: Add Contact Us link */}
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
