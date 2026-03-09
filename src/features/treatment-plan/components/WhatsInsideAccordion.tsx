import { AppText as Text } from '@/components/app-text';
import { scale } from '@/constants/scaling';
import { Fonts, Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { t } from "@/i18n";

const CheckListItem = ({ text }: { text: string }) => (
  <View style={styles.bulletItem}>
    <Ionicons name="checkmark-circle" size={16} color={Colors.light.tint} />
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

function getAccordionItems() {
  return [
    {
      id: '1',
      title: t("treatmentPlan.whatsInside.activeFormulaTitle"),
      subtitle: t("treatmentPlan.whatsInside.activeFormulaSubtitle"),
      bullets: [
        t("treatmentPlan.whatsInside.activeFormulaBullet1"),
        t("treatmentPlan.whatsInside.activeFormulaBullet2"),
        t("treatmentPlan.whatsInside.activeFormulaBullet3"),
        t("treatmentPlan.whatsInside.activeFormulaBullet4"),
      ]
    },
    {
      id: '2',
      title: t("treatmentPlan.whatsInside.supplementTitle"),
      subtitle: t("treatmentPlan.whatsInside.supplementSubtitle"),
      bullets: [
        t("treatmentPlan.whatsInside.supplementBullet1"),
        t("treatmentPlan.whatsInside.supplementBullet2"),
        t("treatmentPlan.whatsInside.supplementBullet3"),
      ]
    },
    {
      id: '3',
      title: t("treatmentPlan.whatsInside.homeDeviceTitle"),
      subtitle: t("treatmentPlan.whatsInside.homeDeviceSubtitle"),
      bullets: [
        t("treatmentPlan.whatsInside.homeDeviceBullet1"),
        t("treatmentPlan.whatsInside.homeDeviceBullet2"),
      ]
    },
    {
      id: '4',
      title: t("treatmentPlan.whatsInside.stepByStepTitle"),
      subtitle: t("treatmentPlan.whatsInside.stepByStepSubtitle"),
      bullets: [
        t("treatmentPlan.whatsInside.stepByStepBullet1"),
        t("treatmentPlan.whatsInside.stepByStepBullet2"),
      ]
    },
    {
      id: '5',
      title: t("treatmentPlan.whatsInside.progressTrackingTitle"),
      subtitle: t("treatmentPlan.whatsInside.progressTrackingSubtitle"),
      bullets: [
        t("treatmentPlan.whatsInside.progressTrackingBullet1"),
        t("treatmentPlan.whatsInside.progressTrackingBullet2"),
      ]
    },
  ];
}

function AccordionItem({ item }: { item: any }) {
  const [isOpen, setIsOpen] = useState(item.id === '1');
  const heightValue = useSharedValue(item.id === '1' ? 1 : 0);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    heightValue.value = withTiming(isOpen ? 0 : 1);
  };

  const containerStyle = [
    styles.itemContainer,
    isOpen ? styles.itemContainerOpen : styles.itemContainerClosed
  ];

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggleOpen}
        activeOpacity={0.8}
      >
        <View style={styles.headerContent}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          {isOpen && <Text style={styles.itemSubtitle}>{item.subtitle}</Text>}
        </View>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={24}
          color={Colors.light.grey600}
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.contentContainer}>
          {item.bullets.map((bullet: string, index: number) => (
            <CheckListItem key={index} text={bullet} />
          ))}
        </View>
      )}
    </View>
  );
}

export function WhatsInsideAccordion() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t("treatmentPlan.whatsInside.sectionTitle")}</Text>
      <View style={styles.list}>
        {getAccordionItems().map((item) => (
          <AccordionItem key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  sectionTitle: {
    fontFamily: Fonts.medium,
    fontSize: scale(20),
    lineHeight: scale(24),
    color: '#20201E',
  },
  list: {
    gap: 8,
    width: '100%',
  },
  itemContainer: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemContainerClosed: {
    backgroundColor: '#EDEBE3',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 48,
    justifyContent: 'center',
  },
  itemContainerOpen: {
    backgroundColor: '#F6F0EE',
    padding: 16,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerContent: {
    flex: 1,
    gap: 8,
  },
  itemTitle: {
    fontFamily: Fonts.medium,
    fontSize: scale(17),
    lineHeight: scale(20),
    color: '#20201E',
  },
  itemSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: scale(14),
    lineHeight: scale(20),
    color: '#20201E',
    opacity: 0.8,
    marginTop: 4,
  },
  contentContainer: {
    gap: 12,
    marginTop: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bulletText: {
    fontFamily: Fonts.regular,
    fontSize: scale(13),
    lineHeight: scale(17),
    color: '#20201E',
    flex: 1,
  },
});
