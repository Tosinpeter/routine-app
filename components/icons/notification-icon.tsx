import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const NotificationIcon = ({ color = "#344054", ...props }: SvgProps) => (
    <Svg width={27} height={27} viewBox="0 0 27 27" fill="none" {...props}>
        <Path
            d="M5.67421 12.6401C5.59339 14.1757 5.6863 15.8103 4.31435 16.8392C3.6758 17.3182 3.3 18.0698 3.3 18.8679C3.3 19.9659 4.15998 20.9 5.28 20.9H21.12C22.24 20.9 23.1 19.9659 23.1 18.8679C23.1 18.0698 22.7242 17.3182 22.0857 16.8392C20.7137 15.8103 20.8066 14.1757 20.7258 12.6401C20.5151 8.63745 17.2082 5.5 13.2 5.5C9.19179 5.5 5.88487 8.63745 5.67421 12.6401Z"
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
            d="M16.5 20.9004C16.5 22.7229 15.0225 24.2004 13.2 24.2004C11.3775 24.2004 9.9 22.7229 9.9 20.9004"
            stroke={color}
            strokeWidth="1.65"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);
