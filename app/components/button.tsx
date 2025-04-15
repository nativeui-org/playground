import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, ThemeToggle } from '@/components/ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { Stack } from 'expo-router';

export default function ButtonScreen() {
  const [counter, setCounter] = useState(0);
  const { isDarkMode } = useTheme();

  return (
    <>
      <Stack.Screen options={{ 
        title: 'Button',
        headerRight: () => <ThemeToggle />,
      }} />
      
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={['bottom']}>
        <ScrollView className="px-5 py-5">
          <View className="mb-6">
            <Text className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Button</Text>
            <Text className="text-base mb-4 text-gray-700 dark:text-gray-300">Un composant bouton flexible avec différentes variantes et tailles</Text>
          </View>
          
          <Text className="text-base font-semibold text-gray-900 dark:text-white">Counter: {counter}</Text>

          <View className="mb-6 mt-6">
            <Text className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Variantes de bouton</Text>
            
            <View className="gap-4">
              <View className="flex-row gap-3 flex-wrap">
                <Button 
                  variant="default" 
                  onPress={() => setCounter(counter + 1)} 
                >
                  Default
                </Button>
                
                <Button 
                  variant="destructive" 
                  onPress={() => setCounter(counter + 1)}
                >
                  Destructive
                </Button>
                
                <Button 
                  variant="outline" 
                  onPress={() => setCounter(counter + 1)}
                >
                  Outline
                </Button>
              </View>
              
              <View className="flex-row gap-3 flex-wrap">
                <Button 
                  variant="secondary" 
                  onPress={() => setCounter(counter + 1)}
                >
                  Secondary
                </Button>
                
                <Button 
                  variant="ghost" 
                  onPress={() => setCounter(counter + 1)}
                >
                  Ghost
                </Button>
                
                <Button 
                  variant="link" 
                  onPress={() => setCounter(counter + 1)}
                >
                  Link
                </Button>
              </View>
            </View>
          </View>
          
          <View className="mb-6">
            <Text className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Tailles de bouton</Text>
            
            <View className="gap-4">
              <View className="flex-row gap-3 items-center flex-wrap">
                <Button 
                  size="sm" 
                  onPress={() => setCounter(counter + 1)}
                >
                  Small
                </Button>
                
                <Button 
                  size="default" 
                  onPress={() => setCounter(counter + 1)}
                >
                  Default
                </Button>
                
                <Button 
                  size="lg" 
                  onPress={() => setCounter(counter + 1)}
                >
                  Large
                </Button>
                
                <Button 
                  size="icon" 
                  onPress={() => setCounter(counter + 1)}
                >
                  <Feather name="plus" size={16} />
                </Button>
              </View>
            </View>
          </View>
          
          <View className="mb-6">
            <Text className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">États du bouton</Text>
            
            <View className="gap-4">
              <View className="flex-row gap-3 flex-wrap">
                <Button 
                  disabled 
                  onPress={() => setCounter(counter + 1)}
                >
                  Disabled
                </Button>
                
                <Button 
                  loading 
                  onPress={() => setCounter(counter + 1)}
                >
                  Loading
                </Button>
              </View>
            </View>
          </View>
          
          <View className="mb-6">
            <Text className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Bouton avec icône</Text>
            
            <View className="gap-4">
              <View className="flex-row gap-3 flex-wrap">
                <Button 
                  onPress={() => setCounter(counter + 1)}
                  icon={<Feather name="plus" size={16} />}
                >
                  With Icon
                </Button>
                
                <Button 
                  variant="outline"
                  onPress={() => setCounter(counter + 1)}
                  icon={<Feather name="settings" size={16} />}
                >
                  Settings
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
} 