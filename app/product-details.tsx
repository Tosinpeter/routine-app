import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText as Text } from "@/components/app-text";
import { BackButton } from "@/components/back-button";
import { ExpandableSection } from "@/components/product/ExpandableSection";
import { InfoCard } from "@/components/product/InfoCard";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductImageCard } from "@/components/product/ProductImageCard";
import { moderateScale, scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors, Fonts } from "@/constants/theme";
import { useAppSelector } from "@/store/hooks";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";

export default function ProductDetailsScreen() {
  const params = useLocalSearchParams();
  const productId = params.productId as string;

  // Get product from store
  const product = useAppSelector((state) =>
    state.home.routineSteps
      .map((step) => step.product)
      .find((p) => p.id === productId)
  );

  // Fallback to default product if not found
  const displayProduct = product || {
    brand: "Dermatologica",
    name: "Rapid Reveal Peel",
    tags: ["Exfoliant", "Normal"],
    description:
      "A professional-grade chemical peel that gently exfoliates and reveals smoother, brighter skin. Formulated with a blend of AHA and BHA acids to improve skin texture and tone.",
    instructions: [
      "Cleanse your face thoroughly",
      "Apply a thin layer avoiding eye area",
      "Leave on for 5-7 minutes",
      "Rinse thoroughly with lukewarm water",
    ],
    details: [
      { label: "Size", value: "50ml" },
      { label: "Key Ingredients", value: "AHA, BHA, Salicylic Acid" },
      { label: "Skin Type", value: "Normal, Oily" },
    ],
    doctorNotes: "Excellent choice for maintaining skin barrier function.",
    warnings: ["Avoid contact with eyes", "For external use only"],
  };
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
          source={require("@/assets/images/ProductImagebig.png")}
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
            icon="information-circle-outline"
            iconColor="#F79009"
            iconBgColor="#FEF0C7"
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
            icon="checkmark-circle-outline"
            iconColor="#17B26A"
            iconBgColor="#D1FADF"
            defaultExpanded={true}
          >
            <View style={styles.howToUseContent}>
              {/* Before/After Image */}
              <View style={styles.beforeAfterContainer}>
                <View style={styles.beforeAfterImage}>
                  <Image
                    source={require("@/assets/images/comparison-face.png")}
                    style={styles.comparisonImage}
                    resizeMode="cover"
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
                  <Text key={index} style={styles.instructionStep}>
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
            icon="cube-outline"
            iconColor="#7C3AED"
            iconBgColor="#F4F3FF"
          >
            <View style={styles.productDetailsContent}>
              {displayProduct.details.map((detail, index) => (
                <View key={index} style={styles.detailRow}>
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
            icon="document-text-outline"
            iconColor="#079455"
            backgroundColor="#ECFDF3"
            borderColor="#D1FADF"
            textColor="#079455"
          >
            <Text style={[styles.infoText, { color: "#079455" }]}>
              {displayProduct.doctorNotes}
            </Text>
          </InfoCard>
        )}

        {/* Important Warnings */}
        {displayProduct.warnings && displayProduct.warnings.length > 0 && (
          <InfoCard
            title={t("product.details.importantWarnings")}
            icon="warning-outline"
            iconColor="#F04438"
            backgroundColor="#FEF3F2"
            borderColor="#FECDCA"
            textColor="#F04438"
          >
            <View style={styles.warningsList}>
              {displayProduct.warnings.map((warning, index) => (
                <Text key={index} style={[styles.warningItem, { color: "#F04438" }]}>
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
    left: scale(12),
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: scale(6),
  },
  afterBadge: {
    position: "absolute",
    top: scale(12),
    right: scale(12),
    backgroundColor: "rgba(0, 0, 0, 0.6)",
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
    backgroundColor: "#F79009",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: scale(4),
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


