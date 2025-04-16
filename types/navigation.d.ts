import '@react-navigation/native-stack';
import 'expo-router';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

// Extend the NativeStackNavigationOptions to include NativeWind class name properties
declare module '@react-navigation/native-stack' {
  interface NativeStackNavigationOptions {
    /**
     * Class name to apply NativeWind styles to the header
     */
    headerClassName?: string;
    
    /**
     * Class name to apply NativeWind styles to the header title
     */
    headerTitleClassName?: string;
    
    /**
     * Class name to apply NativeWind styles to the header left component
     */
    headerLeftClassName?: string;
    
    /**
     * Class name to apply NativeWind styles to the header right component
     */
    headerRightClassName?: string;
    
    /**
     * Class name to apply NativeWind styles to the header back button
     */
    headerBackClassName?: string;
    
    /**
     * Class name to apply NativeWind styles to the header background
     */
    headerBackgroundClassName?: string;
    
    // Make sure standard properties are recognized
    headerStyle?: any;
    headerTintColor?: string;
    headerShown?: boolean;
    headerShadowVisible?: boolean;
    title?: string;
    headerRight?: any;
    contentStyle?: any;
    headerTitleStyle?: any;
    headerBackground?: any;
  }
} 