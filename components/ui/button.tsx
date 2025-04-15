import React from 'react';
import { TouchableOpacity, Text, View, Pressable, ViewStyle, TextStyle } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';
import { cn } from '@/lib/utils';
import { Loader2 } from './icons/loader';

const buttonVariants = cva(
  "flex flex-row items-center justify-center gap-2 rounded-xl",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-xl px-3",
        lg: "h-10 rounded-xl px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Obtient les variantes de texte correspondant aux variantes de boutons
const textVariants = cva(
  "text-sm font-medium",
  {
    variants: {
      variant: {
        default: "text-primary-foreground",
        destructive: "text-destructive-foreground",
        outline: "text-foreground hover:text-accent-foreground",
        secondary: "text-secondary-foreground",
        ghost: "text-foreground hover:text-accent-foreground",
        link: "text-primary",
      },
      size: {
        default: "text-sm",
        sm: "text-xs",
        lg: "text-sm",
        icon: "text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps extends React.ComponentProps<typeof Pressable>, VariantProps<typeof buttonVariants> {
  // Props de base
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  
  // Contenu
  title?: string;
  icon?: React.ReactNode;
  
  // Props de style
  className?: string;
  textClassName?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  
  // Props avancées
  asChild?: boolean;
  children?: React.ReactNode;
  
  // Nouveau props pour le loader
  loadingText?: string;
}

const useColorScheme = () => {
  try {
    // Essayer d'utiliser le hook nativewind
    return useNativeWindColorScheme().colorScheme;
  } catch (e) {
    // Fallback vers le système d'exploitation
    try {
      // @ts-ignore - Ce hook existe souvent dans RN mais pourrait ne pas être typé
      const { useColorScheme: useNativeColorScheme } = require('react-native');
      return useNativeColorScheme();
    } catch (e) {
      // Dernier recours - retourner 'light'
      return 'light';
    }
  }
};

export const Button = React.forwardRef<View, ButtonProps>(
  ({ 
    className,
    textClassName,
    variant,
    size,
    asChild = false,
    onPress,
    disabled = false,
    loading = false,
    title,
    icon,
    loadingText,
    style,
    textStyle,
    children,
    ...props 
  }, ref) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    
    // Obtenir les classes pour le bouton et le texte
    const buttonClasses = cn(buttonVariants({ variant, size, className }));
    const textClasses = cn(textVariants({ variant, size, className: textClassName }));

    // Déterminer la couleur du loader en fonction de la variante
    const getLoaderColor = () => {
      if (variant === 'outline' || variant === 'ghost') {
        return isDark ? '#60a5fa' : '#3b82f6';
      }
      if (variant === 'default') {
        // Toujours blanc pour le bouton primary, quel que soit le thème
        return '#ffffff';
      }
      if (variant === 'destructive') {
        return '#ffffff';
      }
      if (variant === 'secondary') {
        return isDark ? '#ffffff' : '#1f2937';
      }
      return '#ffffff';
    };
    
    // Si asChild est vrai, on délègue au composant enfant
    if (asChild && React.Children.count(children) === 1) {
      // On suppose que l'enfant est un élément React valide
      const child = React.Children.only(children) as React.ReactElement;
      
      return React.cloneElement(child, {
        ref,
        className: cn(child.props.className, buttonClasses),
        disabled: disabled || loading,
        onPress,
        ...props,
      });
    }
    
    // Rendu par défaut
    return (
      <Pressable
        ref={ref as React.RefObject<View>}
        className={`${buttonClasses} ${disabled || loading ? 'opacity-70' : ''}`}
        onPress={onPress}
        disabled={disabled || loading}
        style={style}
        android_ripple={{ color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
        {...props}
      >
        {({ pressed }) => (
          <View className={`flex-row items-center justify-center gap-2 ${pressed ? 'opacity-80' : ''}`}>
            {loading && (
              <View className="mr-2">
                <Loader2 color={getLoaderColor()} />
              </View>
            )}
            
            {!loading && icon && icon}
            
            {title && (
              <Text className={textClasses} style={textStyle}>
                {loading && loadingText ? loadingText : title}
              </Text>
            )}
            
            {!title && children && (
              typeof children === 'string' 
                ? <Text className={textClasses} style={textStyle}>{loading && loadingText ? loadingText : children}</Text> 
                : children
            )}
          </View>
        )}
      </Pressable>
    );
  }
);

Button.displayName = "Button";

export { buttonVariants }; 