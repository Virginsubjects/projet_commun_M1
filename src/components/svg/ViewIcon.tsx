import React from "react";
import Svg, {Path, Rect} from "react-native-svg";
import {responsiveWidth} from "react-native-responsive-dimensions";
import colors from "../../constants/colors";
import {Icon} from "./Icon";

interface Props {
    onPress: () => void;
}
export const ViewIcon: React.FC<Props> = ({onPress}) => {
    return (
        <Icon onPress={onPress}>
            <Svg width={responsiveWidth(8)} height={responsiveWidth(8)} viewBox="0 0 24 24" fill={colors.secondary}>
                <Rect x="4" y="2" width="16" height="20" rx="4" stroke="white" stroke-width="1.5"/>
                <Path d="M8 7H16" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                <Path d="M8 12H16" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                <Path d="M8 17H12" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            </Svg>
        </Icon>
    )
}