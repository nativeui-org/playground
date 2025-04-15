import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ThemeToggle } from '@/components/ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { Stack } from 'expo-router';

export default function ThemeToggleScreen() {
  const { isDarkMode, theme, setTheme } = useTheme();

  return (
    <>
      <Stack.Screen options={{ 
        title: 'Theme Toggle',
        headerRight: () => <ThemeToggle />,
      }} />
      
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={['bottom']}>
        <ScrollView className="px-5 py-5">
          <View className="mb-6">
            <Text className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Theme Toggle</Text>
            <Text className="text-base mb-4 text-gray-700 dark:text-gray-300">Un composant qui permet de basculer entre les modes clair et sombre</Text>
          </View>
          
          <View className="mb-6">
            <Text className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Aperçu</Text>
            
            <View className="gap-4">
              <View className="flex-row items-center gap-3 flex-wrap">
                <Text className="text-gray-900 dark:text-white">Mode actuel: {isDarkMode ? 'Sombre' : 'Clair'}</Text>
                <ThemeToggle />
              </View>
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Couleurs du thème</Text>
            
            <View className="p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <Text className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                Les couleurs s'inversent entre le mode clair et sombre
              </Text>
              
              <View className="flex-row flex-wrap gap-3 mb-4">
                <View className="items-center">
                  <View className="w-16 h-16 bg-primary rounded-lg mb-1"></View>
                  <Text className="text-xs text-gray-700 dark:text-gray-300">Primary</Text>
                </View>
                
                <View className="items-center">
                  <View className="w-16 h-16 bg-secondary rounded-lg mb-1"></View>
                  <Text className="text-xs text-gray-700 dark:text-gray-300">Secondary</Text>
                </View>
                
                <View className="items-center">
                  <View className="w-16 h-16 bg-accent rounded-lg mb-1"></View>
                  <Text className="text-xs text-gray-700 dark:text-gray-300">Accent</Text>
                </View>

                <View className="items-center">
                  <View className="w-16 h-16 bg-destructive rounded-lg mb-1"></View>
                  <Text className="text-xs text-gray-700 dark:text-gray-300">Destructive</Text>
                </View>
              </View>

              <View className="p-4 bg-primary rounded-lg">
                <Text className="text-primary-foreground font-medium">
                  Texte sur fond primaire
                </Text>
              </View>
            </View>
          </View>
          
          <View className="mb-6">
            <Text className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Variantes</Text>
            
            <View className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-sm font-medium text-gray-900 dark:text-white">Par défaut</Text>
                <ThemeToggle />
              </View>
              
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-sm font-medium text-gray-900 dark:text-white">Avec classe personnalisée</Text>
                <ThemeToggle className="bg-blue-500 dark:bg-blue-800" />
              </View>
              
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-medium text-gray-900 dark:text-white">Plus large</Text>
                <ThemeToggle className="w-44" />
              </View>
            </View>
          </View>
          
          <View className="mb-6">
            <Text className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">À propos</Text>
            
            <View className="p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <Text className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Le composant ThemeToggle utilise le contexte de thème pour basculer entre les modes sombre et clair.
              </Text>
              <Text className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Il s'adapte automatiquement au thème actuel et affiche l'icône et la couleur appropriées.
              </Text>
              <Text className="text-sm text-gray-700 dark:text-gray-300">
                Mode thème actuel: <Text className="font-bold">{theme}</Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
} 