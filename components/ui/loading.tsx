import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { cn } from '@/lib/utils';
import { useColorScheme } from 'nativewind';
import { cva, type VariantProps } from 'class-variance-authority';

const loadingVariants = cva(
  "items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        overlay: "bg-black/50 absolute inset-0 z-50",
        card: "bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700",
        minimal: "bg-transparent",
      },
      size: {
        default: "p-4",
        sm: "p-2",
        lg: "p-6",
        xl: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface LoadingProps extends VariantProps<typeof loadingVariants> {
  message?: string;
  messageClassName?: string;
  showSpinner?: boolean;
  spinnerSize?: 'small' | 'large';
  spinnerColor?: string;
  className?: string;
}

export function Loading({
  message,
  messageClassName,
  showSpinner = true,
  spinnerSize = 'small',
  spinnerColor,
  variant,
  size,
  className,
}: LoadingProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Utiliser des couleurs de thème plus modernes
  const defaultSpinnerColor = isDark ? '#60a5fa' : '#3b82f6'; // Bleu clair en mode sombre, bleu normal en mode clair
  const spinnerColorToUse = spinnerColor || defaultSpinnerColor;
  
  return (
    <View className={cn(loadingVariants({ variant, size, className }))}>
      {showSpinner && (
        <View className="mb-2">
          <ActivityIndicator 
            size={spinnerSize} 
            color={spinnerColorToUse} 
          />
        </View>
      )}
      
      {message && (
        <Text className={cn(
          "text-center text-sm font-medium text-gray-700 dark:text-gray-300",
          messageClassName
        )}>
          {message}
        </Text>
      )}
    </View>
  );
} 