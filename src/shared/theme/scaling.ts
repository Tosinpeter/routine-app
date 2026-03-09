import { Dimensions, PixelRatio, Platform } from "react-native";

// Base dimensions used for design (iPhone 14 Pro)
export const BASE_WIDTH = 390;
export const BASE_HEIGHT = 844;

// Minimum touch target sizes (Apple HIG: 44pt, Material: 48dp)
export const MIN_TOUCH_TARGET = Platform.OS === "ios" ? 40 : 40;

// Get current screen dimensions
const getScreenDimensions = () => {
  const { width, height } = Dimensions.get("window");
  return { width, height };
};

// Initial dimensions
const initialDimensions = getScreenDimensions();
export let SCREEN_WIDTH = initialDimensions.width;
export let SCREEN_HEIGHT = initialDimensions.height;

// Listen for dimension changes
Dimensions.addEventListener("change", ({ window }) => {
  SCREEN_WIDTH = window.width;
  SCREEN_HEIGHT = window.height;
});

/**
 * Scale based on screen width - use for horizontal dimensions
 */
export const scale = (size: number): number => {
  const { width } = getScreenDimensions();
  return PixelRatio.roundToNearestPixel((width / BASE_WIDTH) * size);
};

/**
 * Scale based on screen height - use for vertical dimensions
 */
export const verticalScale = (size: number): number => {
  const { height } = getScreenDimensions();
  return PixelRatio.roundToNearestPixel((height / BASE_HEIGHT) * size);
};

/**
 * Moderate scale - ideal for font sizes (less aggressive scaling)
 * @param size - base size
 * @param factor - scaling factor (0 = no scale, 1 = full scale)
 */
export const moderateScale = (size: number, factor = 0.5): number => {
  const scaled = size + (scale(size) - size) * factor;
  return PixelRatio.roundToNearestPixel(scaled);
};

/**
 * Moderate vertical scale for height-based elements
 */
export const moderateVerticalScale = (size: number, factor = 0.5): number => {
  const scaled = size + (verticalScale(size) - size) * factor;
  return PixelRatio.roundToNearestPixel(scaled);
};

/**
 * Normalize for consistent pixel density across devices
 */
export const normalize = (size: number): number => {
  const newSize = scale(size);
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Platform-aware icon scaling
 * Android icons sometimes need slightly different sizing
 */
export const scaleIcon = (size: number): number => {
  const baseScale = moderateScale(size, 0.3);
  // Android icons can appear slightly smaller, compensate
  return Platform.OS === "android"
    ? PixelRatio.roundToNearestPixel(baseScale * 1.02)
    : baseScale;
};

/**
 * Ensure minimum touch target for accessibility
 */
export const touchTarget = (size: number): number => {
  const scaled = scale(size);
  return Math.max(scaled, MIN_TOUCH_TARGET);
};

/**
 * Border radius that scales but maintains visual consistency
 */
export const scaledRadius = (radius: number): number => {
  return PixelRatio.roundToNearestPixel(moderateScale(radius, 0.3));
};

/**
 * Line height calculator - ensures proper text readability
 * @param fontSize - the font size
 * @param multiplier - line height multiplier (default 1.4 for body, 1.2 for headings)
 */
export const lineHeight = (fontSize: number, multiplier = 1.4): number => {
  return Math.round(fontSize * multiplier);
};

/**
 * Platform-specific spacing adjustments
 */
export const spacing = {
  /** Extra small: 4 */
  xs: scale(4),
  /** Small: 8 */
  sm: scale(8),
  /** Medium: 12 */
  md: scale(12),
  /** Default: 16 */
  default: scale(16),
  /** Large: 20 */
  lg: scale(20),
  /** Extra large: 24 */
  xl: scale(24),
  /** 2x large: 32 */
  xxl: scale(32),
} as const;

/**
 * Safe area bottom padding (accounts for home indicator)
 */
export const safeAreaBottom = Platform.select({
  ios: 34,
  android: 24,
  default: 24,
});

/**
 * Tab bar heights per platform
 */
export const tabBarHeight = Platform.select({
  ios: 86,
  android: 70,
  default: 70,
});

// Re-export for components that need reactive dimensions
export { useWindowDimensions } from "react-native";

/**
 * Hook-based scaling for components (recommended for dynamic updates)
 */
export const useScale = () => {
  const { width, height } = Dimensions.get("window");
  const pixelRatio = PixelRatio.get();

  return {
    scale: (size: number) =>
      PixelRatio.roundToNearestPixel((width / BASE_WIDTH) * size),
    verticalScale: (size: number) =>
      PixelRatio.roundToNearestPixel((height / BASE_HEIGHT) * size),
    moderateScale: (size: number, factor = 0.5) => {
      const scaled = (width / BASE_WIDTH) * size;
      return PixelRatio.roundToNearestPixel(size + (scaled - size) * factor);
    },
    moderateVerticalScale: (size: number, factor = 0.5) => {
      const scaled = (height / BASE_HEIGHT) * size;
      return PixelRatio.roundToNearestPixel(size + (scaled - size) * factor);
    },
    normalize: (size: number) => {
      const newSize = (width / BASE_WIDTH) * size;
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    },
    touchTarget: (size: number) =>
      Math.max((width / BASE_WIDTH) * size, MIN_TOUCH_TARGET),
    screenWidth: width,
    screenHeight: height,
    pixelRatio,
    isSmallDevice: width < 375,
    isLargeDevice: width >= 414,
  };
};
