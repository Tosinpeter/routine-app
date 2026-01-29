import Svg, { Path } from "react-native-svg";

interface UploadCloudIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function UploadCloudIcon({
  width = 32,
  height = 32,
  color = "#20201E",
}: UploadCloudIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 32 32" fill="none">
      <Path
        d="M10.6666 21.3333L16 16M16 16L21.3333 21.3333M16 16V28M26.6666 22.3238C28.2953 20.9787 29.3333 18.9439 29.3333 16.6667C29.3333 12.6166 26.05 9.33333 22 9.33333C21.7086 9.33333 21.436 9.18133 21.2881 8.93032C19.5494 5.97978 16.3392 4 12.6666 4C7.14378 4 2.66663 8.47715 2.66663 14C2.66663 16.7548 3.78055 19.2494 5.58256 21.058"
        stroke={color}
        strokeWidth={2.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
