import React from "react";
import Svg, {Path, Rect} from "react-native-svg";
import {responsiveWidth} from "react-native-responsive-dimensions";
import colors from "../../constants/colors";
import {Icon} from "./Icon";

interface Props {
    onPress: () => void;
    isDark?: boolean
}
export const WalletIcon: React.FC<Props> = ({onPress, isDark= false}) => {
    return (
        <Icon onPress={onPress}>
            <Svg width={responsiveWidth((8))} height={responsiveWidth((8))} viewBox="0 0 24 24" fill={isDark ? colors.primary : colors.secondary}>
                <Rect x="2" y="6" width="20" height="16" rx="5" stroke={isDark ? colors.dark : colors.primary} stroke-width="1.5"/>
                <Path d="M19 6.5V6.5C19 4.17692 16.8678 2.43898 14.5924 2.90744L5.99174 4.67817C3.66769 5.15665 2 7.20267 2 9.57546L2 13" stroke={isDark ? colors.dark : colors.primary} stroke-width="1.5"/>
                <Path d="M6 17.5H12" stroke={isDark ? colors.dark : colors.primary} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <Path d="M15 14C15 12.6193 16.1193 11.5 17.5 11.5H22V16.5H17.5C16.1193 16.5 15 15.3807 15 14V14Z" stroke={isDark ? colors.dark : colors.primary} stroke-width="1.5"/>
                <Path d="M17.5 14H17.7" stroke={isDark ? colors.dark : colors.primary} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </Svg>
        </Icon>
    )
}