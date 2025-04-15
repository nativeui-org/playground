import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useDeviceColorScheme } from 'react-native';

type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  setTheme: () => {},
  toggleTheme: () => {},
  isDarkMode: false,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeType>('system');
  const { colorScheme, setColorScheme } = useNativeWindColorScheme();
  const deviceColorScheme = useDeviceColorScheme() || 'light';

  // Récupérer le thème depuis le stockage au chargement
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme') as ThemeType | null;
        if (savedTheme) {
          setThemeState(savedTheme);
          if (savedTheme !== 'system') {
            setColorScheme(savedTheme);
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement du thème:', error);
      }
    };
    
    loadTheme();
  }, []);

  // Mettre à jour le colorScheme en fonction du thème sélectionné
  useEffect(() => {
    if (theme === 'system') {
      setColorScheme(deviceColorScheme);
    } else {
      setColorScheme(theme);
    }
  }, [theme, deviceColorScheme]);

  // Persister le thème dans le stockage
  const setTheme = async (newTheme: ThemeType) => {
    setThemeState(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du thème:', error);
    }
  };

  // Fonction pour basculer entre les thèmes dark/light (sans passer par system)
  const toggleTheme = () => {
    const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const isDarkMode = colorScheme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 