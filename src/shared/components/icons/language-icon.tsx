import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface LanguageIconProps {
  size?: number;
  color?: string;
}

export function LanguageIcon({ size = 24, color = '#20201E' }: LanguageIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 12C2 13.0519 2.18046 14.0617 2.51212 15M11 15H2.51212M2.51212 15C3.74763 18.4956 7.08134 21 11 21C9.45582 21 8 17 8 12"
        stroke={color}
        strokeWidth="1.5"
      />
      <Path
        d="M21.4879 8H15.8188M21.4879 8C20.2524 4.50442 16.9187 2 13 2C14.2187 2 15.3824 4.49163 15.8188 8M21.4879 8C21.8195 8.93834 22 9.94809 22 11M15.8188 8H13M15.8188 8C15.9353 8.93686 16 9.94622 16 11"
        stroke={color}
        strokeWidth="1.5"
      />
      <Path
        d="M22 14H14V22L16.5 20.5H22V14Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <Path
        d="M2 2H10V10L7.5 8.5H2V2Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
