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

  const transformThemeFromAPI = (apiData: any): Theme => ({
    primary: apiData.light_button_colour,
    background: apiData.light_background_colour,
    text: {
        primary: apiData.light_text_colour,
        secondary: apiData.light_text_colour,
    },
    border: '#DDDDDD',
    white: '#FFFFFF',
    live: '#FF0000',
    logo: apiData.app_icon,
    banner: apiData.app_logo_light
  });

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const res = await axios.get('https://api.myfitpro.com/v1/branded-app/business/993');
        const transformedTheme = transformThemeFromAPI(res.data);
        setTheme(transformedTheme);
        console.log(res.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Theme API error:', {
              status: error.response?.status,
              data: error.response?.data,
            });
          } else {
            console.error('Unknown error loading theme:', error);
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
