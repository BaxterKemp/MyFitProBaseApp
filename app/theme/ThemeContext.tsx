import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

type Theme = {
    primary: string,
    background: string,
    text: {
        primary: string,
        secondary: string,
    },
    border: string,
    white: string,
    live: string,
    logo?: string,
    banner?: string,
};


const defaultTheme: Theme = {
    primary: '#000000',
    background: '#FFFFFF',
    text: {
        primary: '#000000',
        secondary: '#666666',
    },
    border: '#DDDDDD',
    white: '#FFFFFF',
    live: '#FF0000',
};


const ThemeContext = createContext<{
  theme: Theme;
}>({ theme: defaultTheme });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await axios.get('https://api.myfitpro.com/v1/branded-app/business/993');
        setTheme({
            primary: response.data.light_button_colour,
            background: response.data.light_background_colour,
            text: {
                primary: response.data.light_text_colour,
                secondary: response.data.light_text_colour,
            },
            border: '#DDDDDD',
            white: '#FFFFFF',
            live: '#FF0000',
            logo: response.data.app_icon,
            banner: response.data.app_logo_light
      });
      } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Theme API error:', {
              status: error.response?.status,
              data: error.response?.data,
            });
          } else {
            console.error('erro loading theme:', error);
          }
        setTheme(defaultTheme); 
      }
    };
  
    fetchTheme();
  }, []);


  if (!theme) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
