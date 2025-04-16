import React, { useEffect, useRef } from 'react';
import { Animated, View, ViewStyle } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface LoaderProps {
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export function Loader({ size = 24, color, style }: LoaderProps) {
  const { isDarkMode } = useTheme();
  const spinValue = useRef(new Animated.Value(0)).current;

  const defaultColor = isDarkMode ? '#fff' : '#1f2937';
  const finalColor = color || defaultColor;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderWidth: 2,
          borderColor: finalColor,
          borderTopColor: 'transparent',
          borderRadius: size / 2,
          transform: [{ rotate: spin }],
        },
        style,
      ]}
    />
  );
}

export function SmallLoader({ color, style }: Omit<LoaderProps, 'size'>) {
  return <Loader size={16} color={color} style={style} />;
} 