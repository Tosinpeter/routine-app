import { AppText as Text } from '@/components/app-text';
import { scale, verticalScale } from '@/constants/scaling';
import { Fonts, Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { t } from "@/i18n";

const CheckItem = ({ text }: { text: string }) => (
  <View style={styles.bulletItem}>
    <View style={styles.checkIconContainer}>
      <Ionicons name="checkmark" size={12} color={Colors.light.mainDarkAlt} />
    </View>
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

const ProtocolCard = ({
  title,
  subtitle,
  items,
  icon,
  bgColor
}: {
  title: string,
  subtitle: string,
  items: string[],
  icon: any,
  bgColor: string
}) => (
  <View style={[styles.card, { backgroundColor: bgColor }]}>
    <View style={styles.cardContent}>
      {/* Icon */}
      <View style={styles.iconContainer}>
        <Image source={icon} style={styles.icon} contentFit="contain" cachePolicy="memory-disk" transition={150} />
      </View>

      {/* Content */}
      <View style={styles.textContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </View>

        {/* Bullet List */}
        <View style={styles.bulletList}>
          {items.map((item, index) => (
            <CheckItem key={index} text={item} />
          ))}
        </View>
      </View>
    </View>
  </View>
);

export function ProtocolSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t("treatmentPlan.protocol.sectionTitle")}</Text>

      <ProtocolCard
        title={t("treatmentPlan.protocol.primaryTitle")}
        subtitle={t("treatmentPlan.protocol.primarySubtitle")}
        items={[
          t("treatmentPlan.protocol.primaryItem1"),
          t("treatmentPlan.protocol.primaryItem2"),
          t("treatmentPlan.protocol.primaryItem3"),
        ]}
        icon={require('@/assets/images/protocol-primary.png')}
        bgColor="#EEE2D6"
      />

      <ProtocolCard
        title={t("treatmentPlan.protocol.supplementTitle")}
        subtitle={t("treatmentPlan.protocol.supplementSubtitle")}
        items={[
          t("treatmentPlan.protocol.supplementItem1"),
          t("treatmentPlan.protocol.supplementItem2"),
          t("treatmentPlan.protocol.supplementItem3"),
        ]}
        icon={require('@/assets/images/protocol-supplement.png')}
        bgColor="#EDEAE4"
      />

      <ProtocolCard
        title={t("treatmentPlan.protocol.deviceTitle")}
        subtitle={t("treatmentPlan.protocol.deviceSubtitle")}
        items={[
          t("treatmentPlan.protocol.deviceItem1"),
          t("treatmentPlan.protocol.deviceItem2"),
          t("treatmentPlan.protocol.deviceItem3"),
        ]}
        icon={require('@/assets/images/protocol-device.png')}
        bgColor="#F2EEFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    gap: 8,
  },
  sectionTitle: {
    fontFamily: Fonts.medium,
    fontSize: scale(20),
    lineHeight: scale(24),
    color: '#20201E',
    marginBottom: 8,
    marginStart: 4,
  },
  card: {
    width: '100%',
    borderRadius: 8,
    padding: 16,
    minHeight: verticalScale(181),
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 28,
    height: 28,
  },
  textContent: {
    flex: 1,
    gap: 16,
  },
  cardHeader: {
    gap: 8,
  },
  cardTitle: {
    fontFamily: Fonts.medium,
    fontSize: scale(18),
    lineHeight: scale(22),
    color: '#20201E',
  },
  cardSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: scale(13),
    lineHeight: scale(18),
    color: '#20201E',
    opacity: 0.8,
  },
  bulletList: {
    gap: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkIconContainer: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bulletText: {
    fontFamily: Fonts.regular,
    fontSize: scale(13),
    lineHeight: scale(17),
    color: '#20201E',
  },
});
