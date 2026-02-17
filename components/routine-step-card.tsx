import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

import { AppText as Text } from "@/components/app-text";
import { GradientProgressRing } from "@/components/gradient-progress-ring";
import { ClockIcon, LockIcon, StatusIcon, TestIcon } from "@/components/icons";
import {
  moderateScale,
  scale,
  scaledRadius,
  scaleIcon,
  touchTarget,
  verticalScale,
} from "@/constants/scaling";
import { AeonikFonts, BorderRadius, Colors, Fonts, HitSlop, Shadows } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";
import { RoutineStep } from "@/store/slices/home-slice";

export interface RoutineStepCardProps {
  step: RoutineStep;
  isLast: boolean;
  onToggleComplete: () => void;
}

export function RoutineStepCard({ step, isLast, onToggleComplete }: RoutineStepCardProps) {
  const { product } = step;

  const handleProductPress = () => {
    if (product.progress > 0 && !product.needsLabTest) {
      router.push({
        pathname: "/product-details",
        params: { productId: product.id },
      });
    }
  };

  return (
    <View style={styles.stepContainer}>
      <View style={styles.timeline}>
        <View style={styles.timelineCircle}>
          <Text style={styles.timelineNumber}>{step.stepNumber}</Text>
        </View>

        {!isLast && (
          <Image
            source={require("@/assets/images/img_step-connector.png")}
            style={styles.timelineLine}
          />
        )}
      </View>

      {/* Content */}
      <View style={styles.stepContent}>
        <Text style={styles.stepCategory}>{step.category}</Text>
        <TouchableOpacity
          style={styles.productContainer}
          activeOpacity={product.progress > 0 && !product.needsLabTest ? 0.7 : 1}
          onPress={handleProductPress}
        >
          <View style={styles.productCard}>
            {/* Product Image with Gradient Progress Ring */}
            <View style={styles.productImageContainer}>
              <GradientProgressRing size={scale(55)} strokeWidth={scale(6)} progress={product.progress}>
                <View style={styles.productImageWrapper}>
                  {product.progress === 0 ? (
                    <LockIcon size={scaleIcon(25)} />
                  ) : (
                    <Image
                      source={require("@/assets/images/img_product-image.png")}
                      style={styles.productImage}
                      contentFit="cover"
                    />
                  )}
                </View>
              </GradientProgressRing>
            </View>

            {/* Product Info */}
            <View style={styles.productInfo}>
              <Text style={styles.productBrand}>{product.brand}</Text>
              <Text style={styles.productName} numberOfLines={2}>
                {product.name}
              </Text>
              <View style={styles.tagsRow}>
                {product.needsLabTest ? (
                  <View style={styles.labTestBadge}>
                    <TestIcon height={scaleIcon(15)} width={scaleIcon(12)} color={Colors.light.info} />
                    <Text style={styles.labTestText}>{t("routineStep.labTestRequired")}</Text>
                  </View>
                ) : (
                  <>
                    <View style={styles.periodBadge}>
                      <ClockIcon size={scaleIcon(14)} color={Colors.light.successDark} />
                      <Text style={styles.periodText}>
                        {t("routineStep.period", { period: product.period })}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.viewButton}
                      hitSlop={HitSlop.small}
                      onPress={handleProductPress}
                    >
                      <Text style={styles.viewButtonText}>{t("routineStep.view")}</Text>
                      <Ionicons name="chevron-forward" size={scaleIcon(13)} color={Colors.light.lightGrey800} />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>

            {/* Checkbox */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={onToggleComplete}
              activeOpacity={0.7}
              hitSlop={HitSlop.medium}
            >
              {product.isCompleted ? (
                <StatusIcon size={scaleIcon(22)} color={Colors.light.successDark} />
              ) : (
                <View style={styles.checkboxUnchecked} />
              )}
            </TouchableOpacity>
          </View>

          {/* Bottom Button */}
          {product.needsLabTest && (
            <TouchableOpacity
              style={styles.bottomButton}
              activeOpacity={0.8}
              onPress={() => router.push("/lab-test")}
            >
              <Text style={styles.bottomButtonText}>{t("routineStep.clickHere")}</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: "row",
    marginBottom: verticalScale(16),
  },
  // Timeline
  timeline: {
    alignItems: "center",
    marginRight: scale(10),
  },
  timelineCircle: {
    width: scale(24),
    height: scale(24),
    borderRadius: scaledRadius(16),
    backgroundColor: Colors.light.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.light.lightGrey150,
    zIndex: 1,
  },
  timelineNumber: {
    fontSize: moderateScale(17),
    fontFamily: Fonts.medium,
    color: Colors.light.grey700,
    ...Platform.select({
      android: { includeFontPadding: false },
    }),
  },
  timelineLine: {
    flex: 1,
    marginTop: scale(-10),
    marginBottom: scale(-26),
    width: 1,
  },
  stepContent: {
    flex: 1,
  },
  stepCategory: {
    fontSize: moderateScale(17),
    fontFamily: Fonts.semibold,
    color: Colors.light.text,
    marginBottom: verticalScale(12),
    ...Platform.select({
      android: { includeFontPadding: false },
    }),
  },
  // Product Card
  productContainer: {
    backgroundColor: Colors.light.white,
    borderRadius: BorderRadius.lg,
    padding: scale(16),
    flexDirection: "column",
    alignItems: "flex-start",
    ...Shadows.sm,
    overflow: "hidden",
  },
  productCard: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  productImageContainer: {
    backgroundColor: Colors.light.white,
    borderRadius: BorderRadius.full,
    padding: scale(6),
    ...Shadows.md,
    marginRight: scale(16),
  },
  productImageWrapper: {
    width: scale(43),
    height: scale(43),
    borderRadius: scaledRadius(27),
    backgroundColor: Colors.light.lightGrey50,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  productImage: {
    width: scale(43),
    height: scale(40),
  },
  productInfo: {
    flex: 1,
  },
  productBrand: {
    ...AppTextStyle.bodyText2,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
    opacity: 0.5,
  },
  productName: {
    fontSize: moderateScale(16),
    fontFamily: AeonikFonts.medium,
    marginRight: scale(20),
    color: Colors.light.mainDarkColor,
    marginVertical: verticalScale(8),
    ...Platform.select({
      android: { includeFontPadding: false },
    }),
  },
  tagsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  periodBadge: {
    backgroundColor: Colors.light.successLightBg,
    flexDirection: "row",
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(12),
    borderRadius: BorderRadius.full,
    alignItems: "center",
    gap: scale(4),
  },
  periodText: {
    fontSize: moderateScale(13),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.successDark,
    ...Platform.select({
      android: { includeFontPadding: false },
    }),
  },
  viewButton: {
    backgroundColor: Colors.light.lightGrey,
    flexDirection: "row",
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(12),
    borderRadius: BorderRadius.full,
    alignItems: "center",
    gap: scale(1),
  },
  viewButtonText: {
    fontSize: moderateScale(13),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.lightGrey800,
    ...Platform.select({
      android: { includeFontPadding: false },
    }),
  },
  labTestBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.infoLight,
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: BorderRadius.full,
    gap: scale(6),
  },
  labTestText: {
    fontSize: moderateScale(13),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.info,
    ...Platform.select({
      android: { includeFontPadding: false },
    }),
  },
  // Checkbox
  checkboxContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    minWidth: touchTarget(22),
    minHeight: touchTarget(22),
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  checkboxUnchecked: {
    width: scale(22),
    height: scale(22),
    borderRadius: scaledRadius(12),
    borderWidth: 2,
    borderColor: Colors.light.lightGrey300,
    backgroundColor: Colors.light.white,
  },
  // Bottom Button
  bottomButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: BorderRadius.xxl,
    width: "100%",
    paddingVertical: verticalScale(12),
    alignItems: "center",
    marginTop: verticalScale(20),
    ...Shadows.button,
  },
  bottomButtonText: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.regular,
    color: Colors.light.white,
  },
});
