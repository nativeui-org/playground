import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { cn } from '@/lib/utils';
import { useColorScheme } from 'nativewind';

type FeatherIconName = React.ComponentProps<typeof Feather>['name'];

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  backButtonIcon?: FeatherIconName;
  rightContent?: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

export function Header({
  title,
  showBackButton = true,
  backButtonIcon = 'chevron-left',
  rightContent,
  className,
  titleClassName,
}: HeaderProps) {
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const canGoBack = navigation.canGoBack();
  
  return (
    <View className={cn(
      "flex-row items-center justify-between p-4 bg-white dark:bg-gray-800",
      className
    )}>
      <View className="flex-row items-center">
        {showBackButton && canGoBack && (
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="mr-4 rounded-full p-2 bg-secondary dark:bg-secondary-dark"
            accessibilityLabel="Back"
            accessibilityRole="button"
          >
            <Feather name={backButtonIcon} size={20} color={isDark ? '#fff' : '#1f2937'} />
          </TouchableOpacity>
        )}
        
        <Text className={cn(
          "text-xl font-semibold text-gray-900 dark:text-white",
          titleClassName
        )}>
          {title}
        </Text>
      </View>
      
      {rightContent && (
        <View>
          {rightContent}
        </View>
      )}
    </View>
  );
} 