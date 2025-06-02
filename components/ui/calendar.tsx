import * as React from "react";
import { View, Text, Pressable, Dimensions, Platform, Modal, ScrollView, FlatList } from "react-native";
import { cn } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  isToday,
  format,
  addMonths,
  subMonths,
  isWithinInterval,
  isBefore,
  isAfter,
  setHours,
  setMinutes,
  startOfDay,
  endOfDay,
  setYear,
  setMonth,
  getYear,
  getMonth,
} from "date-fns";
import { fr, enUS } from 'date-fns/locale';

// Localization configuration
const LOCALES = {
  en: {
    locale: enUS,
    months: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    monthYear: "MMMM yyyy",
    selectMonth: "Select Month",
    selectYear: "Select Year",
  },
  fr: {
    locale: fr,
    months: [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ],
    weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
    monthYear: "MMMM yyyy",
    selectMonth: "Sélectionner le mois",
    selectYear: "Sélectionner l'année",
  },
} as const;

type LocaleKey = keyof typeof LOCALES;

interface DateRange {
  from: Date;
  to: Date;
}

interface TimeConfig {
  minuteInterval?: 1 | 5 | 10 | 15 | 30;
  minTime?: string; // format "HH:mm"
  maxTime?: string; // format "HH:mm"
  disabledTimes?: string[]; // format ["HH:mm"]
}

