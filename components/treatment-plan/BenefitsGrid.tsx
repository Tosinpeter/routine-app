import { AppText as Text } from '@/components/app-text';
import { scale, verticalScale } from '@/constants/scaling';
import { Fonts } from '@/constants/theme';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

// Left Column Data
const leftColumnBenefits = [
  { id: 'derm', label: 'Dermatologist-\ntested', icon: require('@/assets/images/img_dermatologies1.png') },
  { id: 'paraben', label: 'Paraben-free', icon: require('@/assets/images/img_Paraben-free.png') },
  { id: 'sulfate', label: 'Sulfate-free', icon: require('@/assets/images/img_benefit-sulfate-free.png') },
];

// Right Column Data
const rightColumnBenefits = [
  { id: 'non-comedogenic', label: 'Non-\ncomedogenic', icon: require('@/assets/images/img_benefit-non-comedogenic.png') },
  { id: 'fragrance', label: 'Fragrance-free', icon: require('@/assets/images/img_benefit-fragrance-free.png') },
  { id: 'vegan', label: 'Vegan', icon: require('@/assets/images/img_benefit-vegan.png') },
];

export function BenefitsGrid() {
  return (
    <View style={styles.benefitsGrid}>
      <View style={styles.benefitList}>

        {/* Left Column */}
        <View style={styles.benefitItemGroup}>
          {leftColumnBenefits.map((item) => (
            <View key={item.id} style={styles.benefitItem}>
              <Image
                source={item.icon}
                style={styles.icon}
                resizeMode="contain"
              />
              <Text style={styles.labelText}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* Right Column */}
        <View style={styles.benefitItemGroup}>
          {rightColumnBenefits.map((item) => (
            <View key={item.id} style={styles.benefitItem}>
              <Image
                source={item.icon}
                style={styles.icon}
                resizeMode="contain"
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
    // Auto layout: column, centered
    width: '100%',
    // maxWidth removed
    // height: 262px (dynamic height is better for text wrapping, but minHeight can apply)
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F2F4F7',
    borderRadius: 16,
    paddingVertical: verticalScale(24), // padding: 24px
    paddingHorizontal: scale(44), // padding: 44px
    alignItems: 'center',
    gap: 8,
  },
  benefitList: {
    // Auto layout: row, flex-start
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scale(54), // gap: 54px
  },
  benefitItemGroup: {
    // Auto layout: column, centered
    flexDirection: 'column',
    alignItems: 'center',
    gap: verticalScale(24), // gap: 24px
  },
  benefitItem: {
    // Auto layout: column, centered
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: verticalScale(12), // gap: 12px
    // Widths vary in CSS (105px, 82px etc), but center alignment handles visual flow
    maxWidth: scale(110),
  },
  icon: {
    width: scale(24), // Width: 24px
    height: scale(24), // Height: 24px
  },
  labelText: {
    fontFamily: Fonts.regular, // font-weight: 400
    fontSize: scale(14), // font-size: 14px
    lineHeight: scale(15), // line-height: 110% approx
    textAlign: 'center',
    color: '#20201E', // Main Dark
    opacity: 0.8,
  },
});
