import { scale } from "@/constants/scaling";
import { BorderRadius, Colors } from "@/constants/theme";
import Animated, {
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";

const DOT_SIZE = scale(8);
const ACTIVE_DOT_WIDTH = scale(24);
const DOT_COLOR_INACTIVE = Colors.light.whiteAlpha30;
const DOT_COLOR_ACTIVE = Colors.light.tint;
const PAGINATION_TIMING = { duration: 300 };

export function AnimatedDot({ index, currentIndex }: { index: number; currentIndex: number }) {
    const isActive = index === currentIndex;
    const animatedStyle = useAnimatedStyle(() => ({
        width: withTiming(isActive ? ACTIVE_DOT_WIDTH : DOT_SIZE, PAGINATION_TIMING),
        backgroundColor: withTiming(
            isActive ? DOT_COLOR_ACTIVE : DOT_COLOR_INACTIVE,
            PAGINATION_TIMING
        ),
    }));
    return (
        <Animated.View
            style={[
                {
                    height: scale(8),
                    borderRadius: BorderRadius.full,
                },
                animatedStyle,
            ]}
        />
    );
}
