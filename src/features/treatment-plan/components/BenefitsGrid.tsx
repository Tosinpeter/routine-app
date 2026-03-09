import { AppText as Text } from '@/components/app-text';
import { scale, verticalScale } from '@/constants/scaling';
import { Fonts } from '@/constants/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { t } from "@/i18n";

function getLeftColumnBenefits() {
  return [
    { id: 'derm', label: t("treatmentPlan.benefits.dermatologistTested"), icon: require('@/assets/images/img_dermatologies1.png') },
    { id: 'paraben', label: t("treatmentPlan.benefits.parabenFree"), icon: require('@/assets/images/img_Paraben-free.png') },
    { id: 'sulfate', label: t("treatmentPlan.benefits.sulfateFree"), icon: require('@/assets/images/img_benefit-sulfate-free.png') },
  ];
}

function getRightColumnBenefits() {
  return [
    { id: 'non-comedogenic', label: t("treatmentPlan.benefits.nonComedogenic"), icon: require('@/assets/images/img_benefit-non-comedogenic.png') },
    { id: 'fragrance', label: t("treatmentPlan.benefits.fragranceFree"), icon: require('@/assets/images/img_benefit-fragrance-free.png') },
    { id: 'vegan', label: t("treatmentPlan.benefits.vegan"), icon: require('@/assets/images/img_benefit-vegan.png') },
  ];
}

export function BenefitsGrid() {
  return (
    <View style={styles.benefitsGrid}>
      <View style={styles.benefitList}>

        {/* Left Column */}
        <View style={styles.benefitItemGroup}>
          {getLeftColumnBenefits().map((item) => (
            <View key={item.id} style={styles.benefitItem}>
              <Image
                source={item.icon}
                style={styles.icon}
                contentFit="contain"
                cachePolicy="memory-disk"
                transition={150}
              />
              <Text style={styles.labelText}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* Right Column */}
        <View style={styles.benefitItemGroup}>
          {getRightColumnBenefits().map((item) => (
            <View key={item.id} style={styles.benefitItem}>
              <Image
                source={item.icon}
                style={styles.icon}
                contentFit="contain"
                cachePolicy="memory-disk"
                transition={150}
              />
              <Text style={styles.labelText}>{item.label}</Text>
            </View>
          ))}
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  benefitsGrid: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F2F4F7',
    borderRadius: 16,
    paddingVertical: verticalScale(24),
    paddingHorizontal: scale(44),
    alignItems: 'center',
    gap: 8,
  },
  benefitList: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scale(54),
  },
  benefitItemGroup: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: verticalScale(24),
  },
  benefitItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: verticalScale(12),
    maxWidth: scale(110),
  },
  icon: {
    width: scale(24),
    height: scale(24),
  },
  labelText: {
    fontFamily: Fonts.regular,
    fontSize: scale(14),
    lineHeight: scale(15),
    textAlign: 'center',
    color: '#20201E',
    opacity: 0.8,
  },
});
