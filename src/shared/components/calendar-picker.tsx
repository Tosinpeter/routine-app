import { Ionicons } from "@expo/vector-icons";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

import { AppText as Text } from "@/components/app-text";
import {
  scale,
  scaledRadius,
  scaleIcon,
  touchTarget,
  verticalScale,
} from "@/constants/scaling";
import { AeonikFonts, BorderRadius, Colors, Fonts, HitSlop, Shadows } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";

export interface DayItem {
  day: string;
  date: number;
}

export interface TimeSlot {
  time: string;
  isAvailable: boolean;
  isSelected: boolean;
}

export interface CalendarPickerProps {
  month: string;
  days: DayItem[];
  selectedDayIndex: number;
  timeSlots: TimeSlot[];
  onDaySelect: (index: number) => void;
  onTimeSlotToggle: (index: number) => void;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  onViewAllAvailability?: () => void;
}

export function CalendarPicker({
  month,
  days,
  selectedDayIndex,
  timeSlots,
  onDaySelect,
  onTimeSlotToggle,
  onPrevMonth,
  onNextMonth,
  onViewAllAvailability,
}: CalendarPickerProps) {
  return (
    <View style={styles.calendarCard}>
      {/* Month Header */}
      <View style={styles.monthHeader}>
        <Text style={styles.monthText}>{month}</Text>
        <View style={styles.monthNavigation}>
          <TouchableOpacity
            style={styles.navButton}
            activeOpacity={0.7}
            onPress={onPrevMonth}
            hitSlop={HitSlop.small}
          >
            <Ionicons name="chevron-back" size={scaleIcon(20)} color={Colors.light.grey700} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            activeOpacity={0.7}
            onPress={onNextMonth}
            hitSlop={HitSlop.small}
          >
            <Ionicons name="chevron-forward" size={scaleIcon(20)} color={Colors.light.grey700} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Days Row */}
      <View style={styles.daysRow}>
        {days.map((item, index) => (
          <TouchableOpacity
            key={`${item.day}-${item.date}`}
            style={styles.dayItem}
            onPress={() => onDaySelect(index)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.dayText,
                selectedDayIndex === index && styles.dayTextSelected,
              ]}
            >
              {item.day}
            </Text>
            <Text
              style={[
                styles.dateText,
                selectedDayIndex === index && styles.dateTextSelected,
              ]}
            >
              {item.date}
            </Text>
            {selectedDayIndex === index && <View style={styles.selectedIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Time Slots Grid */}
      <View style={styles.timeSlotsContainer}>
        <View style={styles.timeSlotsGrid}>
          {timeSlots.map((slot, index) => (
            <TouchableOpacity
              key={`${slot.time}-${index}`}
              style={[
                styles.timeSlot,
                !slot.isAvailable && styles.timeSlotDisabled,
                slot.isSelected && slot.isAvailable && styles.timeSlotSelected,
              ]}
              onPress={() => onTimeSlotToggle(index)}
              activeOpacity={slot.isAvailable ? 0.7 : 1}
              disabled={!slot.isAvailable}
            >
              <Text
                style={[
                  styles.timeSlotText,
                  !slot.isAvailable && styles.timeSlotTextDisabled,
                  slot.isSelected && slot.isAvailable && styles.timeSlotTextSelected,
                ]}
              >
                {slot.time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* View All Availability */}
      <TouchableOpacity
        style={styles.viewAllButton}
        activeOpacity={0.7}
        onPress={onViewAllAvailability}
      >
        <Text style={styles.viewAllText}>{t("selectLabTest.viewAllAvailability")}</Text>
        <Ionicons name="chevron-forward" size={scaleIcon(16)} color={Colors.light.grey700} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  calendarCard: {
    backgroundColor: Colors.light.white,
    borderRadius: BorderRadius.xl,
    padding: scale(16),
    ...Shadows.sm,
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(18),
  },
  monthText: {
    ...AppTextStyle.headline6,
    fontFamily: Fonts.regular,
    color: Colors.light.text,
  },
  monthNavigation: {
    flexDirection: "row",
    gap: scale(8),
  },
  navButton: {
    width: touchTarget(28),
    height: touchTarget(28),
    alignItems: "center",
    justifyContent: "center",
  },
  // Days Row
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(23),
    paddingBottom: verticalScale(3),
    paddingHorizontal: scale(8),
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.grey200,
  },
  dayItem: {
    alignItems: "center",
    paddingVertical: verticalScale(4),
    position: "relative",
    minWidth: touchTarget(32),
  },
  dayText: {
    ...AppTextStyle.bodyText2,
    color: Colors.light.grey525,
    marginBottom: verticalScale(4),
  },
  dayTextSelected: {
    color: Colors.light.text,
  },
  dateText: {
    ...AppTextStyle.subtitle2,
    fontFamily: Fonts.regular,
    color: Colors.light.grey525,
    ...Platform.select({
      android: { includeFontPadding: false },
    }),
  },
  dateTextSelected: {
    color: Colors.light.text,
  },
  selectedIndicator: {
    position: "absolute",
    bottom: scale(-5),
    width: scale(24),
    height: scale(3),
    backgroundColor: Colors.light.darkTeal,
    borderRadius: scaledRadius(2),
  },
  // Time Slots
  timeSlotsContainer: {
    marginBottom: verticalScale(20),
  },
  timeSlotsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: scale(10),
  },
  timeSlot: {
    paddingVertical: verticalScale(11),
    paddingHorizontal: scale(17),
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.light.lightGrey150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.white,
    minWidth: touchTarget(60),
  },
  timeSlotDisabled: {
    backgroundColor: Colors.light.lightGrey,
    borderColor: Colors.light.lightGrey,
  },
  timeSlotSelected: {
    borderColor: Colors.light.text,
    backgroundColor: Colors.light.white,
  },
  timeSlotText: {
    ...AppTextStyle.button2,
    fontFamily: AeonikFonts.medium,
    textAlign: "center",
    color: Colors.light.text,
    ...Platform.select({
      android: { includeFontPadding: false },
    }),
  },
  timeSlotTextDisabled: {
    color: Colors.light.grey400,
  },
  timeSlotTextSelected: {
    color: Colors.light.text,
  },
  // View All
  viewAllButton: {
    backgroundColor: Colors.light.scaffold,
    paddingVertical: verticalScale(14),
    borderRadius: BorderRadius.full,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(4),
  },
  viewAllText: {
    ...AppTextStyle.bodyText1,
    color: Colors.light.grey800,
  },
});
