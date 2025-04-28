import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function AvatarExample() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Avatar",
          headerRight: () => <ThemeToggle />,
        }}
      />

      <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
        <ScrollView className="px-5 py-5">
          <View className="mb-6">
            <Text className="text-2xl font-bold mb-2 text-foreground">
              Avatar
            </Text>
            <Text className="text-base mb-4 text-muted-foreground">
              An image component with a fallback for user avatars and profile pictures
            </Text>
          </View>

          <View className="mb-8">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              Default Avatar
            </Text>
            <View className="flex-row gap-4">
              <Avatar>
                <AvatarImage
                  source={{ uri: "https://github.com/shadcn.png" }}
                  alt="Profile picture"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </View>
          </View>

          <View className="mb-8">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              Avatar Sizes
            </Text>
            <View className="flex-row items-center gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  source={{ uri: "https://github.com/shadcn.png" }}
                  alt="Small avatar"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <Avatar>
                <AvatarImage
                  source={{ uri: "https://github.com/shadcn.png" }}
                  alt="Default avatar"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <Avatar className="h-16 w-16">
                <AvatarImage
                  source={{ uri: "https://github.com/shadcn.png" }}
                  alt="Large avatar"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </View>
          </View>

          <View className="mb-8">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              With Fallback
            </Text>
            <View className="flex-row gap-4">
              <Avatar>
                <AvatarImage
                  source={{ uri: "https://invalid-image-url.png" }}
                  alt="Invalid image"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>

              <Avatar>
                <AvatarImage
                  source={{ uri: "https://another-invalid-url.png" }}
                  alt="Invalid image"
                />
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>

              <Avatar>
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>
            </View>
          </View>

          <View className="mb-8">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              Custom Styling
            </Text>
            <View className="flex-row gap-4">
              <Avatar className="bg-primary">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  PR
                </AvatarFallback>
              </Avatar>

              <Avatar className="bg-secondary">
                <AvatarFallback className="bg-secondary text-secondary-foreground">
                  SC
                </AvatarFallback>
              </Avatar>

              <Avatar className="border-2 border-destructive">
                <AvatarImage
                  source={{ uri: "https://github.com/shadcn.png" }}
                  alt="Bordered avatar"
                  className="border border-background"
                />
                <AvatarFallback>BD</AvatarFallback>
              </Avatar>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
} 