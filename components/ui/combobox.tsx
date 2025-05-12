import * as React from "react";
import {
  View,
  Text,
  Pressable,
  Platform,
  FlatList,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cn } from "@/lib/utils";
import { Drawer, useDrawer } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";

interface ComboboxProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  items: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
  filter?: (value: string, search: string) => boolean;
  emptyText?: string;
}

interface ComboboxItemProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onSelect?: (value: string, label: React.ReactNode) => void;
  selectedValue?: string;
}

interface ComboboxLabelProps {
  children: React.ReactNode;
  className?: string;
}

interface ComboboxGroupProps {
  children: React.ReactNode;
  className?: string;
}

interface ComboboxSeparatorProps {
  className?: string;
}

interface ComboboxContextValue {
  searchValue: string;
  setSearchValue: (value: string) => void;
  selectedValue?: string;
  onSelect: (value: string) => void;
  items: ComboboxProps["items"];
  filter: (value: string, search: string) => boolean;
  emptyText: string;
}

const ComboboxContext = React.createContext<ComboboxContextValue | undefined>(
  undefined
);

const useComboboxContext = () => {
  const context = React.useContext(ComboboxContext);
  if (!context) {
    throw new Error("useComboboxContext must be used within a ComboboxProvider");
  }
  return context;
};

