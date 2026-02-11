import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface MinusIconProps {
  size?: number;
  color?: string;
}

export function MinusIcon({ size = 16, color = '#20201E' }: MinusIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M13.333 8H2.66634"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
