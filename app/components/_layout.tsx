import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { Header } from '@/components/ui';

export default function ComponentsLayout() {
  const { colorScheme } = useColorScheme();
  
  return (
    <Stack
      screenOptions={{
        // Standard options that are supported by React Navigation
        headerShown: true,
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: 'transparent',
        },
        // Custom header background
        headerBackground: () => (
          <View className="absolute inset-0 bg-white dark:bg-gray-800 shadow-sm" />
        ),
        // Custom options for NativeWind styling
        headerClassName: "rounded-b-xl overflow-hidden",
        headerTitleClassName: "font-medium text-lg text-gray-900 dark:text-white",
      }}
    />
  );
} 