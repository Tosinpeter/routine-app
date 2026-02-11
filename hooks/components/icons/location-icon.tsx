import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface LocationIconProps {
  size?: number;
  color?: string;
}

export function LocationIcon({ size = 24, color = '#20201E' }: LocationIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C7.6 2 4 5.6 4 10C4 15.4 11 21.5 11.3 21.8C11.7 22.1 12.2 22.1 12.6 21.8C13 21.5 20 15.4 20 10C20 5.6 16.4 2 12 2ZM12 14C9.8 14 8 12.2 8 10C8 7.8 9.8 6 12 6C14.2 6 16 7.8 16 10C16 12.2 14.2 14 12 14Z"
        fill={color}
      />
    </Svg>
  );
}
