import * as React from "react";
import { Image, View, Text, ImageSourcePropType, ImageStyle } from "react-native";
import { cn } from "@/lib/utils";

interface AvatarRootProps {
  className?: string;
  children: React.ReactNode;
}

const AvatarRoot = React.forwardRef<View, AvatarRootProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn(
          "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
          className
        )}
        {...props}
      >
        {children}
      </View>
    );
  }
);

interface AvatarImageProps {
  className?: string;
  source: ImageSourcePropType;
  alt?: string;
  style?: ImageStyle;
  onLoad?: () => void;
  onError?: () => void;
}

const AvatarImage = React.forwardRef<Image, AvatarImageProps>(
  ({ className, source, alt, ...props }, ref) => {
    const [hasError, setHasError] = React.useState(false);

    const handleError = () => {
      setHasError(true);
      props.onError?.();
    };

    if (hasError) {
      return null;
    }

    return (
      <Image
        ref={ref}
        source={source}
        accessibilityLabel={alt}
        className={cn("h-full w-full object-cover", className)}
        onError={handleError}
        {...props}
      />
    );
  }
);

interface AvatarFallbackProps {
  className?: string;
  children: React.ReactNode;
  delayMs?: number;
}

const AvatarFallback = React.forwardRef<View, AvatarFallbackProps>(
  ({ className, children, delayMs = 600, ...props }, ref) => {
    const [isShowing, setIsShowing] = React.useState(delayMs === 0);

    React.useEffect(() => {
      if (delayMs === 0) return;

      const timer = setTimeout(() => {
        setIsShowing(true);
      }, delayMs);

      return () => clearTimeout(timer);
    }, [delayMs]);

    if (!isShowing) {
      return null;
    }

    return (
      <View
        ref={ref}
        className={cn(
          "absolute inset-0 flex h-full w-full items-center justify-center bg-muted",
          className
        )}
        {...props}
      >
        {typeof children === "string" ? (
          <Text className="text-base font-medium text-muted-foreground">
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
    );
  }
);

AvatarRoot.displayName = "Avatar";
AvatarImage.displayName = "AvatarImage";
AvatarFallback.displayName = "AvatarFallback";

export { AvatarRoot as Avatar, AvatarImage, AvatarFallback }; 