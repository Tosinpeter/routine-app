import React from 'react';
import Svg, { G, Mask, Path, Rect } from 'react-native-svg';

export const StarIcon = ({ width = 48, height = 48, color = '#CF604A' }: { width?: number; height?: number; color?: string }) => (
    <Svg width={width} height={height} viewBox="0 0 48 48" fill="none">
        <Mask id="mask0_2002_2752" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
            <Rect width="48" height="48" fill="#D9D9D9" />
        </Mask>
        <G mask="url(#mask0_2002_2752)">
            <Path d="M11.6507 42L14.9007 27.95L4.00073 18.5L18.4007 17.25L24.0007 4L29.6007 17.25L44.0007 18.5L33.1007 27.95L36.3507 42L24.0007 34.55L11.6507 42Z" fill={color} />
        </G>
    </Svg>
);
