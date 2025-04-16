import * as React from 'react';
import { Pressable, PressableProps as RNPressableProps, View, ViewStyle, PressableStateCallbackType } from 'react-native';
import { cn } from '@/lib/utils';
import { buttonVariants, type ButtonVariants } from './button-variants';

export interface ButtonProps extends Omit<RNPressableProps, 'style'>, ButtonVariants {
  className?: string;
  style?: ViewStyle;
  asChild?: boolean;
}

const Button = React.forwardRef<View, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    return (
      <Pressable
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {(state: PressableStateCallbackType) => (
          <View className={`flex-row items-center justify-center gap-2 ${state.pressed ? 'opacity-80' : ''}`}>
            {typeof children === 'function' ? children(state) : children}
          </View>
        )}
      </Pressable>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants }; 