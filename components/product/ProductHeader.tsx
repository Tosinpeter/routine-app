import { StyleSheet, View } from "react-native";

import { AppText as Text } from "@/components/app-text";
import { scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors, Fonts } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";

interface ProductHeaderProps {
  brandName: string;
  productName: string;
  tags: string[];
}

export function ProductHeader({ brandName, productName, tags }: ProductHeaderProps) {
  return (
    <View style={styles.productInfo}>
      <Text style={styles.brandName}>{brandName}</Text>
      <Text style={styles.productName}>{productName}</Text>

      {/* Tags */}
      <View style={styles.tags}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productInfo: {
    marginBottom: verticalScale(20),
  },
  brandName: {
    ...AppTextStyle.subtitle1,
    fontSize: scale(14),
    opacity: 0.5,
    fontFamily: AeonikFonts.medium,
    marginBottom: verticalScale(5),
  },
  productName: {
    ...AppTextStyle.headline4,
    fontFamily: AeonikFonts.medium,
    marginBottom: verticalScale(12),
  },
  tags: {
    flexDirection: "row",
    gap: scale(8),
  },
  tag: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    backgroundColor: Colors.light.lightGrey50,
    borderRadius: scale(100),
    borderWidth: 1,
    borderColor: Colors.light.lightGrey150,
  },
  tagText: {
    fontFamily: Fonts.medium,
    fontSize: scale(12),
    color: Colors.light.grey700,
  },
});