interface CalendarProps {
  mode?: "single" | "range" | "datetime";
  selected?: Date | Date[] | DateRange;
  onSelect?: (date: Date | Date[] | DateRange | undefined) => void;
  className?: string;
  showOutsideDays?: boolean;
  showTime?: boolean;
  disabled?: (date: Date) => boolean;
  disableWeekends?: boolean;
  fromDate?: Date;
  toDate?: Date;
  timeConfig?: TimeConfig;
  firstDayOfWeek?: 0 | 1; // 0 for Sunday, 1 for Monday
  locale?: LocaleKey;
  enableQuickMonthYear?: boolean;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const SCREEN_WIDTH = Dimensions.get("window").width;
const DAY_SIZE = Math.min(Math.floor((SCREEN_WIDTH - 48) / 7), 50);

const isDateRange = (value: any): value is DateRange => {
  return value && typeof value === "object" && "from" in value && "to" in value;
};

const isInRange = (date: Date, range: DateRange) => {
  return isWithinInterval(date, { start: range.from, end: range.to });
};

const isRangeStart = (date: Date, range: DateRange) => {
  return isSameDay(date, range.from);
};

const isRangeEnd = (date: Date, range: DateRange) => {
  return isSameDay(date, range.to);
};

export function Calendar({
  mode = "single",
  selected,
  onSelect,
  className,
  showOutsideDays = true,
  showTime = false,
  disabled,
  disableWeekends = false,
  fromDate,
  toDate,
  timeConfig,
  firstDayOfWeek = 1,
  locale = "en",
  enableQuickMonthYear = false,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(() => {
    if (selected instanceof Date) {
      return selected;
    }
    return new Date();
  });
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const [showMonthYearPicker, setShowMonthYearPicker] = React.useState(false);
  const [showYearPicker, setShowYearPicker] = React.useState(false);
  const [tempSelectedDate, setTempSelectedDate] = React.useState<Date | null>(null);

  const l10n = LOCALES[locale];
  const monthScrollRef = React.useRef<ScrollView>(null);

  React.useEffect(() => {
    if (selected instanceof Date) {
      setCurrentDate(selected);
    }
  }, [selected]);

  const currentYear = currentDate.getFullYear();
  const years = React.useMemo(() => {
    return Array.from({ length: currentYear - 1900 + 11 }, (_, i) => currentYear + 10 - i);
  }, [currentYear]);

  // Réorganiser les jours de la semaine en fonction du premier jour
  const orderedWeekdays = React.useMemo(() => {
    const days = [...l10n.weekdays];
    const firstDays = days.splice(0, firstDayOfWeek);
    return [...days, ...firstDays];
  }, [firstDayOfWeek, locale]);

  const getDaysInMonth = (date: Date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const days = eachDayOfInterval({ start, end });

    // Add days from previous month to fill the first week
    const firstDayOfMonth = (start.getDay() - firstDayOfWeek + 7) % 7;
    if (showOutsideDays && firstDayOfMonth > 0) {
      const prevMonthDays = eachDayOfInterval({
        start: subMonths(start, 1),
        end: subMonths(end, 1),
      }).slice(-firstDayOfMonth);
      days.unshift(...prevMonthDays);
    }

    // Add days from next month to fill the last week
    if (showOutsideDays && days.length < 42) {
      const remainingDays = 42 - days.length;
      const nextMonthDays = eachDayOfInterval({
        start: addMonths(start, 1),
        end: addMonths(end, 1),
      }).slice(0, remainingDays);
      days.push(...nextMonthDays);
    }

    return days;
  };

  const isSelected = (date: Date) => {
    if (!selected) return false;
    if (selected instanceof Date) {
      return isSameDay(selected, date);
    }
    if (Array.isArray(selected)) {
      return selected.some((s) => isSameDay(s, date));
    }
    if (isDateRange(selected)) {
      return (
        isSameDay(selected.from, date) ||
        isSameDay(selected.to, date) ||
        isWithinInterval(date, { start: selected.from, end: selected.to })
      );
    }
    return false;
  };

  const isDisabled = (date: Date) => {
    if (fromDate && isBefore(date, startOfDay(fromDate))) return true;
    if (toDate && isAfter(date, endOfDay(toDate))) return true;
    if (typeof disabled === "function") return disabled(date);
    return false;
  };

  const isTimeDisabled = (hours: number, minutes: number) => {
    if (!timeConfig) return false;

    const timeString = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    if (timeConfig.minTime && timeString < timeConfig.minTime) return true;
    if (timeConfig.maxTime && timeString > timeConfig.maxTime) return true;
    if (timeConfig.disabledTimes?.includes(timeString)) return true;

    return false;
  };

  const handleDateSelect = (date: Date) => {
    if (isDisabled(date)) return;

    let newSelected: Date | Date[] | DateRange | undefined;

    switch (mode) {
      case "single":
        newSelected = date;
        break;
      case "range":
        if (!selected || !isDateRange(selected)) {
          newSelected = { from: date, to: date };
        } else {
          if (isSameDay(selected.from, selected.to)) {
            if (isBefore(date, selected.from)) {
              newSelected = { from: date, to: selected.from };
            } else {
              newSelected = { from: selected.from, to: date };
            }
          } else {
            newSelected = { from: date, to: date };
          }
        }
        break;
      case "datetime":
        setTempSelectedDate(date);
        if (selected instanceof Date) {
          // Préserver l'heure précédemment sélectionnée
          const newDate = setMinutes(
            setHours(date, selected.getHours()),
            selected.getMinutes()
          );
          onSelect?.(newDate);
        } else {
          onSelect?.(date);
        }
        return;
      default:
        newSelected = date;
    }

    onSelect?.(newSelected);
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    if (Platform.OS === "android") {
      setShowTimePicker(false); // Ferme toujours sur Android après sélection
      if (event.type === "dismissed") return;
    }

    if (selectedTime && selected instanceof Date) {
      const newDate = setMinutes(
        setHours(selected, selectedTime.getHours()),
        selectedTime.getMinutes()
      );
      onSelect?.(newDate);
    }
  };

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleMonthYearChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowMonthYearPicker(false);
    }
    
    if (event.type === "dismissed") {
      return;
    }

    if (selectedDate) {
      const newDate = new Date(currentDate);
      // On ne change que le mois et l'année
      newDate.setFullYear(selectedDate.getFullYear());
      newDate.setMonth(selectedDate.getMonth());
      setCurrentDate(newDate);
      setShowMonthYearPicker(false);
    }
  };

  const handleDateChange = (newDate: Date) => {
    setCurrentDate(newDate);
    if (onSelect) {
      onSelect(newDate);
    }
  };

