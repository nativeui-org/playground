import React, { useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { Button, ThemeToggle } from "@/components/ui";

export default function CustomStylingScreen() {
  const { isDarkMode } = useTheme();
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [loadingVariant, setLoadingVariant] = useState<
    "default" | "card" | "overlay"
  >("default");
  const [buttonLoading, setButtonLoading] = useState<{
    [key: string]: boolean;
  }>({});

  const simulateLoading = (variant: "default" | "card" | "overlay") => {
    setLoadingVariant(variant);
    setLoadingVisible(true);
    setTimeout(() => setLoadingVisible(false), 3000);
  };

  const simulateButtonLoading = (buttonId: string) => {
    setButtonLoading((prev) => ({ ...prev, [buttonId]: true }));
    setTimeout(() => {
      setButtonLoading((prev) => ({ ...prev, [buttonId]: false }));
    }, 3000);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "ShadCN-Style UI",
          headerClassName: "rounded-b-xl overflow-hidden",
          headerTitleClassName:
            "font-medium text-lg text-gray-900 dark:text-white",
          headerRight: () => <ThemeToggle />,
        }}
      />

      <SafeAreaView
        className="flex-1 bg-white dark:bg-gray-900"
        edges={["bottom"]}
      >
        <ScrollView className="flex-1 px-5 py-5">
          <View className="mb-6">
            <Text className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              ShadCN-Style Components
            </Text>
            <Text className="text-base mb-6 text-gray-700 dark:text-gray-300">
              UI components inspired by ShadCN for React Native
            </Text>
          </View>

          <View className="mb-8">
            <Text className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Loading States
            </Text>

            <View className="flex-row flex-wrap gap-4 mb-4">
              <Button
                variant="default"
                size="sm"
                onPress={() => simulateLoading("default")}
              >
                <Text className="text-primary-foreground">Default Loading</Text>
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onPress={() => simulateLoading("card")}
              >
                <Text className="text-secondary-foreground">Card Loading</Text>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onPress={() => simulateLoading("overlay")}
              >
                <Text className="text-foreground">Overlay Loading</Text>
              </Button>
            </View>

            {loadingVisible && loadingVariant === "default" && (
              <View className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
                <View className="flex-row items-center justify-center">
                  <ActivityIndicator size="large" color={isDarkMode ? "#60a5fa" : "#3b82f6"} />
                  <Text className="ml-2 text-base text-gray-700 dark:text-gray-300">
                    Loading...
                  </Text>
                </View>
              </View>
            )}

            {loadingVisible && loadingVariant === "card" && (
              <View className="mb-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                <View className="flex-row items-center justify-center">
                  <ActivityIndicator size="small" color={isDarkMode ? "#60a5fa" : "#3b82f6"} />
                  <Text className="ml-2 text-base text-gray-700 dark:text-gray-300">
                    Processing your request...
                  </Text>
                </View>
              </View>
            )}
          </View>

          <View className="mb-8">
            <Text className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Buttons with Loading
            </Text>

            <View className="space-y-4">
              <Button
                variant="default"
                onPress={() => simulateButtonLoading("primary")}
              >
                {buttonLoading["primary"] ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <>
                    <Feather name="check" size={18} color="white" />
                    <Text className="text-primary-foreground ml-2">Primary Button</Text>
                  </>
                )}
              </Button>

              <Button
                variant="secondary"
                onPress={() => simulateButtonLoading("secondary")}
              >
                {buttonLoading["secondary"] ? (
                  <ActivityIndicator size="small" color="#64748b" />
                ) : (
                  <Text className="text-secondary-foreground">Secondary Button</Text>
                )}
              </Button>

              <Button
                variant="outline"
                onPress={() => simulateButtonLoading("outline")}
              >
                {buttonLoading["outline"] ? (
                  <ActivityIndicator size="small" color="#1f2937" />
                ) : (
                  <Text className="text-foreground">Outline Button</Text>
                )}
              </Button>

              <Button
                variant="destructive"
                onPress={() => simulateButtonLoading("destructive")}
              >
                {buttonLoading["destructive"] ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <>
                    <Feather name="trash-2" size={18} color="white" />
                    <Text className="text-destructive-foreground ml-2">Destructive Button</Text>
                  </>
                )}
              </Button>

              <Button
                variant="ghost"
                onPress={() => simulateButtonLoading("ghost")}
              >
                {buttonLoading["ghost"] ? (
                  <ActivityIndicator size="small" color="#1f2937" />
                ) : (
                  <Text className="text-foreground">Ghost Button</Text>
                )}
              </Button>
            </View>
          </View>
        </ScrollView>

        {loadingVisible && loadingVariant === "overlay" && (
          <View className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <View className="flex-row items-center justify-center bg-white dark:bg-gray-800 rounded-xl p-6">
              <ActivityIndicator size="large" color={isDarkMode ? "#60a5fa" : "#3b82f6"} />
              <Text className="ml-2 text-base text-gray-700 dark:text-gray-300">
                Please wait...
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </>
  );
}
