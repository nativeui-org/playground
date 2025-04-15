import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { Button, ThemeToggle, Loading, Loader, Loader2 } from '@/components/ui';

export default function CustomStylingScreen() {
  const { isDarkMode } = useTheme();
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [loadingVariant, setLoadingVariant] = useState<'default' | 'card' | 'overlay'>('default');
  const [buttonLoading, setButtonLoading] = useState<{[key: string]: boolean}>({});
  
  const simulateLoading = (variant: 'default' | 'card' | 'overlay') => {
    setLoadingVariant(variant);
    setLoadingVisible(true);
    setTimeout(() => setLoadingVisible(false), 3000);
  };
  
  const simulateButtonLoading = (buttonId: string) => {
    setButtonLoading(prev => ({ ...prev, [buttonId]: true }));
    setTimeout(() => {
      setButtonLoading(prev => ({ ...prev, [buttonId]: false }));
    }, 3000);
  };
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'ShadCN-Style UI',
          headerClassName: "rounded-b-xl overflow-hidden", 
          headerTitleClassName: "font-medium text-lg text-gray-900 dark:text-white",
          headerRight: () => <ThemeToggle />,
        }} 
      />
      
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={['bottom']}>
        <ScrollView className="flex-1 px-5 py-5">
          <View className="mb-6">
            <Text className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">ShadCN-Style Components</Text>
            <Text className="text-base mb-6 text-gray-700 dark:text-gray-300">
              Composants UI inspirés de ShadCN pour React Native
            </Text>
          </View>
          
          {/* Loader Components Section */}
          <View className="mb-8">
            <Text className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Loaders</Text>
            
            <View className="mb-6 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
              <Text className="font-medium mb-3 text-gray-900 dark:text-white">Loader Components</Text>
              
              <View className="flex-row flex-wrap gap-4 mb-2 items-center">
                <View className="items-center">
                  <Loader size={24} />
                  <Text className="text-xs mt-1 text-gray-500 dark:text-gray-400">Loader</Text>
                </View>
                
                <View className="items-center">
                  <Loader2 />
                  <Text className="text-xs mt-1 text-gray-500 dark:text-gray-400">Loader2</Text>
                </View>
                
                <View className="items-center">
                  <Loader color="#3b82f6" size={32} strokeWidth={3} />
                  <Text className="text-xs mt-1 text-gray-500 dark:text-gray-400">Custom</Text>
                </View>
              </View>
            </View>
            
            <View className="flex-row flex-wrap gap-4 mb-4">
              <Button 
                variant="default" 
                size="sm" 
                onPress={() => simulateLoading('default')}
                title="Loading par défaut"
              />
              
              <Button 
                variant="secondary" 
                size="sm" 
                onPress={() => simulateLoading('card')}
                title="Loading card"
              />
              
              <Button 
                variant="outline" 
                size="sm" 
                onPress={() => simulateLoading('overlay')}
                title="Loading overlay"
              />
            </View>
            
            {loadingVisible && loadingVariant === 'default' && (
              <View className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
                <Loading 
                  message="Chargement en cours..." 
                  spinnerSize="large"
                />
              </View>
            )}
            
            {loadingVisible && loadingVariant === 'card' && (
              <View className="mb-4">
                <Loading 
                  variant="card" 
                  message="Traitement de votre demande..." 
                  spinnerSize="small"
                />
              </View>
            )}
          </View>
          
          {/* Button Styles with Loading */}
          <View className="mb-8">
            <Text className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Boutons avec chargement</Text>
            
            <View className="space-y-4">
              <Button 
                variant="default" 
                title="Bouton primaire" 
                icon={<Feather name="check" size={18} color="white" />}
                loading={buttonLoading['primary']}
                loadingText="Chargement..."
                onPress={() => simulateButtonLoading('primary')}
              />
              
              <Button 
                variant="secondary" 
                title="Bouton secondaire" 
                loading={buttonLoading['secondary']}
                loadingText="Traitement..."
                onPress={() => simulateButtonLoading('secondary')}
              />
              
              <Button 
                variant="outline" 
                title="Bouton contour" 
                loading={buttonLoading['outline']}
                loadingText="Patientez..."
                onPress={() => simulateButtonLoading('outline')}
              />
              
              <Button 
                variant="destructive" 
                title="Bouton destructif" 
                icon={<Feather name="trash-2" size={18} color="white" />}
                loading={buttonLoading['destructive']}
                loadingText="Suppression..."
                onPress={() => simulateButtonLoading('destructive')}
              />
              
              <Button 
                variant="ghost" 
                title="Bouton fantôme" 
                loading={buttonLoading['ghost']}
                loadingText="En cours..."
                onPress={() => simulateButtonLoading('ghost')}
              />
            </View>
          </View>
        </ScrollView>
        
        {loadingVisible && loadingVariant === 'overlay' && (
          <Loading 
            variant="overlay" 
            message="Veuillez patienter..." 
            spinnerSize="large"
          />
        )}
      </SafeAreaView>
    </>
  );
} 