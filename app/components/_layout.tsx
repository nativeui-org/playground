import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { Header } from '@/components/ui';
import { useTheme } from '@/context/ThemeContext';

export default function ComponentsLayout() {
  const { colorScheme } = useColorScheme();
  const { isDarkMode } = useTheme();
  
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
        },
        headerTintColor: isDarkMode ? '#ffffff' : '#1f2937',
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: isDarkMode ? '#111827' : '#f9fafb',
        },
      }}
    />
  );
} 