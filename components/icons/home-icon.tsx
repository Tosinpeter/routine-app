import Svg, { Path, type SvgProps } from 'react-native-svg';

type HomeIconProps = SvgProps & {
  size?: number;
  color?: string;
};

export function HomeIcon({
  size = 24,
  color = '#141B34',
  ...props
}: HomeIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M12.0002 18L12.0002 15"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M2.35155 13.2135C1.99853 10.9162 1.82202 9.76763 2.25632 8.74938C2.69063 7.73112 3.65418 7.03443 5.58129 5.64106L7.02114 4.6C9.41845 2.86667 10.6171 2 12.0002 2C13.3832 2 14.5819 2.86667 16.9792 4.6L18.419 5.64106C20.3461 7.03443 21.3097 7.73112 21.744 8.74938C22.1783 9.76763 22.0018 10.9162 21.6488 13.2135L21.3477 15.1724C20.8473 18.4289 20.5971 20.0572 19.4292 21.0286C18.2612 22 16.5538 22 13.139 22H10.8613C7.44649 22 5.73906 22 4.57116 21.0286C3.40325 20.0572 3.15303 18.4289 2.65258 15.1724L2.35155 13.2135Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
}
