import Svg, { Path, Rect } from "react-native-svg";

interface FilterCTAIconProps {
  size?: number;
  color?: string;
}

export function FilterCTAIcon({
  size = 24,
  color = "#20201E",
}: FilterCTAIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12.0137 20.5C7.31925 20.5 3.51367 16.6944 3.51367 12C3.51367 7.30558 7.31925 3.5 12.0137 3.5C16.7081 3.5 20.5137 7.30558 20.5137 12C20.5137 16.6944 16.7081 20.5 12.0137 20.5Z"
        stroke={color}
        strokeWidth={1.5}
        fillRule="nonzero"
      />
      <Path
        d="M22.5 12L20.5 12"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.5 12L1.5 12"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 1.5L12 3.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 20.5L12 22.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 15C10.3431 15 8.99995 13.6569 8.99995 12C8.99995 10.3431 10.3431 9 12 9C13.6568 9 15 10.3431 15 12C15 13.6569 13.6568 15 12 15Z"
        stroke={color}
        strokeWidth={1.5}
        fillRule="nonzero"
      />
    </Svg>
  );
}
