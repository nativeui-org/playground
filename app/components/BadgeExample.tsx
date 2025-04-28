import React from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function BadgeExample() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Badge",
          headerRight: () => <ThemeToggle />,
        }}
      />

      <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
        <ScrollView className="px-5 py-5">
          <View className="mb-6">
            <Text className="text-2xl font-bold mb-2 text-foreground">
              Badge
            </Text>
            <Text className="text-base mb-4 text-muted-foreground">
              Displays a status or notification count in a compact format
            </Text>
          </View>

          <View className="mb-8">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              Badge Variants
            </Text>
            <View className="flex-row flex-wrap gap-4">
              <Badge variant="default" label="Default" />
              <Badge variant="secondary" label="Secondary" />
              <Badge variant="destructive" label="Destructive" />
              <Badge variant="outline" label="Outline" />
            </View>
          </View>

          <View className="mb-8">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              Badge Sizes
            </Text>
            <View className="flex-row items-center gap-4">
              <Badge size="sm" label="Small" />
              <Badge size="default" label="Default" />
              <Badge size="lg" label="Large" />
            </View>
          </View>

          <View className="mb-8">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              Interactive Badges
            </Text>
            <View className="flex-row flex-wrap gap-4">
              <Badge 
                variant="default" 
                label="Click me" 
                onPress={() => Alert.alert("Badge Clicked", "You clicked the default badge")}
              />
              <Badge 
                variant="secondary" 
                label="Tap here" 
                onPress={() => Alert.alert("Badge Clicked", "You clicked the secondary badge")}
              />
              <Badge 
                variant="destructive" 
                label="Delete" 
                onPress={() => Alert.alert("Badge Clicked", "You clicked the destructive badge")}
              />
              <Badge 
                variant="outline" 
                label="More info" 
                onPress={() => Alert.alert("Badge Clicked", "You clicked the outline badge")}
              />
            </View>
          </View>

          <View className="mb-8">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              Notification Badges
            </Text>
            <View className="flex-row items-center gap-8">
              <View className="items-center">
                <Badge variant="destructive" label="3" className="h-5 w-5 mb-2" />
                <Text className="text-sm text-muted-foreground">Messages</Text>
              </View>
              <View className="items-center">
                <Badge variant="default" label="12" className="h-5 w-5 mb-2" />
                <Text className="text-sm text-muted-foreground">Notifications</Text>
              </View>
              <View className="items-center">
                <Badge variant="secondary" label="5+" className="h-5 w-5 mb-2" />
                <Text className="text-sm text-muted-foreground">Updates</Text>
              </View>
            </View>
          </View>

          <View className="mb-8">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              Status Badges
            </Text>
            <View className="gap-4">
              <View className="flex-row items-center">
                <Badge label="Online" className="bg-green-500 text-white mr-2" />
                <Text className="text-foreground">User is available</Text>
              </View>
              <View className="flex-row items-center">
                <Badge label="Away" className="bg-yellow-500 text-white mr-2" />
                <Text className="text-foreground">User is inactive</Text>
              </View>
              <View className="flex-row items-center">
                <Badge label="Offline" className="bg-gray-400 text-white mr-2" />
                <Text className="text-foreground">User is disconnected</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
} 