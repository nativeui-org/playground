import * as React from "react";
import { View, Text, Pressable, ViewStyle } from "react-native";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "flex-row items-center justify-center rounded-full px-2.5 py-1", 
  {
    variants: {
      variant: {
        default: "bg-primary",
        secondary: "bg-secondary",
        destructive: "bg-destructive",
        outline: "border border-input bg-transparent",
      },
      size: {
        default: "h-6",
        sm: "h-5 text-xs px-2",
        lg: "h-7 text-sm px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends VariantProps<typeof badgeVariants> {
  className?: string;
  style?: ViewStyle;
  label: string;
  onPress?: () => void;
}

function Badge({
  className,
  variant,
  size,
  style,
  label,
  onPress,
}: BadgeProps) {
  const content = (
    <View className={cn(badgeVariants({ variant, size, className }))} style={style}>
      <Text
        className={cn(
          "text-xs font-medium",
          variant === "default" && "text-primary-foreground",
          variant === "secondary" && "text-secondary-foreground",
          variant === "destructive" && "text-destructive-foreground",
          variant === "outline" && "text-foreground"
        )}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={label}
      >
        {({ pressed }) => (
          <View style={{ opacity: pressed ? 0.7 : 1 }}>
            {content}
          </View>
        )}
      </Pressable>
    );
  }

  return content;
}

Badge.displayName = "Badge";

export { Badge, badgeVariants }; 