import Svg, { Path } from "react-native-svg";

interface CheckboxIconProps {
  width?: number;
  height?: number;
  backgroundColor?: string;
  checkColor?: string;
}

export function CheckboxIcon({
  width = 16,
  height = 16,
  backgroundColor = "#17B26A",
  checkColor = "white",
}: CheckboxIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        d="M0 4C0 1.79086 1.79086 0 4 0H12C14.2091 0 16 1.79086 16 4V12C16 14.2091 14.2091 16 12 16H4C1.79086 16 0 14.2091 0 12V4Z"
        fill={backgroundColor}
      />
      <Path
        d="M12 5L6.5 10.5L4 8"
        stroke={checkColor}
        strokeWidth={1.6666}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
