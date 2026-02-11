import Svg, { Circle, ClipPath, Defs, G, Path, Rect, type SvgProps } from 'react-native-svg';

type ClockIconProps = SvgProps & {
  size?: number;
  color?: string;
};

export function ClockIcon({
  size = 14,
  color = '#079455',
  ...props
}: ClockIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_2026_180)">
        <Circle cx="7.00001" cy="6.99999" r="5.83333" stroke={color} />
        <Path
          d="M5.54167 5.54166L7.58327 7.58311M9.33334 4.66666L6.41667 7.58332"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2026_180">
          <Rect width="14" height="14" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}


