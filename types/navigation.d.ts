import '@react-navigation/native-stack';
import 'expo-router';

// Extend the NativeStackNavigationOptions to include NativeWind class name properties
declare module '@react-navigation/native-stack' {
  export interface NativeStackNavigationOptions {
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