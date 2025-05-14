import * as React from "react";
import { View, Text, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeToggle } from "@/components/ui";
import { Toggle } from "@/components/ui/toggle";

const ToggleWithIcon = ({ pressed, onPressedChange }: { pressed?: boolean; onPressedChange?: (pressed: boolean) => void }) => (
  <Toggle pressed={pressed} onPressedChange={onPressedChange} className="gap-2">
    <Text className="text-base font-medium">Toggle with icon</Text>
    <Text className="text-base">🔔</Text>
  </Toggle>
);

const ToggleWithMultipleIcons = ({ pressed, onPressedChange }: { pressed?: boolean; onPressedChange?: (pressed: boolean) => void }) => (
  <Toggle pressed={pressed} onPressedChange={onPressedChange} className="gap-2">
    <Text className="text-base">🔔</Text>
    <Text className="text-base font-medium">Notifications</Text>
    <Text className="text-base">🔕</Text>
  </Toggle>
);

export default function ToggleExampleScreen() {
  // Basic toggles
  const [basicToggle, setBasicToggle] = React.useState(false);
  const [basicToggle2, setBasicToggle2] = React.useState(false);
  
  // Outline toggles
  const [outlineToggle, setOutlineToggle] = React.useState(false);
  const [outlineToggle2, setOutlineToggle2] = React.useState(false);
  
  // Icon toggles
  const [iconToggle, setIconToggle] = React.useState(false);
  const [multiIconToggle, setMultiIconToggle] = React.useState(false);
  
  // Size toggles
  const [smallToggle, setSmallToggle] = React.useState(false);
  const [defaultToggle, setDefaultToggle] = React.useState(false);
  const [largeToggle, setLargeToggle] = React.useState(false);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Toggle",
          headerRight: () => <ThemeToggle />,
        }}
      />

      <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
        <ScrollView className="p-4">
          <View className="mb-6">
            <Text className="text-2xl font-bold mb-2 text-foreground">
              Toggle
            </Text>
            <Text className="text-base mb-6 text-muted-foreground">
              A two-state button that can be either on or off.
            </Text>
          </View>

          <View className="mb-8">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              Basic Toggle
            </Text>
            <View className="flex-row gap-4 flex-wrap">
              <Toggle pressed={basicToggle} onPressedChange={setBasicToggle}>
                <Text className="text-base font-medium">Toggle 1</Text>
              </Toggle>
              <Toggle pressed={basicToggle2} onPressedChange={setBasicToggle2}>
                <Text className="text-base font-medium">Toggle 2</Text>
              </Toggle>
              <Toggle disabled>
                <Text className="text-base font-medium">Disabled</Text>
              </Toggle>
            </View>
          </View>

          <View className="mb-8">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              Outline Variant
            </Text>
            <View className="flex-row gap-4 flex-wrap">
              <Toggle
                variant="outline"
                pressed={outlineToggle}
                onPressedChange={setOutlineToggle}
              >
                <Text className="text-base font-medium">Outline 1</Text>
              </Toggle>
              <Toggle
                variant="outline"
                pressed={outlineToggle2}
                onPressedChange={setOutlineToggle2}
              >
                <Text className="text-base font-medium">Outline 2</Text>
              </Toggle>
              <Toggle
                variant="outline"
                disabled
              >
                <Text className="text-base font-medium">Disabled</Text>
              </Toggle>
            </View>
          </View>

          <View className="mb-8">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              Different Sizes
            </Text>
            <View className="flex-col gap-4">
              <Toggle size="sm" pressed={smallToggle} onPressedChange={setSmallToggle}>
                <Text className="text-sm font-medium">Small Toggle</Text>
              </Toggle>
              <Toggle size="default" pressed={defaultToggle} onPressedChange={setDefaultToggle}>
                <Text className="text-base font-medium">Default Toggle</Text>
              </Toggle>
              <Toggle size="lg" pressed={largeToggle} onPressedChange={setLargeToggle}>
                <Text className="text-lg font-medium">Large Toggle</Text>
              </Toggle>
            </View>
          </View>

          <View className="mb-8">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              With Icons
            </Text>
            <View className="flex-col gap-4">
              <ToggleWithIcon
                pressed={iconToggle}
                onPressedChange={setIconToggle}
              />
              <ToggleWithMultipleIcons
                pressed={multiIconToggle}
                onPressedChange={setMultiIconToggle}
              />
            </View>
          </View>

          <View className="mb-8">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              Combined Examples
            </Text>
            <View className="flex-col gap-4">
              <Toggle
                variant="outline"
                size="lg"
                pressed={outlineToggle}
                onPressedChange={setOutlineToggle}
                className="gap-2"
              >
                <Text className="text-base">🔔</Text>
                <Text className="text-lg font-medium">Large Outline with Icon</Text>
              </Toggle>
              
              <Toggle
                size="sm"
                pressed={smallToggle}
                onPressedChange={setSmallToggle}
                className="gap-2"
              >
                <Text className="text-sm font-medium">Small with Icon</Text>
                <Text className="text-sm">🔕</Text>
              </Toggle>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
