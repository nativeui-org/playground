import React from 'react';
import { Link, Stack } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ 
        title: 'Page non trouvée',
        headerTintColor: '#1f2937',
        headerBackground: () => (
          <View className="absolute inset-0 bg-white dark:bg-gray-800" />
        ),
        headerTitleStyle: {
          color: 'black',
        },
      }} />
      
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900 items-center justify-center px-4">
        <View className="items-center mb-8">
          <Feather name="alert-triangle" size={60} color="#f59e0b" />
          <Text className="text-2xl font-bold mt-4 text-gray-900 dark:text-white">
            Oups !
          </Text>
          <Text className="text-lg text-center mt-2 text-gray-700 dark:text-gray-300">
            La page que vous recherchez n'existe pas.
          </Text>
        </View>
        
        <Link href="/" asChild>
          <TouchableOpacity className="py-3 px-6 bg-primary rounded-xl flex-row items-center">
            <Feather name="home" size={18} color="white" className="dark:text-gray-900 mr-2" />
            <Text className="text-primary-foreground font-medium">Retour à l'accueil</Text>
          </TouchableOpacity>
        </Link>
      </SafeAreaView>
    </>
  );
}
