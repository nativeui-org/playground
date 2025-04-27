import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { toggleTheme } = useTheme();
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center rounded-full p-2 ${
        isDarkMode ? "bg-primary" : "bg-secondary"
      } ${className}`}
      onPress={toggleTheme}
      accessibilityLabel="Toggle between light and dark mode"
      accessibilityRole="button"
    >
      <View className="flex-row items-center gap-2">
        {isDarkMode ? (
          <>
            <Feather name="sun" size={18} color="#111827" />
            <Text className="text-sm font-medium text-primary-foreground">
              Light mode
            </Text>
          </>
        ) : (
          <>
            <Feather name="moon" size={18} color="#1f2937" />
            <Text className="text-sm font-medium text-secondary-foreground">
              Dark mode
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}
