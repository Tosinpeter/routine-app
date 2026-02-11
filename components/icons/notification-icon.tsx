import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface NotificationIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const NotificationIcon: React.FC<NotificationIconProps> = ({
  width = 27,
  height = 27,
  color = '#344054',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 27 27" fill="none">
      <Path
        d="M5.67419 12.6401C5.59337 14.1757 5.68628 15.8103 4.31433 16.8392C3.67579 17.3182 3.29999 18.0698 3.29999 18.8679C3.29999 19.9659 4.15997 20.9 5.27999 20.9H21.12C22.24 20.9 23.1 19.9659 23.1 18.8679C23.1 18.0698 22.7242 17.3182 22.0856 16.8392C20.7137 15.8103 20.8066 14.1757 20.7258 12.6401C20.5151 8.63745 17.2082 5.5 13.2 5.5C9.19178 5.5 5.88486 8.63745 5.67419 12.6401Z"
        stroke={color}
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.55 3.4377C11.55 4.34897 12.2887 5.5002 13.2 5.5002C14.1113 5.5002 14.85 4.34897 14.85 3.4377C14.85 2.52643 14.1113 2.2002 13.2 2.2002C12.2887 2.2002 11.55 2.52643 11.55 3.4377Z"
        stroke={color}
        strokeWidth="1.65"
      />
      <Path
        d="M16.5 20.9004C16.5 22.7229 15.0225 24.2004 13.2 24.2004C11.3774 24.2004 9.89996 22.7229 9.89996 20.9004"
        stroke={color}
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
