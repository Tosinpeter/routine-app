import Svg, { Path, type SvgProps } from 'react-native-svg';

import { primaryColor } from '@/constants/theme';

type RoutineIconProps = SvgProps & {
  size?: number;
  color?: string;
};

export function RoutineIcon({
  size = 24,
  color = primaryColor,
  ...props
}: RoutineIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M9.07812 2.42883C10.7326 0.857669 13.2674 0.857669 14.9219 2.42883C16.2018 3.64436 17.7705 5.31946 19.0234 7.24133C20.2708 9.15464 21.25 11.3796 21.25 13.6779C21.25 18.1457 17.7426 22.7501 12 22.7501C6.25744 22.7501 2.75 18.1457 2.75 13.6779C2.75005 11.3796 3.72923 9.15464 4.97656 7.24133C6.22952 5.31946 7.79818 3.64436 9.07812 2.42883ZM16 13.0001C15.4477 13.0001 15 13.4478 15 14.0001C14.9999 15.6569 13.6568 17.0001 12 17.0001C11.4477 17.0001 11 17.4478 11 18.0001C11.0001 18.5523 11.4478 19.0001 12 19.0001C14.7614 19.0001 16.9999 16.7615 17 14.0001C17 13.4478 16.5523 13.0001 16 13.0001Z"
        fill={color}
      />
    </Svg>
  );
}
