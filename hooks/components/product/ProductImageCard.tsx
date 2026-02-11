import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

import { scale, verticalScale } from "@/constants/scaling";
import { Colors, Shadows } from "@/constants/theme";

interface ProductImageCardProps {
  source: ImageSourcePropType;
  imageStyle?: object;
}

export function ProductImageCard({ source, imageStyle }: ProductImageCardProps) {
  return (
    <View style={styles.imageCard}>
      <Image
        source={source}
        style={[styles.productImage, imageStyle]}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageCard: {
    height: scale(358),
    backgroundColor: Colors.light.white,
    borderRadius: scale(16),
    padding: scale(40),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(16),
    ...Shadows.sm,
  },
  productImage: {
    width: scale(358),
    height: scale(358),
  },
});