  return (
    <View className={cn("bg-background rounded-2xl", className)}>
      <View className="p-4">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-4">
          <Pressable
            onPress={handlePrevMonth}
            className="p-2 rounded-full bg-muted"
          >
            <Ionicons name="chevron-back" size={24} color="#666" />
          </Pressable>
          {enableQuickMonthYear ? (
            <Pressable
              onPress={() => setShowMonthYearPicker(true)}
              className="flex-row items-center space-x-1 px-3 py-2 rounded-lg active:bg-muted"
            >
              <Text className="text-xl font-semibold text-foreground">
                {format(currentDate, "MMMM yyyy", { locale: l10n.locale })}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </Pressable>
          ) : (
            <Text className="text-xl font-semibold text-foreground">
              {format(currentDate, "MMMM yyyy", { locale: l10n.locale })}
            </Text>
          )}
          <Pressable
            onPress={handleNextMonth}
            className="p-2 rounded-full bg-muted"
          >
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </Pressable>
        </View>

        {/* Month/Year Picker Modal */}
        {showMonthYearPicker && enableQuickMonthYear && (
          <Modal
            visible={showMonthYearPicker}
            transparent
            animationType="fade"
            onRequestClose={() => setShowMonthYearPicker(false)}
            statusBarTranslucent
          >
            <View className="flex-1 bg-black/50 justify-center items-center">
              <View className="w-[90%] bg-background rounded-xl overflow-hidden">
                <View className="flex-row justify-between items-center px-4 py-3 border-b border-border">
                  <Pressable onPress={() => setShowMonthYearPicker(false)}>
                    <Text className="text-primary text-base">
                      {locale === "fr" ? "Annuler" : "Cancel"}
                    </Text>
                  </Pressable>
                  <Text className="text-base font-medium text-foreground">
                    {locale === "fr" ? "Choisir le mois" : "Choose month"}
                  </Text>
                  <Pressable onPress={() => setShowMonthYearPicker(false)}>
                    <Text className="text-primary font-semibold text-base">
                      {locale === "fr" ? "OK" : "Done"}
                    </Text>
                  </Pressable>
                </View>
                
                <View className="py-4">
                  {/* Mois */}
                  <View className="px-4 mb-6">
                    <View className="flex-row flex-wrap justify-between">
                      {l10n.months.map((month, index) => (
                        <Pressable
                          key={month}
                          onPress={() => {
                            const newDate = new Date(currentDate);
                            newDate.setMonth(index);
                            handleDateChange(newDate);
                          }}
                          className={cn(
                            "w-[30%] py-3 rounded-lg mb-3",
                            getMonth(currentDate) === index
                              ? "bg-primary"
                              : "bg-muted/50"
                          )}
                        >
                          <Text
                            className={cn(
                              "text-base text-center",
                              getMonth(currentDate) === index
                                ? "text-primary-foreground font-medium"
                                : "text-foreground"
                            )}
                          >
                            {month}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>

                  {/* Années */}
                  <View className="px-4 border-t border-border pt-4">
                    <View className="flex-row items-center justify-between">
                      <Pressable
                        onPress={() => {
                          const newDate = new Date(currentDate);
                          newDate.setFullYear(newDate.getFullYear() - 1);
                          handleDateChange(newDate);
                        }}
                        className="p-2"
                      >
                        <Ionicons name="chevron-back" size={24} color="#666" />
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          setShowYearPicker(true);
                        }}
                        className="px-6 py-2 rounded-lg bg-muted/50 active:bg-muted"
                      >
                        <Text className="text-base text-foreground">
                          {currentDate.getFullYear()}
                        </Text>
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          const newDate = new Date(currentDate);
                          newDate.setFullYear(newDate.getFullYear() + 1);
                          handleDateChange(newDate);
                        }}
                        className="p-2"
                      >
                        <Ionicons name="chevron-forward" size={24} color="#666" />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        )}

