import * as React from "react"
import { View, Text, ScrollView, Pressable, Image } from "react-native"
import { Stack } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { ThemeToggle } from "@/components/ui"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Ionicons } from "@expo/vector-icons"
import { cn } from "@/lib/utils"

// Sample data
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
]

const products = [
  {
    name: "Basic Plan",
    price: "$10/mo",
    storage: "10 GB",
    users: "2 users",
    support: "Email",
    backup: "Weekly",
  },
  {
    name: "Pro Plan",
    price: "$25/mo",
    storage: "50 GB",
    users: "5 users",
    support: "24/7 Phone",
    backup: "Daily",
  },
  {
    name: "Enterprise",
    price: "$50/mo",
    storage: "200 GB",
    users: "Unlimited",
    support: "24/7 Priority",
    backup: "Real-time",
  },
]

const StatusBadge = ({ status }: { status: string }) => (
  <View className={cn(
    "px-2.5 py-0.5 rounded-full",
    status === "Paid" ? "bg-green-100" :
    status === "Pending" ? "bg-yellow-100" :
    "bg-red-100"
  )}>
    <Text className={cn(
      "text-xs font-medium",
      status === "Paid" ? "text-green-800" :
      status === "Pending" ? "text-yellow-800" :
      "text-red-800"
    )}>
      {status}
    </Text>
  </View>
)

export default function TableExample() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Table",
          headerRight: () => <ThemeToggle />,
        }}
      />

      <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
        <ScrollView className="flex-1">
          <View className="p-4 space-y-8">
            <View>
              <Text className="text-2xl font-bold mb-2 text-foreground">
                Table
              </Text>
              <Text className="text-base text-muted-foreground">
                A responsive table component for mobile.
              </Text>
            </View>

            {/* Basic Table Example */}
            <View className="space-y-4">
              <Text className="text-lg font-semibold text-foreground">
                Simple Table
              </Text>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead width={140}>Invoice</TableHead>
                    <TableHead width={100} align="center">Status</TableHead>
                    <TableHead width={100} align="right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice, index) => (
                    <TableRow key={invoice.invoice}>
                      <TableCell columnIndex={0}>
                        <Text className="font-medium">{invoice.invoice}</Text>
                        <Text className="text-xs text-muted-foreground">
                          {invoice.paymentMethod}
                        </Text>
                      </TableCell>
                      <TableCell columnIndex={1}>
                        <StatusBadge status={invoice.paymentStatus} />
                      </TableCell>
                      <TableCell columnIndex={2}>
                        {invoice.totalAmount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell columnIndex={0}>
                      <Text className="font-medium">Total</Text>
                    </TableCell>
                    <TableCell columnIndex={1}>{""}</TableCell>
                    <TableCell columnIndex={2}>$750.00</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </View>

            {/* Product Comparison Table */}
            <View className="space-y-4">
              <Text className="text-lg font-semibold text-foreground">
                Product Comparison
              </Text>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead width={140}>Plan</TableHead>
                    <TableHead width={100} align="right">Price</TableHead>
                    <TableHead width={120} align="center">Storage</TableHead>
                    <TableHead width={100} align="center">Users</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product, index) => (
                    <TableRow key={product.name}>
                      <TableCell columnIndex={0}>
                        <Text className="font-medium">{product.name}</Text>
                        <Text className="text-xs text-muted-foreground">
                          {product.support}
                        </Text>
                      </TableCell>
                      <TableCell columnIndex={1}>
                        <Text className="font-medium">{product.price}</Text>
                      </TableCell>
                      <TableCell columnIndex={2}>
                        <View className="items-center">
                          <Text>{product.storage}</Text>
                          <Text className="text-xs text-muted-foreground">
                            {product.backup} backup
                          </Text>
                        </View>
                      </TableCell>
                      <TableCell columnIndex={3}>
                        {product.users}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </View>

            {/* Feature Comparison */}
            <View className="space-y-4">
              <Text className="text-lg font-semibold text-foreground">
                Feature Comparison
              </Text>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead width={140}>Feature</TableHead>
                    <TableHead width={100} align="center">Basic</TableHead>
                    <TableHead width={100} align="center">Pro</TableHead>
                    <TableHead width={100} align="center">Enterprise</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell columnIndex={0}>Storage Space</TableCell>
                    <TableCell columnIndex={1}>
                      <View className="items-center">
                        <Ionicons name="checkmark" size={20} color="#16a34a" />
                      </View>
                    </TableCell>
                    <TableCell columnIndex={2}>
                      <View className="items-center">
                        <Ionicons name="checkmark" size={20} color="#16a34a" />
                      </View>
                    </TableCell>
                    <TableCell columnIndex={3}>
                      <View className="items-center">
                        <Ionicons name="checkmark" size={20} color="#16a34a" />
                      </View>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell columnIndex={0}>Custom Domain</TableCell>
                    <TableCell columnIndex={1}>
                      <View className="items-center">
                        <Ionicons name="close" size={20} color="#dc2626" />
                      </View>
                    </TableCell>
                    <TableCell columnIndex={2}>
                      <View className="items-center">
                        <Ionicons name="checkmark" size={20} color="#16a34a" />
                      </View>
                    </TableCell>
                    <TableCell columnIndex={3}>
                      <View className="items-center">
                        <Ionicons name="checkmark" size={20} color="#16a34a" />
                      </View>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell columnIndex={0}>API Access</TableCell>
                    <TableCell columnIndex={1}>
                      <View className="items-center">
                        <Ionicons name="close" size={20} color="#dc2626" />
                      </View>
                    </TableCell>
                    <TableCell columnIndex={2}>
                      <View className="items-center">
                        <Ionicons name="close" size={20} color="#dc2626" />
                      </View>
                    </TableCell>
                    <TableCell columnIndex={3}>
                      <View className="items-center">
                        <Ionicons name="checkmark" size={20} color="#16a34a" />
                      </View>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell columnIndex={0}>24/7 Support</TableCell>
                    <TableCell columnIndex={1}>
                      <View className="items-center">
                        <Ionicons name="close" size={20} color="#dc2626" />
                      </View>
                    </TableCell>
                    <TableCell columnIndex={2}>
                      <View className="items-center">
                        <Ionicons name="checkmark" size={20} color="#16a34a" />
                      </View>
                    </TableCell>
                    <TableCell columnIndex={3}>
                      <View className="items-center">
                        <Ionicons name="checkmark" size={20} color="#16a34a" />
                      </View>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </View>

            {/* Extra padding at the bottom */}
            <View className="h-20" />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
