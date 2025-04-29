import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';
import { LinkingProvider } from '@/context/LinkingContext';
import { ThemeProvider } from '@/context/ThemeContext';
import '../global.css';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinkingProvider>
      <ThemeProvider>
        <View className={`flex-1 bg-background dark:bg-background text-foreground dark:text-foreground ${colorScheme === 'dark' ? 'dark' : ''}`}>
          <Stack screenOptions={{ 
            headerShown: false,
            contentStyle: {
              backgroundColor: 'transparent',
            }
          }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="components" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </View>
      </ThemeProvider>
    </LinkingProvider>
  );
}
