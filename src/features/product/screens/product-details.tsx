import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText as Text } from "@/components/app-text";
import { BackButton } from "@/components/back-button";
import { ExpandableSection } from "@/features/product/components/ExpandableSection";
import { InfoCard } from "@/features/product/components/InfoCard";
import { ProductHeader } from "@/features/product/components/ProductHeader";
import { ProductImageCard } from "@/features/product/components/ProductImageCard";
import { moderateScale, scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors, Fonts } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";
import { FALLBACK_PRODUCT } from "@/shared/data/product-defaults";
import { useAppSelector } from "@/shared/store/hooks";
import { InfoIcon } from "@/shared/components/icons/info-icon";
import { HowToUseIcon } from "@/shared/components/icons/how-to-use-icon";
import { ProductDetailsIcon } from "@/shared/components/icons/product-details-icon";
import { PinIcon } from "@/shared/components/icons/pin-icon";
import { WarningTriangleIcon } from "@/shared/components/icons/warning-triangle-icon";

export default function ProductDetailsScreen() {
  const params = useLocalSearchParams();
  const productId = params.productId as string;

  const product = useAppSelector((state) =>
    state.home.routineSteps
      .map((step) => step.product)
      .find((p) => p.id === productId)
  );

  const displayProduct = product || FALLBACK_PRODUCT;
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>{t("product.details.title")}</Text>
        <View style={{ width: scale(40) }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Image Card */}
        <ProductImageCard
          source={require("@/assets/images/ProductImagebig.webp")}
        />

        {/* Product Info */}
        <ProductHeader
          brandName={displayProduct.brand}
          productName={displayProduct.name}
          tags={displayProduct.tags || []}
        />

        {/* Description Section */}
        {displayProduct.description && (
          <ExpandableSection
            title={t("product.details.description")}
            icon={<InfoIcon size={scale(16)} />}
            iconBgColor={Colors.light.warningLightBg}
          >
            <Text style={styles.descriptionText}>
              {displayProduct.description}
            </Text>
          </ExpandableSection>
        )}

        {/* How to Use Section */}
        {displayProduct.instructions && displayProduct.instructions.length > 0 && (
          <ExpandableSection
            title={t("product.details.howToUse")}
            icon={<HowToUseIcon size={scale(16)} />}
            iconBgColor={Colors.light.successIconLight}
            defaultExpanded={true}
          >
            <View style={styles.howToUseContent}>
              {/* Before/After Image */}
              <View style={styles.beforeAfterContainer}>
                <View style={styles.beforeAfterImage}>
                  <Image
                    source={require("@/assets/images/comparison-face.png")}
                    style={styles.comparisonImage}
                    contentFit="cover"
                    cachePolicy="memory-disk"
                  />
                  <View style={styles.beforeBadge}>
                    <Text style={styles.badgeText}>{t("product.details.before")}</Text>
                  </View>
                  <View style={styles.afterBadge}>
                    <Text style={styles.badgeText}>{t("product.details.after")}</Text>
                  </View>
                  {/* Play Button Overlay */}
                  <View style={styles.playButtonOverlay}>
                    <View style={styles.playButton}>
                      <Ionicons
                        name="play"
                        size={scale(20)}
                        color={Colors.light.white}
                      />
                    </View>
                  </View>
                </View>
              </View>

              {/* Instructions */}
              <View style={styles.instructions}>
                {displayProduct.instructions.map((instruction, index) => (
                  <Text key={instruction} style={styles.instructionStep}>
                    {index + 1}. {instruction}
                  </Text>
                ))}
              </View>
            </View>
          </ExpandableSection>
        )}

        {/* Product Details Section */}
        {displayProduct.details && displayProduct.details.length > 0 && (
          <ExpandableSection
            title={t("product.details.productDetails")}
            icon={<ProductDetailsIcon size={scale(16)} />}
            iconBgColor={Colors.light.accentPurpleLight}
          >
            <View style={styles.productDetailsContent}>
              {displayProduct.details.map((detail) => (
                <View key={detail.label} style={styles.detailRow}>
                  <Text style={styles.detailLabel}>{detail.label}</Text>
                  <Text style={styles.detailValue}>{detail.value}</Text>
                </View>
              ))}
            </View>
          </ExpandableSection>
        )}

        {/* Doctor's Notes */}
        {displayProduct.doctorNotes && (
          <InfoCard
            title={t("product.details.doctorNotes")}
            icon={<PinIcon size={scale(20)} />}
            titleColor={Colors.light.successDark}
            backgroundColor={Colors.light.successLightBg}
            borderColor={Colors.light.successIconLight}
            textColor={Colors.light.successDark}
          >
            <Text style={[styles.infoText, { color: Colors.light.successDark }]}>
              {displayProduct.doctorNotes}
            </Text>
          </InfoCard>
        )}

        {/* Important Warnings */}
        {displayProduct.warnings && displayProduct.warnings.length > 0 && (
          <InfoCard
            title={t("product.details.importantWarnings")}
            icon={<WarningTriangleIcon size={scale(20)} />}
            titleColor={Colors.light.error}
            backgroundColor={Colors.light.errorLightBg}
            borderColor={Colors.light.errorBorder}
            textColor={Colors.light.error}
          >
            <View style={styles.warningsList}>
              {displayProduct.warnings.map((warning) => (
                <Text key={warning} style={[styles.warningItem, { color: Colors.light.error }]}>
                  • {warning}
                </Text>
              ))}
            </View>
          </InfoCard>
        )}

        {/* Bottom Spacing */}
        <View style={{ height: verticalScale(40) }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.scaffold,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(16),
    backgroundColor: Colors.light.scaffold,
  },
  headerTitle: {
    ...AppTextStyle.headline4,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scale(20),
  },
  descriptionText: {
    fontFamily: Fonts.regular,
    fontSize: moderateScale(14),
    color: Colors.light.grey600,
    lineHeight: scale(20),
  },
  howToUseContent: {
    gap: verticalScale(16),
  },
  beforeAfterContainer: {
    width: "100%",
    aspectRatio: 2,
    marginBottom: verticalScale(8),
  },
  beforeAfterImage: {
    width: "100%",
    height: "100%",
    borderRadius: scale(12),
    overflow: "hidden",
    position: "relative",
  },
  comparisonImage: {
    width: "100%",
    height: "100%",
  },
  beforeBadge: {
    position: "absolute",
    top: scale(12),
    start: scale(12),
    backgroundColor: Colors.light.blackAlpha60,
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: scale(6),
  },
  afterBadge: {
    position: "absolute",
    top: scale(12),
    end: scale(12),
    backgroundColor: Colors.light.blackAlpha60,
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: scale(6),
  },
  badgeText: {
    fontFamily: Fonts.medium,
    fontSize: moderateScale(12),
    color: Colors.light.white,
  },
  playButtonOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  playButton: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    backgroundColor: Colors.light.warning,
    alignItems: "center",
    justifyContent: "center",
    paddingStart: scale(4),
  },
  instructions: {
    gap: verticalScale(8),
  },
  instructionStep: {
    fontFamily: Fonts.regular,
    fontSize: moderateScale(14),
    color: Colors.light.grey600,
    lineHeight: scale(20),
  },
  productDetailsContent: {
    gap: verticalScale(12),
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: {
    fontFamily: Fonts.medium,
    fontSize: moderateScale(14),
    color: Colors.light.grey600,
  },
  detailValue: {
    fontFamily: Fonts.regular,
    fontSize: moderateScale(14),
    color: Colors.light.mainDarkColor,
  },
  infoText: {
    fontFamily: Fonts.regular,
    fontSize: moderateScale(14),
    lineHeight: scale(20),
  },
  warningsList: {
    gap: verticalScale(4),
  },
  warningItem: {
    fontFamily: Fonts.regular,
    fontSize: moderateScale(14),
    lineHeight: scale(20),
  },
});


