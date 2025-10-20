import { Button } from "@/components/ui/button";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ToastUsageExample() {
	const [position, setPosition] = useState<"top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right">("bottom");
	const [duration, setDuration] = useState(3000);

	return (
		<ToastProvider duration={duration} position={position}>
			<ToastDemo position={position} setPosition={setPosition} />
		</ToastProvider>
	);
}

interface ToastDemoProps {
	position: "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
	setPosition: (position: "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right") => void;
}

function ToastDemo({ position, setPosition }: ToastDemoProps) {
	const { show } = useToast();
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";

	// Fonction utilitaire pour éviter les changements dynamiques de classes
	const getButtonTextClass = (isActive: boolean) => {
		return isActive 
			? "text-primary-foreground dark:text-primary-foreground" 
			: "text-foreground dark:text-foreground";
	};

	return (
		<>
			<SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
				<ScrollView className="px-5 py-5">
					<View className="mb-6">
						<Text className="text-2xl font-bold mb-2 text-foreground">
							Toast
						</Text>
						<Text className="text-base mb-4 text-muted-foreground">
							Displays brief messages or notifications to users with different types and styles
						</Text>
						<Text className="text-base mb-4 text-foreground">
							Current mode: {isDark ? 'dark' : 'light'}
						</Text>
					</View>

					<View className="mb-6">
						<Text className="text-xl font-semibold mb-4 text-foreground">
							Toast Positioning
						</Text>
						<Text className="text-sm mb-4 text-muted-foreground">
							Current position: {position}
						</Text>
						
						<View className="gap-3">
							<View className="flex-row gap-2 flex-wrap">
								<Button
									key="position-top"
									variant={position === "top" ? "default" : "outline"}
									size="sm"
									onPress={() => setPosition("top")}
								>
									<Text className={getButtonTextClass(position === "top")}>
										Top
									</Text>
								</Button>
								
								<Button
									key="position-bottom"
									variant={position === "bottom" ? "default" : "outline"}
									size="sm"
									onPress={() => setPosition("bottom")}
								>
									<Text className={getButtonTextClass(position === "bottom")}>
										Bottom
									</Text>
								</Button>
								
								<Button
									key="position-top-left"
									variant={position === "top-left" ? "default" : "outline"}
									size="sm"
									onPress={() => setPosition("top-left")}
								>
									<Text className={getButtonTextClass(position === "top-left")}>
										Top Left
									</Text>
								</Button>
							</View>
							
							<View className="flex-row gap-2 flex-wrap">
								<Button
									key="position-top-right"
									variant={position === "top-right" ? "default" : "outline"}
									size="sm"
									onPress={() => setPosition("top-right")}
								>
									<Text className={getButtonTextClass(position === "top-right")}>
										Top Right
									</Text>
								</Button>
								
								<Button
									key="position-bottom-left"
									variant={position === "bottom-left" ? "default" : "outline"}
									size="sm"
									onPress={() => setPosition("bottom-left")}
								>
									<Text className={getButtonTextClass(position === "bottom-left")}>
										Bottom Left
									</Text>
								</Button>
								
								<Button
									key="position-bottom-right"
									variant={position === "bottom-right" ? "default" : "outline"}
									size="sm"
									onPress={() => setPosition("bottom-right")}
								>
									<Text className={getButtonTextClass(position === "bottom-right")}>
										Bottom Right
									</Text>
								</Button>
							</View>
						</View>
						
						<View className="mt-4">
							<Button
								key="test-position-button"
								variant="secondary"
								onPress={() => show(`Toast positioned at ${position}`, "info")}
							>
								<Text className="text-secondary-foreground dark:text-secondary-foreground">
									Test Current Position
								</Text>
							</Button>
						</View>
					</View>

					<View className="mb-6">
						<Text className="text-xl font-semibold mb-4 text-foreground">
							Toast Types
						</Text>

						<View className="gap-4">
							<View className="flex-row gap-3 flex-wrap">
								<Button
									key="toast-default"
									variant="default"
									onPress={() => show("This is a default toast message")}
								>
									<Text className="text-primary-foreground dark:text-primary-foreground">
										Default
									</Text>
								</Button>

								<Button
									key="toast-success"
									variant="default"
									onPress={() => show("Operation completed successfully!", "success")}
								>
									<Text className="text-primary-foreground dark:text-primary-foreground">
										Success
									</Text>
								</Button>

								<Button
									key="toast-error"
									variant="destructive"
									onPress={() => show("Something went wrong!", "error")}
								>
									<Text className="text-destructive-foreground dark:text-destructive-foreground">
										Error
									</Text>
								</Button>
							</View>

							<View className="flex-row gap-3 flex-wrap">
								<Button
									key="toast-warning"
									variant="outline"
									onPress={() => show("Please check your input", "warning")}
								>
									<Text className="text-foreground dark:text-foreground">Warning</Text>
								</Button>

								<Button
									key="toast-info"
									variant="secondary"
									onPress={() => show("New information available", "info")}
								>
									<Text className="text-secondary-foreground dark:text-secondary-foreground">
										Info
									</Text>
								</Button>
							</View>
						</View>
					</View>

					<View className="mb-6">
						<Text className="text-xl font-semibold mb-4 text-foreground">
							Common Use Cases
						</Text>

						<View className="gap-4">
							<View className="flex-row gap-3 flex-wrap">
								<Button
									variant="default"
									onPress={() => show("Changes saved successfully!", "success")}
								>
									<Feather name="save" size={16} color={isDark ? "#111827" : "white"} />
									<Text className="text-primary-foreground dark:text-primary-foreground ml-2">
										Save Action
									</Text>
								</Button>

								<Button
									variant="destructive"
									onPress={() => show("Item deleted permanently", "error")}
								>
									<Feather name="trash-2" size={16} color={isDark ? "#111827" : "white"} />
									<Text className="text-destructive-foreground dark:text-destructive-foreground ml-2">
										Delete Action
									</Text>
								</Button>
							</View>

							<View className="flex-row gap-3 flex-wrap">
								<Button
									variant="outline"
									onPress={() => show("File uploaded successfully", "success")}
								>
									<Feather name="upload" size={16} color={isDark ? "white" : "#111827"} />
									<Text className="text-foreground dark:text-foreground ml-2">
										Upload Complete
									</Text>
								</Button>

								<Button
									variant="secondary"
									onPress={() => show("Connection lost. Retrying...", "warning")}
								>
									<Feather name="wifi-off" size={16} color={isDark ? "white" : "#171717"} />
									<Text className="text-secondary-foreground dark:text-secondary-foreground ml-2">
										Network Issue
									</Text>
								</Button>
							</View>
						</View>
					</View>

					<View className="mb-6">
						<Text className="text-xl font-semibold mb-4 text-foreground">
							Interactive Examples
						</Text>

						<View className="gap-4">
							<View className="flex-row gap-3 flex-wrap">
								<Button
									variant="default"
									onPress={() => show("Welcome back! You have 3 new messages", "info")}
								>
									<Text className="text-primary-foreground dark:text-primary-foreground">
										Welcome Message
									</Text>
								</Button>

								<Button
									variant="outline"
									onPress={() => show("Profile updated successfully", "success")}
								>
									<Text className="text-foreground dark:text-foreground">
										Profile Update
									</Text>
								</Button>
							</View>

							<View className="flex-row gap-3 flex-wrap">
								<Button
									variant="secondary"
									onPress={() => show("Session expired. Please log in again", "warning")}
								>
									<Text className="text-secondary-foreground dark:text-secondary-foreground">
										Session Expired
									</Text>
								</Button>

								<Button
									variant="destructive"
									onPress={() => show("Failed to load data. Please try again", "error")}
								>
									<Text className="text-destructive-foreground dark:text-destructive-foreground">
										Load Error
									</Text>
								</Button>
							</View>
						</View>
					</View>

					<View className="mb-6">
						<Text className="text-xl font-semibold mb-4 text-foreground">
							Long Messages
						</Text>

						<View className="gap-4">
							<Button
								variant="default"
								onPress={() => show("This is a longer toast message that demonstrates how the component handles extended text content and wraps appropriately", "info")}
							>
								<Text className="text-primary-foreground dark:text-primary-foreground">
									Long Message
								</Text>
							</Button>
						</View>
					</View>

					<View className="mb-6">
						<Text className="text-xl font-semibold mb-4 text-foreground">
							Quick Actions
						</Text>

						<View className="gap-4">
							<View className="flex-row gap-3 flex-wrap">
								<Button
									variant="default"
									onPress={() => show("Copied to clipboard!", "success")}
								>
									<Feather name="copy" size={16} color={isDark ? "#111827" : "white"} />
									<Text className="text-primary-foreground dark:text-primary-foreground ml-2">
										Copy
									</Text>
								</Button>

								<Button
									variant="outline"
									onPress={() => show("Added to favorites", "success")}
								>
									<Feather name="heart" size={16} color={isDark ? "white" : "#111827"} />
									<Text className="text-foreground dark:text-foreground ml-2">
										Favorite
									</Text>
								</Button>
							</View>

							<View className="flex-row gap-3 flex-wrap">
								<Button
									variant="secondary"
									onPress={() => show("Shared successfully", "info")}
								>
									<Feather name="share" size={16} color={isDark ? "white" : "#171717"} />
									<Text className="text-secondary-foreground dark:text-secondary-foreground ml-2">
										Share
									</Text>
								</Button>

								<Button
									variant="default"
									onPress={() => show("Download started", "info")}
								>
									<Feather name="download" size={16} color={isDark ? "#111827" : "white"} />
									<Text className="text-primary-foreground dark:text-primary-foreground ml-2">
										Download
									</Text>
								</Button>
							</View>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		</>
	);
}