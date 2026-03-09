import Svg, { Path } from "react-native-svg";

interface CheckedRoundedIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function CheckedRoundedIcon({
  width = 20,
  height = 20,
  color = "white",
}: CheckedRoundedIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M18.3334 10C18.3334 5.39767 14.6025 1.66671 10.0001 1.66671C5.39771 1.66671 1.66675 5.39767 1.66675 10C1.66675 14.6024 5.39771 18.3334 10.0001 18.3334C14.6025 18.3334 18.3334 14.6024 18.3334 10Z"
        stroke={color}
        strokeWidth={1.5}
      />
      <Path
        d="M6.66675 10.4167L8.75008 12.5L13.3334 7.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