        {/* Year Picker Modal */}
        {showYearPicker && (
          <Modal
            visible={showYearPicker}
            transparent
            animationType="fade"
            onRequestClose={() => setShowYearPicker(false)}
            statusBarTranslucent
          >
            <View className="flex-1 bg-black/50 justify-center items-center">
              <View className="w-[90%] max-h-[70%] bg-background rounded-xl overflow-hidden">
                <View className="flex-row justify-between items-center px-4 py-3 border-b border-border">
                  <Pressable onPress={() => setShowYearPicker(false)}>
                    <Text className="text-primary text-base">
                      {locale === "fr" ? "Annuler" : "Cancel"}
                    </Text>
                  </Pressable>
                  <Text className="text-base font-medium text-foreground">
                    {locale === "fr" ? "Choisir l'année" : "Choose year"}
                  </Text>
                  <Pressable onPress={() => setShowYearPicker(false)}>
                    <Text className="text-primary font-semibold text-base">
                      {locale === "fr" ? "OK" : "Done"}
                    </Text>
                  </Pressable>
                </View>
                
                <ScrollView className="py-4">
                  <View className="px-4 flex-row flex-wrap justify-between">
                    {years.map((year) => (
                      <Pressable
                        key={year}
                        onPress={() => {
                          const newDate = new Date(currentDate);
                          newDate.setFullYear(year);
                          handleDateChange(newDate);
                          setShowYearPicker(false);
                        }}
                        className={cn(
                          "w-[30%] py-3 rounded-lg mb-3",
                          currentDate.getFullYear() === year
                            ? "bg-primary"
                            : "bg-muted/50"
                        )}
                      >
                        <Text
                          className={cn(
                            "text-base text-center",
                            currentDate.getFullYear() === year
                              ? "text-primary-foreground font-medium"
                              : "text-foreground"
                          )}
                        >
                          {year}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
        )}

        {/* Weekdays */}
        <View className="flex-row justify-between mb-2">
          {orderedWeekdays.map((day) => (
            <View
              key={day}
              style={{ width: DAY_SIZE }}
              className="items-center justify-center"
            >
              <Text className="text-sm font-medium text-muted-foreground">
                {day}
              </Text>
            </View>
          ))}
        </View>

        {/* Calendar Grid */}
        <View className="flex-row flex-wrap">
          {getDaysInMonth(currentDate).map((date, index) => {
            const isCurrentMonth = isSameMonth(date, currentDate);
            const isSelectedDay = isSelected(date);
            const isDisabledDay = isDisabled(date);
            const isTodayDate = isToday(date);

            // Range specific styles
            let rangeStyles = "";
            if (mode === "range" && selected && isDateRange(selected)) {
              const isInCurrentRange = isInRange(date, selected);
              const isStart = isRangeStart(date, selected);
              const isEnd = isRangeEnd(date, selected);

              if (isInCurrentRange) {
                rangeStyles = "bg-primary/20";
              }
              if (isStart) {
                rangeStyles += " rounded-l-lg";
              }
              if (isEnd) {
                rangeStyles += " rounded-r-lg";
              }
              if (isStart || isEnd) {
                rangeStyles += " bg-primary";
              }
            }

            return (
              <Pressable
                key={index}
                onPress={() => handleDateSelect(date)}
                disabled={isDisabledDay}
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
                className={cn(
                  "items-center justify-center",
                  mode !== "range" && isSelectedDay && "bg-primary rounded-lg",
                  mode !== "range" &&
                    isTodayDate &&
                    !isSelectedDay &&
                    "bg-accent rounded-lg",
                  isDisabledDay && "opacity-50",
                  rangeStyles
                )}
              >
                <Text
                  className={cn(
                    "text-base",
                    (isSelectedDay &&
                      mode === "range" &&
                      isDateRange(selected) &&
                      (isRangeStart(date, selected) ||
                        isRangeEnd(date, selected))) ||
                      (isSelectedDay && mode !== "range")
                      ? "text-primary-foreground"
                      : !isCurrentMonth
                      ? "text-muted-foreground"
                      : "text-foreground",
                    isDisabledDay && "opacity-50"
                  )}
                >
                  {format(date, "d")}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Time Selection - Plus élégant et intégré */}
      {mode === "datetime" && selected instanceof Date && (
        <View className="px-4 pb-4">
          <Pressable
            onPress={toggleTimePicker}
            className="flex-row items-center justify-between bg-muted/50 rounded-xl p-4"
          >
            <View className="flex-row items-center">
              <View className="bg-primary/10 p-2 rounded-full mr-4">
                <Ionicons name="time-outline" size={22} color="#666" />
              </View>
              <Text className="text-base font-medium text-foreground">
                {format(selected, "HH:mm")}
              </Text>
            </View>
            <View className="flex-row items-center space-x-2">
              <Text className="text-sm text-muted-foreground">
                {showTimePicker ? "Tap to close" : "Tap to change"}
              </Text>
              <Ionicons
                name={showTimePicker ? "chevron-down" : "chevron-forward"}
                size={16}
                color="#666"
              />
            </View>
          </Pressable>
        </View>
      )}

      {/* Native Time Picker (invisible until needed) */}
      {showTimePicker &&
        selected instanceof Date &&
        (Platform.OS === "ios" ? (
          <View className="px-4 pb-4">
            <View className="bg-muted rounded-xl overflow-hidden">
              <DateTimePicker
                value={selected}
                mode="time"
                is24Hour={true}
                display="spinner"
                onChange={handleTimeChange}
                textColor="#000"
                minuteInterval={timeConfig?.minuteInterval}
              />
            </View>
          </View>
        ) : (
          <DateTimePicker
            value={selected}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleTimeChange}
            minuteInterval={timeConfig?.minuteInterval}
          />
        ))}
    </View>
  );
}
