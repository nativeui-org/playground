import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { ThemeToggle } from '@/components/ui';
import { componentsList, ComponentItem } from '@/config/components-list';
import { useRouter } from 'expo-router';

export default function ComponentsListScreen() {
  const { isDarkMode } = useTheme();
  const router = useRouter();

  const renderItem = ({ item }: { item: ComponentItem }) => (
    <Pressable 
      className="flex-row items-center p-4 mb-2 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      onPress={() => router.push(item.route as any)}
    >
      <View className="rounded-full p-2 mr-4 bg-gray-100 dark:bg-gray-700">
        <Feather 
          name={item.icon} 
          size={24} 
          color={isDarkMode ? '#fff' : '#1f2937'} 
        />
      </View>
      <View className="flex-1">
        <Text className="text-lg font-semibold text-gray-900 dark:text-white">
          {item.name}
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-300">
          {item.description}
        </Text>
      </View>
      <Feather 
        name="chevron-right" 
        size={20} 
        color={isDarkMode ? '#9ca3af' : '#6b7280'} 
      />
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1" edges={['top']}>
      <View className="flex-row justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <View>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">NativeUI</Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400">
            Bibliothèque de composants React Native
          </Text>
        </View>
        <ThemeToggle />
      </View>

      <FlatList
        data={componentsList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-4"
        ListHeaderComponent={
          <View className="mb-4">
            <Text className="text-lg font-medium mb-1 text-gray-900 dark:text-white">
              Composants disponibles
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Tapez sur un composant pour voir les détails et les exemples
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
} 