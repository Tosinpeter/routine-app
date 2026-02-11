import * as React from "react";
import Svg, { Path, Mask, Rect, G } from "react-native-svg";
import { scale } from "@/constants/scaling";

const RoutineConsistencyIcon = (props: any) => (
    <Svg
        width={scale(24)}
        height={scale(24)}
        viewBox="0 0 24 24"
        fill="none"
        {...props}
    >
        <Mask
            id="mask0_44_9776"
            style={{ maskType: "alpha" } as any}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="24"
            height="24"
        >
            <Rect width="24" height="24" fill="#D9D9D9" />
        </Mask>
        <G mask="url(#mask0_44_9776)">
            <Path
                d="M9.55 14.9466L17.9175 6.57905C18.1453 6.35122 18.4125 6.2373 18.719 6.2373C19.0255 6.2373 19.2928 6.35122 19.5208 6.57905C19.7486 6.80705 19.8625 7.07747 19.8625 7.3903C19.8625 7.70314 19.7486 7.97355 19.5208 8.20155L10.3518 17.3896C10.1238 17.6174 9.8565 17.7313 9.55 17.7313C9.2435 17.7313 8.97625 17.6174 8.74825 17.3896L4.46025 13.1016C4.23242 12.8736 4.12167 12.6031 4.128 12.2903C4.13434 11.9775 4.25142 11.7071 4.47925 11.4791C4.70725 11.2512 4.97767 11.1373 5.2905 11.1373C5.60334 11.1373 5.87375 11.2512 6.10175 11.4791L9.55 14.9466Z"
                fill="#3736FD"
            />
        </G>
    </Svg>
);

export default RoutineConsistencyIcon;
