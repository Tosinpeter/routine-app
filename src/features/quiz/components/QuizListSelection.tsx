import React from "react";
import { View, StyleSheet, Pressable, Image, ImageSourcePropType } from "react-native";
import { AppText as Text } from "@/components/app-text";
import { AeonikFonts, Colors } from "@/constants/theme";
import { scale, verticalScale } from "@/constants/scaling";
import { AppTextStyle } from "@/constants/typography";

interface QuizOption {
  id: string;
  label: string;
  imageSource: ImageSourcePropType;
}

interface QuizListSelectionProps {
  options: QuizOption[];
  selectedOption?: string;
  onSelectOption: (optionId: string) => void;
}

export function QuizListSelection({
  options,
  selectedOption,
  onSelectOption,
}: QuizListSelectionProps) {
  return (
    <View style={styles.container}>
      {options.map((option, index) => {
        const isSelected = selectedOption === option.id;
        const _isLast = index === options.length - 1;

        return (
          <React.Fragment key={option.id}>
            <Pressable
              style={styles.option}
              onPress={() => onSelectOption(option.id)}
            >
              <View style={styles.optionContent}>
                <View style={styles.radioButton}>
                  {isSelected && <View style={styles.radioButtonInner} />}
                </View>
                <Text style={styles.label}>{option.label}</Text>
              </View>
              <Image
                source={option.imageSource}
                style={styles.optionImage}
                resizeMode="contain"
              />
            </Pressable>
            <View style={styles.divider} />
          </React.Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(16),
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.mainDarkAlpha16,
    marginHorizontal: scale(20),
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  radioButton: {
    width: scale(22),
    height: scale(22),
    borderRadius: scale(11),
    borderWidth: 1,
    borderColor: Colors.light.tint,
    marginEnd: scale(16),
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonInner: {
    width: scale(15),
    height: scale(15),
    borderRadius: scale(7.5),
    backgroundColor: Colors.light.tint,
  },
  label: {
    ...AppTextStyle.subtitle2,
    color: Colors.light.text,
    fontFamily:AeonikFonts.medium,
    flex: 1,
    fontSize: 16,
  },
  optionImage: {
    width: scale(40),
    height: scale(40),
    marginStart: scale(12),
  },
});
