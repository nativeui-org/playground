import React from 'react';
import { View } from 'react-native';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

interface IconProps {
  icon: any;
  size?: number;
  name: string;
  color?: string;
  className?: string;
}

export function Icon({ icon: IconComponent, size = 24, name, color, className }: IconProps) {
  return (
    <View className={cn('flex items-center justify-center', className)}>
      <IconComponent name={name} size={size} color={color} />
    </View>
  );
} 