import * as React from "react"
import { View, Text, ScrollView, Platform } from "react-native"
import { cn } from "@/lib/utils"

interface TableContextValue {
  columns: { width: number; align: "left" | "center" | "right" }[];
  setColumns: React.Dispatch<React.SetStateAction<{ width: number; align: "left" | "center" | "right" }[]>>;
}

const TableContext = React.createContext<TableContextValue | undefined>(undefined)

const Table = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  const [columns, setColumns] = React.useState<{ width: number; align: "left" | "center" | "right" }[]>([])

  return (
    <TableContext.Provider value={{ columns, setColumns }}>
      <View className="w-full" ref={ref}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          bounces={false}
          className="w-full"
        >
          <View
            className={cn(
              "w-full min-w-full bg-background",
              Platform.OS === "ios" ? "ios:shadow-sm" : "android:elevation-2",
              className
            )}
            {...props}
          />
        </ScrollView>
      </View>
    </TableContext.Provider>
  )
})
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "border-b border-border bg-muted/50",
      className
    )}
    {...props}
  />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("divide-y divide-border", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "border-t border-border bg-muted/50 font-medium",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "flex flex-row items-center min-h-[48px]",
      "active:bg-muted/50",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

interface TableHeadProps extends React.ComponentPropsWithoutRef<typeof View> {
  children: React.ReactNode
  align?: "left" | "center" | "right"
  width?: number
}

const TableHead = React.forwardRef<View, TableHeadProps>(
  ({ className, children, align = "left", width = 100, ...props }, ref) => {
    const context = React.useContext(TableContext)
    const columnIndex = React.useRef(context?.columns.length ?? 0)

    React.useEffect(() => {
      if (context) {
        context.setColumns(prev => {
          const newColumns = [...prev]
          newColumns[columnIndex.current] = { width, align }
          return newColumns
        })
      }
    }, [context, width, align])

    return (
      <View
        ref={ref}
        style={{ width }}
        className={cn(
          "h-12 px-4",
          align === "left" && "items-start",
          align === "center" && "items-center",
          align === "right" && "items-end",
          className
        )}
        {...props}
      >
        <Text 
          className={cn(
            "text-sm font-medium text-muted-foreground",
            Platform.OS === "ios" ? "ios:text-[13px]" : "android:text-[12px]",
            align === "right" && "text-right",
            align === "center" && "text-center"
          )}
          numberOfLines={2}
        >
          {children}
        </Text>
      </View>
    )
  }
)
TableHead.displayName = "TableHead"

interface TableCellProps extends React.ComponentPropsWithoutRef<typeof View> {
  children: React.ReactNode
  align?: "left" | "center" | "right"
  columnIndex?: number
}

const TableCell = React.forwardRef<View, TableCellProps>(
  ({ className, children, align, columnIndex = 0, ...props }, ref) => {
    const context = React.useContext(TableContext)
    const columnConfig = context?.columns[columnIndex]
    const cellAlign = align ?? columnConfig?.align ?? "left"
    const cellWidth = columnConfig?.width ?? 100

    return (
      <View
        ref={ref}
        style={{ width: cellWidth }}
        className={cn(
          "p-4",
          cellAlign === "left" && "items-start",
          cellAlign === "center" && "items-center",
          cellAlign === "right" && "items-end",
          className
        )}
        {...props}
      >
        {typeof children === 'string' ? (
          <Text 
            className={cn(
              "text-sm text-foreground",
              Platform.OS === "ios" ? "ios:text-[15px]" : "android:text-[14px]",
              cellAlign === "right" && "text-right",
              cellAlign === "center" && "text-center"
            )}
            numberOfLines={2}
          >
            {children}
          </Text>
        ) : children}
      </View>
    )
  }
)
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("py-4", className)}
    {...props}
  >
    <Text 
      className={cn(
        "text-sm text-center text-muted-foreground",
        Platform.OS === "ios" ? "ios:text-[13px]" : "android:text-[12px]"
      )}
    >
      {children}
    </Text>
  </View>
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
