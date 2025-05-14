import * as React from "react";
import { View, Text, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeToggle } from "@/components/ui";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ToggleGroupExampleScreen() {
  // Single selection examples
  const [singleValue, setSingleValue] = React.useState<string>("center");
  const [outlineSingleValue, setOutlineSingleValue] = React.useState<string>("center");
  
  // Multiple selection examples
  const [multipleValue, setMultipleValue] = React.useState<string[]>([]);
  const [outlineMultipleValue, setOutlineMultipleValue] = React.useState<string[]>([]);
  
  // Size examples
  const [smallValue, setSmallValue] = React.useState<string>("center");
  const [defaultValue, setDefaultValue] = React.useState<string>("center");
  const [largeValue, setLargeValue] = React.useState<string>("center");

  const handleSingleValueChange = React.useCallback((value: string | string[]) => {
    if (typeof value === "string") {
      setSingleValue(value);
    }
  }, []);

  const handleOutlineSingleValueChange = React.useCallback((value: string | string[]) => {
    if (typeof value === "string") {
      setOutlineSingleValue(value);
    }
  }, []);

  const handleMultipleValueChange = React.useCallback((value: string | string[]) => {
    if (Array.isArray(value)) {
      setMultipleValue(value);
    }
  }, []);

  const handleOutlineMultipleValueChange = React.useCallback((value: string | string[]) => {
    if (Array.isArray(value)) {
      setOutlineMultipleValue(value);
    }
  }, []);

  const handleSmallValueChange = React.useCallback((value: string | string[]) => {
    if (typeof value === "string") {
      setSmallValue(value);
    }
  }, []);

  const handleDefaultValueChange = React.useCallback((value: string | string[]) => {
    if (typeof value === "string") {
      setDefaultValue(value);
    }
  }, []);

  const handleLargeValueChange = React.useCallback((value: string | string[]) => {
    if (typeof value === "string") {
      setLargeValue(value);
    }
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Toggle Group",
          headerRight: () => <ThemeToggle />,
        }}
      />

      <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
        <ScrollView className="p-4">
          <View className="mb-6">
            <Text className="text-2xl font-bold mb-2 text-foreground">
              Toggle Group
            </Text>
            <Text className="text-base mb-6 text-muted-foreground">
              A set of two-state buttons that can be toggled on or off.
            </Text>
          </View>

          <View className="mb-8">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              Single Selection
            </Text>
            <ToggleGroup
              type="single"
              value={singleValue}
              onValueChange={handleSingleValueChange}
              className="flex-wrap"
            >
              <ToggleGroupItem value="left">
                <Text className="text-base font-medium">Left</Text>
              </ToggleGroupItem>
              <ToggleGroupItem value="center">
                <Text className="text-base font-medium">Center</Text>
              </ToggleGroupItem>
              <ToggleGroupItem value="right">
                <Text className="text-base font-medium">Right</Text>
              </ToggleGroupItem>
            </ToggleGroup>
          </View>

          <View className="mb-8">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              Multiple Selection
            </Text>
            <ToggleGroup
              type="multiple"
              value={multipleValue}
              onValueChange={handleMultipleValueChange}
              className="flex-wrap"
            >
              <ToggleGroupItem value="bold">
                <Text className="text-base font-medium">Bold</Text>
              </ToggleGroupItem>
              <ToggleGroupItem value="italic">
                <Text className="text-base font-medium">Italic</Text>
              </ToggleGroupItem>
              <ToggleGroupItem value="underline">
                <Text className="text-base font-medium">Underline</Text>
              </ToggleGroupItem>
            </ToggleGroup>
          </View>

          <View className="mb-8">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              Outline Variant
            </Text>
            <View className="space-y-4">
              <ToggleGroup
                type="single"
                variant="outline"
                value={outlineSingleValue}
                onValueChange={handleOutlineSingleValueChange}
                className="flex-wrap"
              >
                <ToggleGroupItem value="left">
                  <Text className="text-base font-medium">Left</Text>
                </ToggleGroupItem>
                <ToggleGroupItem value="center">
                  <Text className="text-base font-medium">Center</Text>
                </ToggleGroupItem>
                <ToggleGroupItem value="right">
                  <Text className="text-base font-medium">Right</Text>
                </ToggleGroupItem>
              </ToggleGroup>

              <ToggleGroup
                type="multiple"
                variant="outline"
                value={outlineMultipleValue}
                onValueChange={handleOutlineMultipleValueChange}
                className="flex-wrap"
              >
                <ToggleGroupItem value="bold">
                  <Text className="text-base font-medium">Bold</Text>
                </ToggleGroupItem>
                <ToggleGroupItem value="italic">
                  <Text className="text-base font-medium">Italic</Text>
                </ToggleGroupItem>
                <ToggleGroupItem value="underline">
                  <Text className="text-base font-medium">Underline</Text>
                </ToggleGroupItem>
              </ToggleGroup>
            </View>
          </View>

          <View className="mb-8">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              Different Sizes
            </Text>
            <View className="space-y-4">
              <ToggleGroup
                type="single"
                size="sm"
                value={smallValue}
                onValueChange={handleSmallValueChange}
                className="flex-wrap"
              >
                <ToggleGroupItem value="left">
                  <Text className="text-sm font-medium">Left</Text>
                </ToggleGroupItem>
                <ToggleGroupItem value="center">
                  <Text className="text-sm font-medium">Center</Text>
                </ToggleGroupItem>
                <ToggleGroupItem value="right">
                  <Text className="text-sm font-medium">Right</Text>
                </ToggleGroupItem>
              </ToggleGroup>

              <ToggleGroup
                type="single"
                size="default"
                value={defaultValue}
                onValueChange={handleDefaultValueChange}
                className="flex-wrap"
              >
                <ToggleGroupItem value="left">
                  <Text className="text-base font-medium">Left</Text>
                </ToggleGroupItem>
                <ToggleGroupItem value="center">
                  <Text className="text-base font-medium">Center</Text>
                </ToggleGroupItem>
                <ToggleGroupItem value="right">
                  <Text className="text-base font-medium">Right</Text>
                </ToggleGroupItem>
              </ToggleGroup>

              <ToggleGroup
                type="single"
                size="lg"
                value={largeValue}
                onValueChange={handleLargeValueChange}
                className="flex-wrap"
              >
                <ToggleGroupItem value="left">
                  <Text className="text-lg font-medium">Left</Text>
                </ToggleGroupItem>
                <ToggleGroupItem value="center">
                  <Text className="text-lg font-medium">Center</Text>
                </ToggleGroupItem>
                <ToggleGroupItem value="right">
                  <Text className="text-lg font-medium">Right</Text>
                </ToggleGroupItem>
              </ToggleGroup>
            </View>
          </View>

          <View className="mb-8">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              With Icons
            </Text>
            <ToggleGroup
              type="multiple"
              value={multipleValue}
              onValueChange={handleMultipleValueChange}
              className="flex-wrap"
            >
              <ToggleGroupItem value="bold" className="gap-2">
                <Text className="text-base">🔤</Text>
                <Text className="text-base font-medium">Bold</Text>
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" className="gap-2">
                <Text className="text-base">📝</Text>
                <Text className="text-base font-medium">Italic</Text>
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" className="gap-2">
                <Text className="text-base">📏</Text>
                <Text className="text-base font-medium">Underline</Text>
              </ToggleGroupItem>
            </ToggleGroup>
          </View>

          <View className="mb-8">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              Disabled State
            </Text>
            <ToggleGroup
              type="single"
              value={singleValue}
              onValueChange={handleSingleValueChange}
              disabled
              className="flex-wrap"
            >
              <ToggleGroupItem value="left">
                <Text className="text-base font-medium">Left</Text>
              </ToggleGroupItem>
              <ToggleGroupItem value="center">
                <Text className="text-base font-medium">Center</Text>
              </ToggleGroupItem>
              <ToggleGroupItem value="right">
                <Text className="text-base font-medium">Right</Text>
              </ToggleGroupItem>
            </ToggleGroup>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
