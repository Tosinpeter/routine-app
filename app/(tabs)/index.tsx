import { Image } from "expo-image";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText as Text } from "@/components/app-text";
import { RoutineStepCard } from "@/components/routine-step-card";
import { ThemedView } from "@/components/themed-view";
import { TimeToggleButton } from "@/components/time-toggle-button";
import {
  moderateScale,
  scale,
  SCREEN_WIDTH,
  tabBarHeight,
  touchTarget,
  verticalScale,
} from "@/constants/scaling";
import { Colors, Fonts, HitSlop, Shadows } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setSelectedDay,
  setTimeOfDay,
  toggleProductCompletion,
} from "@/store/slices/home-slice";

const DAYS = [1, 2, 3, 4, 5, 6, 7];

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { selectedDay, timeOfDay, routineSteps, userName } = useAppSelector(
    (state) => state.home
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <Image
          source={require("@/assets/images/img_background-effects.png")}
          style={styles.backgroundImage}
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Greeting Header */}
            <Text style={styles.greeting}>
              {getGreeting()}, {userName}
            </Text>

            {/* Day Selector */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.daySelector}
            >
              {DAYS.map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayItem,
                    selectedDay === day && styles.dayItemSelected,
                  ]}
                  onPress={() => dispatch(setSelectedDay(day))}
                  activeOpacity={0.7}
                  hitSlop={HitSlop.small}
                >
                  <Text
                    style={[
                      styles.dayLabel,
                      selectedDay === day && styles.dayLabelSelected,
                    ]}
                  >
                    Day
                  </Text>
                  <Text
                    style={[
                      styles.dayNumber,
                      selectedDay === day && styles.dayNumberSelected,
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Time of Day Toggle */}
            <View style={styles.timeToggleContainer}>
              <TimeToggleButton
                label="Morning"
                icon="sunny-outline"
                isActive={timeOfDay === "morning"}
                onPress={() => dispatch(setTimeOfDay("morning"))}
              />
              <TimeToggleButton
                label="Evening"
                icon="moon-outline"
                isActive={timeOfDay === "evening"}
                onPress={() => dispatch(setTimeOfDay("evening"))}
              />
            </View>

            {/* Routine Steps */}
            <View style={styles.routineList}>
              {routineSteps.map((step, index) => (
                <RoutineStepCard
                  key={step.id}
                  step={step}
                  isLast={index === routineSteps.length - 1}
                  onToggleComplete={() =>
                    dispatch(toggleProductCompletion(step.id))
                  }
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: tabBarHeight + scale(20),
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    alignSelf: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  content: {
    flex: 1,
    paddingTop: verticalScale(24),
    paddingHorizontal: scale(16),
  },
  greeting: {
    ...AppTextStyle.headline4,
    color: Colors.light.text,
    marginBottom: verticalScale(24),
  },
  daySelector: {
    flexDirection: "row",
    gap: scale(12),
    paddingVertical: scale(4),
  },
  dayItem: {
    width: touchTarget(44),
    height: touchTarget(44),
    borderRadius: scale(32),
    backgroundColor: Colors.light.whiteTransparent50,
    alignItems: "center",
    justifyContent: "center",
  },
  dayItemSelected: {
    backgroundColor: Colors.light.white,
    ...Shadows.md,
  },
  dayLabel: {
    fontSize: moderateScale(11),
    fontFamily: Fonts.semibold,
    color: Colors.light.grey400,
    ...Platform.select({
      android: { includeFontPadding: false },
    }),
  },
  dayLabelSelected: {
    color: Colors.light.brown900,
  },
  dayNumber: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.semibold,
    color: Colors.light.grey400,
    ...Platform.select({
      android: { includeFontPadding: false },
    }),
  },
  dayNumberSelected: {
    color: Colors.light.brown900,
  },
  // Time Toggle
  timeToggleContainer: {
    flexDirection: "row",
    backgroundColor: Colors.light.white,
    borderRadius: scale(100),
    height: verticalScale(56),
    ...Shadows.md,
    width: "100%",
    padding: scale(4),
    marginTop: verticalScale(24),
    alignSelf: "flex-start",
  },
  // Routine List
  routineList: {
    marginTop: verticalScale(24),
  },
});
