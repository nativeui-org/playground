import * as React from "react";
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeToggle } from "@/components/ui";
import { Combobox } from "@/components/ui/combobox";

export default function ComboboxExample() {
  const [fruit, setFruit] = React.useState<string>("");
  const [pet, setPet] = React.useState<string>("");
  const [country, setCountry] = React.useState<string>("fr");
  const [framework, setFramework] = React.useState<string>("");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  // Sample data for comboboxes
  const fruits = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "strawberry", label: "Strawberry" },
    { value: "grape", label: "Grape" },
    { value: "pineapple", label: "Pineapple" },
    { value: "mango", label: "Mango" },
    { value: "kiwi", label: "Kiwi" },
    { value: "peach", label: "Peach" },
    { value: "plum", label: "Plum" },
  ];

  const pets = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "rabbit", label: "Rabbit" },
    { value: "hamster", label: "Hamster" },
    { value: "turtle", label: "Turtle" },
    { value: "bird", label: "Bird" },
    { value: "fish", label: "Fish" },
  ];

  const countries = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "fr", label: "France" },
    { value: "de", label: "Germany" },
    { value: "jp", label: "Japan" },
    { value: "au", label: "Australia" },
    { value: "br", label: "Brazil" },
    { value: "in", label: "India" },
    { value: "cn", label: "China" },
  ];

  const frontendFrameworks = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "solid", label: "SolidJS" },
  ];

  const backendFrameworks = [
    { value: "node", label: "Node.js" },
    { value: "django", label: "Django" },
    { value: "laravel", label: "Laravel" },
    { value: "spring", label: "Spring Boot" },
    { value: "rails", label: "Ruby on Rails" },
  ];

  // Combined frameworks
  const allFrameworks = [...frontendFrameworks, ...backendFrameworks];

  return (
    <>
      <Stack.Screen
        options={{
          title: "Combobox",
          headerRight: () => <ThemeToggle />,
        }}
      />

      <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={100}
        >
          <ScrollView 
            className="p-4"
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
          >
            <View className="mb-6">
              <Text className="text-2xl font-bold mb-2 text-foreground">
                Combobox
              </Text>
              <Text className="text-base mb-6 text-muted-foreground">
                Displays a searchable dropdown menu for selecting a value from a list of options.
              </Text>
            </View>

            <View className="mb-8">
              <Text className="text-xl font-semibold mb-4 text-foreground">
                Basic Combobox
              </Text>
              <Combobox
                placeholder="Select a fruit"
                searchPlaceholder="Search fruits..."
                value={fruit}
                onValueChange={setFruit}
                items={fruits}
              />
              <Text className="text-sm mt-2 text-muted-foreground">
                {fruit ? `You selected: ${fruit}` : "No fruit selected"}
              </Text>
            </View>

            <View className="mb-8">
              <Text className="text-xl font-semibold mb-4 text-foreground">
                With Label
              </Text>
              <View>
                <Text className="text-sm font-medium mb-2 text-foreground">
                  Select a pet
                </Text>
                <Combobox
                  placeholder="Select a pet"
                  searchPlaceholder="Search pets..."
                  value={pet}
                  onValueChange={setPet}
                  items={pets}
                />
              </View>
            </View>

            <View className="mb-8">
              <Text className="text-xl font-semibold mb-4 text-foreground">
                With Default Value
              </Text>
              <Combobox
                placeholder="Select a country"
                searchPlaceholder="Search countries..."
                value={country}
                onValueChange={setCountry}
                items={countries}
              />
            </View>

            <View className="mb-8">
              <Text className="text-xl font-semibold mb-4 text-foreground">
                With Custom Filter
              </Text>
              <Combobox
                placeholder="Select a framework"
                searchPlaceholder="Search frameworks..."
                value={framework}
                onValueChange={setFramework}
                items={allFrameworks}
                filter={(value, search) => {
                  const item = allFrameworks.find(f => f.value === value);
                  if (!item) return false;
                  
                  // Check if search term is in the label or value
                  return (
                    item.label.toLowerCase().includes(search.toLowerCase()) ||
                    item.value.toLowerCase().includes(search.toLowerCase())
                  );
                }}
              />
            </View>

            <View className="mb-8">
              <Text className="text-xl font-semibold mb-4 text-foreground">
                Disabled Combobox
              </Text>
              <Combobox
                placeholder="Select an option"
                disabled={true}
                items={fruits}
              />
            </View>

            <View className="mb-8">
              <Text className="text-xl font-semibold mb-4 text-foreground">
                With Disabled Items
              </Text>
              <Combobox
                placeholder="Select a day"
                searchPlaceholder="Search days..."
                items={[
                  { value: "monday", label: "Monday" },
                  { value: "tuesday", label: "Tuesday" },
                  { value: "wednesday", label: "Wednesday", disabled: true },
                  { value: "thursday", label: "Thursday" },
                  { value: "friday", label: "Friday" },
                  { value: "saturday", label: "Saturday", disabled: true },
                  { value: "sunday", label: "Sunday", disabled: true },
                ]}
                onValueChange={(value) => console.log(value)}
              />
            </View>

            <View className="mb-8">
              <Text className="text-xl font-semibold mb-4 text-foreground">
                With Many Items
              </Text>
              <Combobox
                placeholder="Select a number"
                searchPlaceholder="Search numbers..."
                items={Array.from({ length: 100 }, (_, i) => ({
                  value: `num-${i+1}`,
                  label: `Number ${i+1}`
                }))}
                emptyText="No numbers found"
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}