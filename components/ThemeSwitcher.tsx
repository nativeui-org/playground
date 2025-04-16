import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useColorScheme } from 'nativewind';

export function ThemeSwitcher() {
  const { theme, setTheme, toggleTheme, isDarkMode } = useTheme();
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex flex-col space-y-4 p-4 rounded-lg bg-muted">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-foreground font-medium">
          Mode actuel : {theme} ({isDarkMode ? 'sombre' : 'clair'})
        </Text>
        
        <Pressable 
          className="px-3 py-2 rounded-md bg-accent"
          onPress={toggleTheme}
        >
          <Text className="text-accent-foreground font-medium">
            Basculer
          </Text>
        </Pressable>
      </View>
      
      <View className="flex flex-row space-x-2 justify-between">
        <Pressable 
          className={`flex-1 px-3 py-2 rounded-md ${theme === 'light' ? 'bg-primary' : 'bg-secondary'}`}
          onPress={() => setTheme('light')}
        >
          <Text className={`text-center font-medium ${theme === 'light' ? 'text-primary-foreground' : 'text-secondary-foreground'}`}>
            Clair
          </Text>
        </Pressable>
        
        <Pressable 
          className={`flex-1 px-3 py-2 rounded-md ${theme === 'dark' ? 'bg-primary' : 'bg-secondary'}`}
          onPress={() => setTheme('dark')}
        >
          <Text className={`text-center font-medium ${theme === 'dark' ? 'text-primary-foreground' : 'text-secondary-foreground'}`}>
            Sombre
          </Text>
        </Pressable>
        
        <Pressable 
          className={`flex-1 px-3 py-2 rounded-md ${theme === 'system' ? 'bg-primary' : 'bg-secondary'}`}
          onPress={() => setTheme('system')}
        >
          <Text className={`text-center font-medium ${theme === 'system' ? 'text-primary-foreground' : 'text-secondary-foreground'}`}>
            Système
          </Text>
        </Pressable>
      </View>
      
      <View className="flex flex-row justify-between bg-background p-3 rounded-md">
        <Text className="text-foreground text-sm">Primary:</Text>
        <View className="h-6 w-6 rounded-full bg-primary" />
      </View>
      
      <View className="flex flex-row justify-between bg-background p-3 rounded-md">
        <Text className="text-foreground text-sm">Secondary:</Text>
        <View className="h-6 w-6 rounded-full bg-secondary" />
      </View>
    </View>
  );
} 