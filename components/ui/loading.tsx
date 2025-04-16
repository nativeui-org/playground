import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Loader } from './icons/loader';

interface LoadingProps {
  text?: string;
  size?: number;
  color?: string;
}

export function Loading({ text, size = 24, color }: LoadingProps) {
  const { isDarkMode } = useTheme();

  const defaultSpinnerColor = isDarkMode ? '#60a5fa' : '#3b82f6';

  return (
    <View className="flex-row items-center justify-center p-4">
      <Loader size={size} color={color || defaultSpinnerColor} />
      {text && (
        <Text className="ml-2 text-base text-gray-700 dark:text-gray-300">
          {text}
        </Text>
      )}
    </View>
  );
} 