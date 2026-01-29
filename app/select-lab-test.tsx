import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText as Text } from "@/components/app-text";
import { CalendarPicker, DayItem, TimeSlot } from "@/components/calendar-picker";
import { DistanceIcon } from "@/components/icons/distance-icon";
import { LocationIcon } from "@/components/icons/location-icon";
import { InfoItem } from "@/components/info-item";
import { LabHeader } from "@/components/lab-header";
import { ThemedView } from "@/components/themed-view";
import { moderateScale, scale, scaleIcon, verticalScale } from "@/constants/scaling";
import { AeonikFonts, BorderRadius, Colors, Shadows } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";

const DAYS: DayItem[] = [
  { day: t("days.fri"), date: 12 },
  { day: t("days.sat"), date: 13 },
  { day: t("days.sun"), date: 14 },
  { day: t("days.mon"), date: 15 },
  { day: t("days.tue"), date: 16 },
  { day: t("days.wed"), date: 17 },
  { day: t("days.thu"), date: 18 },
];

const INITIAL_TIME_SLOTS: TimeSlot[] = [
  { time: "06:00\nPM", isAvailable: true, isSelected: false },
  { time: "06:30\nPM", isAvailable: false, isSelected: false },
  { time: "07:00\nPM", isAvailable: true, isSelected: true },
  { time: "07:30\nPM", isAvailable: false, isSelected: false },
  { time: "08:00\nPM", isAvailable: true, isSelected: true },
  { time: "08:30\nPM", isAvailable: false, isSelected: false },
  { time: "09:00\nPM", isAvailable: false, isSelected: false },
  { time: "10:00\nPM", isAvailable: true, isSelected: true },
];

export default function SelectLabTestScreen() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(5); // Wed is selected by default
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(INITIAL_TIME_SLOTS);
  const currentMonth = t("months.february");

  const handleDaySelect = (index: number) => {
    setSelectedDayIndex(index);
  };

  const handleTimeSlotToggle = (index: number) => {
    if (!timeSlots[index].isAvailable) return;

    setTimeSlots((prev) =>
      prev.map((slot, i) =>
        i === index ? { ...slot, isSelected: !slot.isSelected } : slot
      )
    );
  };

  const handleSendRequest = () => {
    const selectedTimes = timeSlots.filter((slot) => slot.isSelected);
    console.log("Selected day:", DAYS[selectedDayIndex]);
    console.log("Selected times:", selectedTimes);
    // Handle send request logic
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Image */}
          <LabHeader imageSource={require("@/assets/images/Thumb.png")} />

          {/* Content */}
          <View style={styles.content}>
            {/* Lab Info */}
            <Text style={styles.labName}>Medicina Lab</Text>
            <Text style={styles.labDescription}>
              Certified diagnostic laboratory specializing in clinical and dermatology-related tests.
            </Text>

            {/* Location & Distance Row */}
            <View style={styles.infoRow}>
              <InfoItem
                icon={<LocationIcon width={scaleIcon(19)} height={scaleIcon(19)} color={Colors.light.tint} />}
                label={t("selectLabTest.location")}
                value="Amsterdam, Netherlands"
              />
              <InfoItem
                icon={<DistanceIcon width={scaleIcon(19)} height={scaleIcon(19)} pinColor={Colors.light.tint} />}
                label={t("selectLabTest.distance")}
                value={t("selectLabTest.distanceAway", { distance: "1.5 km" })}
              />
            </View>

            {/* Available Time Section */}
            <Text style={styles.sectionTitle}>{t("selectLabTest.availableTime")}</Text>

            {/* Calendar Picker */}
            <CalendarPicker
              month={currentMonth}
              days={DAYS}
              selectedDayIndex={selectedDayIndex}
              timeSlots={timeSlots}
              onDaySelect={handleDaySelect}
              onTimeSlotToggle={handleTimeSlotToggle}
            />
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendRequest}
            activeOpacity={0.8}
          >
            <Text style={styles.sendButtonText}>{t("selectLabTest.sendTestRequest")}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.scaffold,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: verticalScale(24),
  },
  // Content
  content: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(50),
  },
  labName: {
    ...AppTextStyle.headline6,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.text,
    marginBottom: verticalScale(8),
  },
  labDescription: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.regular,
    color: Colors.light.grey500,
    lineHeight: moderateScale(22),
    marginBottom: verticalScale(20),
  },
  // Info Row
  infoRow: {
    flexDirection: "row",
    gap: scale(16),
    marginBottom: verticalScale(24),
  },
  // Section Title
  sectionTitle: {
    ...AppTextStyle.subtitle2,
    fontFamily: AeonikFonts.regular,
    color: Colors.light.grey550,
    marginBottom: verticalScale(16),
  },
  // Bottom Container
  bottomContainer: {
    paddingHorizontal: scale(24),
    paddingVertical: verticalScale(16),
    backgroundColor: Colors.light.scaffold,
  },
  sendButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: BorderRadius.xxl,
    paddingVertical: verticalScale(19),
    alignItems: "center",
    ...Shadows.button,
  },
  sendButtonText: {
    ...AppTextStyle.button,
    color: Colors.light.white,
  },
});
