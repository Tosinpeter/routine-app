import * as React from "react";
import Svg, { G, Mask, Path, Rect, SvgProps } from "react-native-svg";

export const CheckmarkIcon = ({ color = "#079455", ...props }: SvgProps) => (
    <Svg width={20} height={24} viewBox="0 0 20 24" fill="none" {...props}>
        <Mask
            id="mask0_44_9071"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="20"
            height="24"
        >
            <Rect width="20" height="23.9393" fill="#D9D9D9" />
        </Mask>
        <G mask="url(#mask0_44_9071)">
            <Path
                d="M7.95801 17.9536L3.20801 12.268L4.39551 10.8466L7.95801 15.1108L15.6038 5.95898L16.7913 7.38038L7.95801 17.9536Z"
                fill={color}
            />
        </G>
    </Svg>
);
