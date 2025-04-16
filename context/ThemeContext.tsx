import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'nativewind';

// Theme configuration - obsolète, utilisez les variables CSS dans global.css
// Conservé pour la compatibilité avec le code existant
export const themeConfig = {
  light: {
    background: '#ffffff',
    foreground: '#1f2937',
    primary: '#1f2937', // Noir en mode clair
    primaryForeground: '#ffffff', // Texte blanc sur fond primaire
    secondary: '#f1f5f9',
    secondaryForeground: '#1f2937',
    accent: '#e5e7eb',
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',
    border: '#e5e7eb',
    input: '#f3f4f6',
    ring: '#1f2937',
  },
  dark: {
    background: '#0f172a',
    foreground: '#ffffff',
    primary: '#ffffff', // Blanc en mode sombre
    primaryForeground: '#0f172a', // Texte noir sur fond primaire
    secondary: '#334155',
    secondaryForeground: '#ffffff',
    accent: '#1e293b',
    destructive: '#dc2626',
    destructiveForeground: '#ffffff',
    border: '#1e293b',
    input: '#1e293b',
    ring: '#cbd5e1',
  },
};

// Theme types
export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const deviceColorScheme = useDeviceColorScheme();
  const { colorScheme, setColorScheme } = useColorScheme();
  const [theme, setThemeState] = useState<Theme>('system');

  // Effect to load theme from AsyncStorage on initial load
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          setThemeState(savedTheme as Theme);
          
          // Apply the correct color scheme to NativeWind
          if (savedTheme === 'system') {
            setColorScheme(deviceColorScheme || 'light');
          } else {
            setColorScheme(savedTheme as 'light' | 'dark');
          }
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };
    loadTheme();
  }, []);

  // Effect to handle system theme changes when using 'system' theme
  useEffect(() => {
    if (theme === 'system') {
      setColorScheme(deviceColorScheme || 'light');
    }
  }, [deviceColorScheme, theme]);

  // Ensure the colorScheme is always correctly applied
  useEffect(() => {
    const currentMode = theme === 'system' ? deviceColorScheme : theme;
    if (currentMode && currentMode !== colorScheme) {
      setColorScheme(currentMode as 'light' | 'dark');
    }
  }, [theme, colorScheme, deviceColorScheme]);

  const setTheme = async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem('theme', newTheme);
      setThemeState(newTheme);
      
      // Apply the correct color scheme to NativeWind
      if (newTheme === 'system') {
        setColorScheme(deviceColorScheme || 'light');
      } else {
        setColorScheme(newTheme);
      }

      console.log(`Theme set to: ${newTheme}, ColorScheme: ${newTheme === 'system' ? deviceColorScheme : newTheme}`);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const isDarkMode = colorScheme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 