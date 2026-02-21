import Svg, { Path } from "react-native-svg";

interface UndoIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function UndoIcon({
  width = 20,
  height = 20,
  color = "white",
}: UndoIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M9.16659 5H12.9166C14.9877 5 16.6666 6.67893 16.6666 8.75C16.6666 10.8211 14.9877 12.5 12.9166 12.5H3.33325"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.83323 10C5.83323 10 3.33326 11.8412 3.33325 12.5C3.33325 13.1588 5.83325 15 5.83325 15"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
