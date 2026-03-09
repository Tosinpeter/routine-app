import React from "react";
import { View, StyleSheet, Pressable, FlatList } from "react-native";
import { Image } from "expo-image";
import type { ImageSourcePropType } from "react-native";
import { AppText as Text } from "@/components/app-text";
import { AeonikFonts, Colors, Shadows } from "@/constants/theme";
import { scale, verticalScale } from "@/constants/scaling";
import { AppTextStyle } from "@/constants/typography";

interface QuizOption {
  id: string;
  label: string;
  imageSource: ImageSourcePropType;
}

interface QuizCardSelectionProps {
  options: QuizOption[];
  selectedOption?: string;
  onSelectOption: (optionId: string) => void;
}

export function QuizCardSelection({
  options,
  selectedOption,
  onSelectOption,
}: QuizCardSelectionProps) {
  const renderItem = ({ item }: { item: QuizOption }) => {
    const isSelected = selectedOption === item.id;

    return (
      <Pressable
        style={[
          styles.card,
          isSelected && styles.cardSelected,
        ]}
        onPress={() => onSelectOption(item.id)}
      >
        <View style={styles.imageContainer}>
          <Image
            source={item.imageSource}
            style={styles.cardImage}
            contentFit="contain"
            cachePolicy="memory-disk"
            recyclingKey={`quiz-${item.id}`}
          />
        </View>
        <Text style={styles.label}>{item.label}</Text>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={options}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(8),
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: verticalScale(12),
    gap: scale(12),
  },
  card: {
    flex: 1,
    maxWidth: "48%",
    aspectRatio: 0.80,
    backgroundColor: Colors.light.white,
    borderRadius: 20,
    padding: scale(20),
    paddingHorizontal: scale(16),
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 3,
    borderColor: "transparent",
    ...Shadows.sm,
  },
  cardSelected: {
    borderColor: Colors.light.tint,
    backgroundColor: Colors.light.white,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(16),
    paddingTop: verticalScale(8),
  },
  cardImage: {
    height: scale(88),
    width: scale(88),
  },
  label: {
    ...AppTextStyle.bodyTextSemibold,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.text,
    textAlign: "center",
  },
});
