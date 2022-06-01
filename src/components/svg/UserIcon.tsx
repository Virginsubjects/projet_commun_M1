import React from "react";
import Svg, {Circle, Path} from "react-native-svg";
import {responsiveWidth} from "react-native-responsive-dimensions";
import colors from "../../constants/colors";
import {Icon} from "./Icon";

interface Props {
    onPress: () => void;
    isDark?: boolean
}
export const UserIcon: React.FC<Props> = ({onPress, isDark= false}) => {
    return (
        <Icon onPress={onPress}>
            <Svg width={responsiveWidth(8)} height={responsiveWidth(8)} viewBox="0 0 24 24" fill={isDark ? colors.primary : colors.secondary}>
                <Circle r="4" transform="matrix(-1 0 0 1 10 7)" stroke={isDark ? colors.dark : colors.primary} stroke-width="1.5"/>
                <Path d="M3 16.9347C3 16.0743 3.54085 15.3068 4.35109 15.0175V15.0175C8.00404 13.7128 11.996 13.7128 15.6489 15.0175V15.0175C16.4591 15.3068 17 16.0743 17 16.9347V18.2502C17 19.4376 15.9483 20.3498 14.7728 20.1818L13.8184 20.0455C11.2856 19.6837 8.71435 19.6837 6.18162 20.0455L5.22721 20.1818C4.0517 20.3498 3 19.4376 3 18.2502V16.9347Z" stroke={isDark ? colors.dark : colors.secondary} stroke-width="1.5"/>
                <Path d="M17 11H21" stroke={isDark ? colors.primary : colors.secondary} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <Path d="M19 9L19 13" stroke={isDark ? colors.primary : colors.secondary} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </Svg>
        </Icon>
    )
}