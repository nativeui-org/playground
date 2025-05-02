import * as React from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"
import { Stack } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { ThemeToggle } from "@/components/ui"
import { Drawer, useDrawer } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Ionicons } from "@expo/vector-icons"

// Type for Ionicons names
type IoniconName = React.ComponentProps<typeof Ionicons>['name']

// Composant séparé pour le contenu du formulaire de feedback
const FeedbackForm = () => {
  const [selectedRating, setSelectedRating] = React.useState<number | null>(null)
  const [feedbackText, setFeedbackText] = React.useState("")
  const { animateClose } = useDrawer()

  const handleSubmit = () => {
    // Logique pour soumettre le feedback
    console.log({ rating: selectedRating, feedback: feedbackText })
    animateClose()
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView className="p-4">
        <Text className="text-base mb-4 text-foreground">
          We'd love to hear your thoughts on our application.
        </Text>
        
        <View className="mb-4">
          <Text className="text-sm font-medium mb-2 text-foreground">
            How would you rate your experience?
          </Text>
          <View className="flex-row justify-between">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Button
                key={rating}
                variant={selectedRating === rating ? "default" : "outline"}
                size="icon"
                className="w-10 h-10 rounded-full"
                onPress={() => setSelectedRating(rating)}
              >
                <Text className={selectedRating === rating ? "text-primary-foreground" : "text-foreground"}>
                  {rating}
                </Text>
              </Button>
            ))}
          </View>
        </View>
        
        <View className="mb-4">
          <Text className="text-sm font-medium mb-2 text-foreground">
            Your comments
          </Text>
          <Input
            multiline
            textAlignVertical="top"
            numberOfLines={4}
            className="h-24 py-2"
            placeholder="Type your feedback here..."
            value={feedbackText}
            onChangeText={setFeedbackText}
          />
        </View>
        
        <Button onPress={handleSubmit}>
          <Text className="text-primary-foreground">Submit</Text>
        </Button>
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}

// Composant séparé pour la liste des paramètres
const SettingsList = () => {
  const [language, setLanguage] = React.useState("")

  return (
    <ScrollView>
      {[
        { icon: "person-outline" as IoniconName, label: "My Account" },
        { icon: "notifications-outline" as IoniconName, label: "Notifications" },
        { icon: "lock-closed-outline" as IoniconName, label: "Privacy" },
        { icon: "moon-outline" as IoniconName, label: "Theme" },
        { icon: "globe-outline" as IoniconName, label: "Language", hasSelect: true },
        { icon: "help-circle-outline" as IoniconName, label: "Help & Support" },
        { icon: "information-circle-outline" as IoniconName, label: "About" },
        { icon: "log-out-outline" as IoniconName, label: "Logout" },
      ].map((item, index) => (
        <View key={index}>
          <Button
            variant="ghost"
            className="flex-row h-14 items-center px-4 py-2 border-b border-border rounded-none justify-start"
          >
            <Ionicons name={item.icon} size={22} color="#6B7280" style={{ marginRight: 12 }} />
            <Text className="text-base text-foreground">
              {item.label}
            </Text>
            <Ionicons name="chevron-forward" size={16} color="#6B7280" style={{ marginLeft: 'auto' }} />
          </Button>
        </View>
      ))}
    </ScrollView>
  )
}

// Composant pour le grand drawer avec contenu complexe
const LargeDrawerContent = () => {
  const { animateClose } = useDrawer()
  
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
      <View className="p-4">
        <Text className="text-xl font-bold mb-4 text-foreground">
          Section Title
        </Text>
        
        <Text className="text-base mb-4 text-foreground">
          This drawer has three snap points and opens initially at the middle point.
          Drag it up to see all content, or down for a reduced view.
        </Text>
        
        <View className="bg-accent/20 rounded-lg p-4 mb-4">
          <Text className="text-sm font-medium text-foreground mb-2">
            Tip
          </Text>
          <Text className="text-sm text-muted-foreground">
            For a better user experience, the drawer uses fluid animations and 
            progressive resistance when you try to drag beyond the limits.
          </Text>
        </View>
        
        <View className="h-px bg-border w-full my-4" />
        
        <Text className="text-base font-bold mb-2 text-foreground">
          Features:
        </Text>
        
        {[
          "Multiple configurable snap points",
          "Fluid spring animations",
          "Responsive drag behavior",
          "Close by dragging down or touching the backdrop",
          "Support for complex scrollable content",
          "Easy customization via classes"
        ].map((feature, index) => (
          <View key={index} className="flex-row items-center py-2">
            <View className="w-2 h-2 rounded-full bg-primary mr-2" />
            <Text className="text-base text-foreground">
              {feature}
            </Text>
          </View>
        ))}
        
        <View className="h-px bg-border w-full my-4" />
        
        <Text className="text-base font-bold mb-2 text-foreground">
          Demo Content:
        </Text>
        
        {Array(15).fill(0).map((_, i) => (
          <View key={i} className="py-3 border-b border-border">
            <Text className="text-base text-foreground">Content item {i + 1}</Text>
            <Text className="text-sm text-muted-foreground">Additional description for this content item</Text>
          </View>
        ))}
        
        <Button 
          variant="outline"
          className="mt-6 mb-10"
          onPress={animateClose}
        >
          <Text className="text-foreground">Close Drawer</Text>
        </Button>
      </View>
    </ScrollView>
  )
}

