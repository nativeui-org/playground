import * as React from "react";
import { View, Text } from "react-native";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Stack } from "expo-router";
import { ThemeToggle } from "@/components/ui";

export default function AccordionExample() {
  return (
    <View className="p-4 bg-background">
      <Stack.Screen
        options={{
          title: "Accordion",
          headerRight: () => <ThemeToggle />,
        }}
      />

      <Accordion type="single" defaultValue={["item-1"]} collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            <Text>
              Yes. It adheres to the WAI-ARIA design pattern and has been
              optimized for React Native with improved touch targets and
              appropriate spacing for mobile screens.
            </Text>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Is it responsive?</AccordionTrigger>
          <AccordionContent>
            <Text>
              Yes. It's optimized for both iOS and Android experiences and
              follows native platform conventions while maintaining a consistent
              appearance.
            </Text>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Is it customizable?</AccordionTrigger>
          <AccordionContent>
            <Text>
              Yes. You can customize the styling using NativeWind classes or
              provide your own components for triggers and content. The
              animation is also customizable.
            </Text>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  );
}
