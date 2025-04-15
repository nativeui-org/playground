import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Feather } from '@expo/vector-icons';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center rounded-full p-2 ${
        isDarkMode 
          ? 'bg-primary' 
          : 'bg-secondary'
      } ${className}`}
      onPress={toggleTheme}
      accessibilityLabel="Basculer entre le mode clair et sombre"
      accessibilityRole="button"
    >
      <View className="flex-row items-center gap-2">
        {isDarkMode ? (
          <>
            <Feather name="sun" size={18} color="#111827" />
            <Text className="text-sm font-medium text-primary-foreground">Mode clair</Text>
          </>
        ) : (
          <>
            <Feather name="moon" size={18} color="#1f2937" />
            <Text className="text-sm font-medium text-secondary-foreground">Mode sombre</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
} 