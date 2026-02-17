import { AppText as Text } from '@/components/app-text';
import { scale } from '@/constants/scaling';
import { Fonts } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

const CheckListItem = ({ text }: { text: string }) => (
  <View style={styles.bulletItem}>
    <Ionicons name="checkmark-circle" size={16} color="#CF604A" />
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

const accordionItems = [
  {
    id: '1',
    title: 'Active Formula',
    subtitle: 'A personalized blend of active ingredients designed to target your specific skin concerns.',
    bullets: [
      'Custom-strength prescription actives',
      'Targets acne, pigmentation, and texture',
      'Formulated based on your AI scan & dermatologist review',
      'Clinically proven ingredients'
    ]
  },
  {
    id: '2',
    title: 'Supplement',
    subtitle: 'Daily nutritional support for skin health.',
    bullets: [
      'Boosts skin immunity',
      'Reduces inflammation',
      'Supports overall wellness'
    ]
  },
  {
    id: '3',
    title: 'Home Device',
    subtitle: 'Professional grade tools for home use.',
    bullets: [
      'Increases product absorption',
      'Stimulates collagen production'
    ]
  },
  {
    id: '4',
    title: 'Step-by-Step Plan',
    subtitle: 'Your daily guide to specific usage.',
    bullets: [
      'Morning & Night routine',
      'Application techniques'
    ]
  },
  {
    id: '5',
    title: 'Progress Tracking',
    subtitle: 'Monitor your improvements over time.',
    bullets: [
      'Weekly photo check-ins',
      'Dermatologist feedback'
    ]
  },
];

function AccordionItem({ item }: { item: any }) {
  // Default first item to open for demo purposes, or manage via parent state.
  // The screenshot shows "Active Formula" open.
  const [isOpen, setIsOpen] = useState(item.id === '1');
  const heightValue = useSharedValue(item.id === '1' ? 1 : 0); // 0 or 1 for expansion state logic

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    // Animate height/opacity implicitly or explicitly. 
    // Here we toggle state and let layout animation or conditional rendering handle it strictly per Figma "variants" logic
    // But for smooth Reanimated:
    heightValue.value = withTiming(isOpen ? 0 : 1);
  };

  // Dynamic Styles based on state
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
          color="#475467"
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
      <Text style={styles.sectionTitle}>What's Inside:</Text>
      <View style={styles.list}>
        {accordionItems.map((item) => (
          <AccordionItem key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // maxWidth removed
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16, // padding: 16px
    gap: 16, // Gap between Title and List
  },
  sectionTitle: {
    fontFamily: Fonts.medium, // weight: 500
    fontSize: scale(20),
    lineHeight: scale(24),
    color: '#20201E',
  },
  list: {
    gap: 8, // Gap between accordion items: 8px
    width: '100%',
  },
  itemContainer: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemContainerClosed: {
    backgroundColor: '#EDEBE3', // Soft Gray
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 48, // Fixed height for collapsed
    justifyContent: 'center',
  },
  itemContainerOpen: {
    backgroundColor: '#F6F0EE', // Soft Peach (Soft-2)
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
    fontFamily: Fonts.medium, // weight: 500
    fontSize: scale(17), // or 16px in collapsed
    lineHeight: scale(20),
    color: '#20201E',
  },
  itemSubtitle: {
    fontFamily: Fonts.regular, // weight: 400
    fontSize: scale(14),
    lineHeight: scale(20),
    color: '#20201E',
    opacity: 0.8,
    marginTop: 4,
  },
  contentContainer: {
    gap: 12, // Gap between bullets
    marginTop: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bulletText: {
    fontFamily: Fonts.regular, // SF Pro Regular / Aeonik
    fontSize: scale(13),
    lineHeight: scale(17),
    color: '#20201E',
    flex: 1,
  },
});
