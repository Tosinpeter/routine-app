import React from 'react';
import Svg, { Path, Circle, G } from 'react-native-svg';

interface CameraPlusIconProps {
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
}

export const CameraPlusIcon: React.FC<CameraPlusIconProps> = ({
  width = 18.17,
  height = 14.83,
  color = '#FFFFFF',
  strokeWidth = 1.5,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 18.1666 14.8333" fill="none">
      <G id="Icon">
        <Path
          id="Rectangle 368"
          d="M7.41654 0.75C10.1664 0.75 11.5413 0.75 12.3956 1.60427C13.2499 2.45854 13.2499 3.83347 13.2499 6.58333L13.2499 8.25C13.2499 10.9999 13.2499 12.3748 12.3956 13.2291C11.5413 14.0833 10.1664 14.0833 7.41654 14.0833L6.58321 14.0833C3.83335 14.0833 2.45842 14.0833 1.60415 13.2291C0.749878 12.3748 0.749878 10.9999 0.749878 8.25L0.749878 6.58333C0.749878 3.83347 0.749878 2.45854 1.60415 1.60427C2.45842 0.75 3.83335 0.75 6.58321 0.75L7.41654 0.75Z"
          fillRule="nonzero"
          stroke={color}
          strokeWidth={strokeWidth}
        />
        <Path
          id="Rectangle 369"
          d="M13.2499 4.83837L13.3548 4.7518C15.1179 3.29702 15.9995 2.56963 16.708 2.92085C17.4165 3.27206 17.4165 4.43645 17.4165 6.76523L17.4165 8.06843C17.4165 10.3972 17.4165 11.5616 16.708 11.9128C15.9995 12.264 15.1179 11.5366 13.3548 10.0819L13.2499 9.99529"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
        <Circle
          id="Ellipse 383"
          cx="8.667"
          cy="5.333"
          r="1.25"
          stroke={color}
          strokeWidth={strokeWidth}
        />
        {/* Plus Icon */}
        <Circle cx="14" cy="3.5" r="2.5" fill="#000000" opacity={0.5} />
        <Path
          d="M14 2.5 L14 4.5 M13 3.5 L15 3.5"
          stroke={color}
          strokeWidth={1}
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
};
