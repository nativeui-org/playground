import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useColorScheme } from 'nativewind';

interface LoaderProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

export function Loader({ 
  size = 24, 
  color, 
  strokeWidth = 2,
  className = "" 
}: LoaderProps) {
  const spinValue = useRef(new Animated.Value(0)).current;
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Utiliser la couleur transmise ou la couleur par défaut selon le thème
  const finalColor = color || (isDark ? '#f1f5f9' : '#1e293b');

  useEffect(() => {
    // Configuration de l'animation de rotation continue
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    
    // Démarrer l'animation
    spinAnimation.start();
    
    // Nettoyer l'animation au démontage
    return () => {
      spinAnimation.stop();
    };
  }, [spinValue]);

  // Mapper la valeur d'animation à une rotation en degrés
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle 
            cx="12" 
            cy="12" 
            r="10" 
            stroke={finalColor}
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
            strokeDasharray="60 30" 
            opacity="0.7"
          />
        </Svg>
      </Animated.View>
    </View>
  );
}

// Version plus petite du loader
export function Loader2({ size = 16, ...props }: LoaderProps) {
  return <Loader size={size} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 