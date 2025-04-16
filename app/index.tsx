import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { ThemeToggle } from '@/components/ui';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { componentsList, ComponentItem } from '@/config/components-list';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';

export default function ComponentsListScreen() {
  const { theme } = useTheme();
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const isDarkMode = colorScheme === 'dark';

  const renderItem = ({ item }: { item: ComponentItem }) => (
    <Pressable 
      className="flex-row items-center p-4 mb-2 rounded-lg border bg-card border-border"
      onPress={() => router.push(item.route as any)}
    >
      <View className="rounded-full p-2 mr-4 bg-muted">
        <Feather 
          name={item.icon} 
          size={24} 
          color={isDarkMode ? '#fff' : '#1f2937'} 
        />
      </View>
      <View className="flex-1">
        <Text className="text-lg font-semibold text-foreground">
          {item.name}
        </Text>
        <Text className="text-sm text-muted-foreground">
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
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-row justify-between items-center p-4 border-b border-border">
        <View>
          <Text className="text-2xl font-bold text-foreground">NativeUI</Text>
          <Text className="text-sm text-muted-foreground">
            React Native Component Library
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
            <ThemeSwitcher />
            <Text className="text-lg font-medium mb-1 text-foreground mt-4">
              Available Components
            </Text>
            <Text className="text-sm text-muted-foreground mb-4">
              Tap on a component to see details and examples
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
} 