export default function DrawerExampleScreen() {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [feedbackDrawerOpen, setFeedbackDrawerOpen] = React.useState(false)
  const [settingsDrawerOpen, setSettingsDrawerOpen] = React.useState(false)
  const [largeDrawerOpen, setLargeDrawerOpen] = React.useState(false)

  // Memoize l'état des drawers pour éviter des re-rendus inutiles
  const openDrawer = React.useCallback((setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    return () => setter(true)
  }, [])

  const closeDrawer = React.useCallback((setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    return () => setter(false)
  }, [])

  return (
    <>
      <Stack.Screen
        options={{
          title: "Drawer",
          headerRight: () => <ThemeToggle />,
        }}
      />

      <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={100}
        >
          <ScrollView className="p-4">
            <View className="mb-6">
              <Text className="text-2xl font-bold mb-2 text-foreground">
                Drawer
              </Text>
              <Text className="text-base mb-6 text-muted-foreground">
                A bottom sheet component that can be dragged up and down with snap points.
              </Text>
            </View>

            <View className="mb-8">
              <Text className="text-xl font-semibold mb-4 text-foreground">
                Basic Drawer
              </Text>
              <Button onPress={openDrawer(setDrawerOpen)}>
                <Text className="text-primary-foreground">Open Drawer</Text>
              </Button>

              <Drawer
                open={drawerOpen}
                onClose={closeDrawer(setDrawerOpen)}
                title="Drawer Example"
                snapPoints={[0.4, 0.8]}
                initialSnapIndex={0}
              >
                <View className="p-4">
                  <Text className="text-base mb-4 text-foreground">
                    This is an example of drawer content. You can drag this drawer up to see more content.
                  </Text>
                  
                  <View className="h-px bg-border w-full my-4" />
                  
                  <Text className="text-sm text-muted-foreground">
                    Try dragging this drawer up and down.
                  </Text>
                </View>
              </Drawer>
            </View>

            <View className="mb-8">
              <Text className="text-xl font-semibold mb-4 text-foreground">
                Drawer with Form
              </Text>
              <Button 
                variant="outline" 
                onPress={openDrawer(setFeedbackDrawerOpen)}
                className="bg-primary/10"
              >
                <Ionicons name="chatbubble-outline" size={20} color="#4F46E5" style={{ marginRight: 8 }} />
                <Text className="text-base font-medium text-primary">
                  Leave Feedback
                </Text>
              </Button>

              <Drawer
                open={feedbackDrawerOpen}
                onClose={closeDrawer(setFeedbackDrawerOpen)}
                title="Feedback"
                snapPoints={[0.5, 0.9]}
                initialSnapIndex={0}
              >
                <FeedbackForm />
              </Drawer>
            </View>

            <View className="mb-8">
              <Text className="text-xl font-semibold mb-4 text-foreground">
                Drawer with List
              </Text>
              <Button 
                variant="outline" 
                onPress={openDrawer(setSettingsDrawerOpen)}
                className="justify-between"
              >
                <View className="flex-row items-center">
                  <Ionicons name="settings-outline" size={20} color="#6B7280" style={{ marginRight: 8 }} />
                  <Text className="text-base text-foreground">
                    Settings
                  </Text>
                </View>
                <Ionicons name="chevron-up" size={16} color="#6B7280" />
              </Button>

              <Drawer
                open={settingsDrawerOpen}
                onClose={closeDrawer(setSettingsDrawerOpen)}
                title="Settings"
                snapPoints={[0.6, 0.9]}
                initialSnapIndex={0}
              >
                <SettingsList />
              </Drawer>
            </View>

            <View className="mb-8">
              <Text className="text-xl font-semibold mb-4 text-foreground">
                Large Drawer with Complex Content
              </Text>
              <Button 
                variant="secondary"
                onPress={openDrawer(setLargeDrawerOpen)}
              >
                <Text className="text-accent-foreground">View More Information</Text>
              </Button>

              <Drawer
                open={largeDrawerOpen}
                onClose={closeDrawer(setLargeDrawerOpen)}
                title="Detailed Information"
                snapPoints={[0.3, 0.7, 0.95]}
                initialSnapIndex={1}
              >
                <LargeDrawerContent />
              </Drawer>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  )
} 