const DrawerContent = React.memo(
  ({
    items,
    selectedValue,
    onSelect,
    customFilter,
    emptyText,
    placeholder,
    isOpen
  }: {
    items: ComboboxProps["items"];
    selectedValue?: string;
    onSelect: (value: string) => void;
    customFilter?: (value: string, search: string) => boolean;
    emptyText: string;
    placeholder: string;
    isOpen: boolean;
  }) => {
    const [searchValue, setSearchValue] = React.useState("");
    const [filteredItems, setFilteredItems] = React.useState(items);
    const inputRef = React.useRef<TextInput>(null);
    const drawer = useDrawer();
    const prevIsOpenRef = React.useRef(isOpen);

    const defaultFilter = React.useCallback(
      (itemValue: string, search: string) => {
        const label =
          items.find((item) => item.value === itemValue)?.label || "";
        return label.toLowerCase().includes(search.toLowerCase());
      },
      [items]
    );

    const filter = customFilter || defaultFilter;

    React.useEffect(() => {
      if (!searchValue) {
        setFilteredItems(items);
      } else {
        setFilteredItems(
          items.filter((item) => filter(item.value, searchValue))
        );
      }
    }, [items, filter, searchValue]);

    const handleChangeText = (text: string) => {
      setSearchValue(text);
    };

    const handleClear = () => {
      setSearchValue("");
      inputRef.current?.clear();
    };

    const handleItemSelect = (value: string, label: React.ReactNode) => {
      onSelect(value);
      drawer.animateClose();
    };

    React.useEffect(() => {
      if (prevIsOpenRef.current && !isOpen) {
        setSearchValue("");
      }
      
      prevIsOpenRef.current = isOpen;
    }, [isOpen]);

    return (
      <>
        <View className="px-4 py-2">
          <View className="relative mb-2">
            <Input
              ref={inputRef}
              placeholder="Search..."
              placeholderTextColor="#9CA3AF"
              className="pl-10"
              value={searchValue}
              onChangeText={handleChangeText}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="search"
            />
            <View className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Ionicons name="search" size={20} color="#9CA3AF" />
            </View>
            {searchValue.length > 0 && (
              <View className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Pressable onPress={handleClear} hitSlop={8}>
                  <Ionicons name="close-circle" size={18} color="#9CA3AF" />
                </Pressable>
              </View>
            )}
          </View>
        </View>

        {filteredItems.length === 0 ? (
          <View className="p-4 items-center justify-center">
            <Text className="text-muted-foreground text-base">{emptyText}</Text>
          </View>
        ) : (
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.value}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
            renderItem={({ item }) => (
              <ComboboxItem
                value={item.value}
                disabled={item.disabled}
                selectedValue={selectedValue}
                onSelect={handleItemSelect}
              >
                {item.label}
              </ComboboxItem>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </>
    );
  }
);

DrawerContent.displayName = "DrawerContent";

const Combobox = React.forwardRef<View, ComboboxProps>(
  (
    {
      value,
      onValueChange,
      placeholder = "Select an option",
      searchPlaceholder = "Search...",
      disabled = false,
      className,
      triggerClassName,
      contentClassName,
      items = [],
      filter,
      emptyText = "No results found.",
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(value);

    React.useEffect(() => {
      setSelectedValue(value);
    }, [value]);

    const selectedLabel = React.useMemo(() => {
      if (!selectedValue) return "";
      return items.find((item) => item.value === selectedValue)?.label || "";
    }, [selectedValue, items]);

    const handleSelect = React.useCallback(
      (itemValue: string) => {
        setSelectedValue(itemValue);
        if (onValueChange) {
          onValueChange(itemValue);
        }
      },
      [onValueChange]
    );

    const drawerContentProps = React.useMemo(
      () => ({
        items,
        selectedValue,
        onSelect: handleSelect,
        customFilter: filter,
        emptyText,
        placeholder,
        isOpen,
      }),
      [items, selectedValue, handleSelect, filter, emptyText, placeholder, isOpen]
    );

    return (
      <View ref={ref} className={cn("w-full", className)}>
        <Pressable
          disabled={disabled}
          onPress={() => setIsOpen(true)}
          className={cn(
            "flex-row h-12 items-center justify-between rounded-md border border-input bg-transparent px-3 py-2",
            "shadow-sm",
            "active:opacity-70",
            disabled && "opacity-50",
            Platform.OS === "ios"
              ? "ios:shadow-sm ios:shadow-foreground/10"
              : "android:elevation-1",
            triggerClassName
          )}
        >
          <Text
            className={cn(
              "text-base flex-1",
              !selectedValue && "text-muted-foreground",
              "text-foreground"
            )}
            numberOfLines={1}
          >
            {selectedValue ? selectedLabel : placeholder}
          </Text>

          <Ionicons
            name="chevron-down"
            size={16}
            color="#9CA3AF"
            style={{ marginLeft: 8, opacity: 0.7 }}
          />
        </Pressable>

        <Drawer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          title={placeholder}
          snapPoints={[0.5, 0.8]}
          initialSnapIndex={0}
          contentClassName={contentClassName}
        >
          <DrawerContent {...drawerContentProps} />
        </Drawer>
      </View>
    );
  }
);

Combobox.displayName = "Combobox";

const ComboboxGroup = React.forwardRef<View, ComboboxGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <View ref={ref} className={cn("", className)} {...props}>
        {children}
      </View>
    );
  }
);

ComboboxGroup.displayName = "ComboboxGroup";

const ComboboxItem = React.forwardRef<typeof Pressable, ComboboxItemProps>(
  (
    { className, children, value, disabled, onSelect, selectedValue, ...props },
    ref
  ) => {
    const isSelected = selectedValue === value;

    return (
      <Pressable
        ref={ref as any}
        disabled={disabled}
        onPress={() => {
          if (onSelect) {
            onSelect(value, children);
          }
        }}
        className={cn(
          "flex-row h-14 items-center justify-between px-4 py-2 active:bg-accent/50",
          isSelected ? "bg-accent" : "",
          disabled && "opacity-50",
          className
        )}
        {...props}
      >
        <Text
          className={cn(
            "text-base",
            isSelected
              ? "text-accent-foreground font-medium"
              : "text-foreground"
          )}
        >
          {children}
        </Text>

        {isSelected && <Ionicons name="checkmark" size={20} color="#4F46E5" />}
      </Pressable>
    );
  }
);

ComboboxItem.displayName = "ComboboxItem";

const ComboboxLabel = React.forwardRef<Text, ComboboxLabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn(
          "px-3 py-2 text-sm font-semibold text-foreground",
          className
        )}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

ComboboxLabel.displayName = "ComboboxLabel";

const ComboboxSeparator = React.forwardRef<View, ComboboxSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("h-px bg-muted mx-2 my-1", className)}
        {...props}
      />
    );
  }
);

ComboboxSeparator.displayName = "ComboboxSeparator";

export {
  Combobox,
  ComboboxGroup,
  ComboboxItem,
  ComboboxLabel,
  ComboboxSeparator,
};