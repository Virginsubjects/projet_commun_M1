import React, {useState} from "react";
import {Modal, View, StyleSheet, Image, TouchableOpacity, Text, TextInput} from "react-native";
import {Entypo, Octicons} from "@expo/vector-icons";
import {responsiveFontSize, responsiveHeight, responsiveWidth, useResponsiveHeight } from "react-native-responsive-dimensions";
import Animated, {useAnimatedStyle, useDerivedValue, withSpring, withTiming} from "react-native-reanimated";
import colors from "../constants/colors";

const defaultModalHeight = responsiveHeight(40);
interface Props {
    modalIsVisible: boolean,
    onIconPress: () => void,
    travelId?: number,
}
const BottomModal: React.FC<Props> = ({modalIsVisible, onIconPress, travelId, children}) => {
    const changeModalHeight = useDerivedValue(() => modalIsVisible ? withSpring(defaultModalHeight) : withTiming(0, {duration: 600}));

    const rModalHeight = useAnimatedStyle(() => ({
        height: changeModalHeight.value,
    }));

    return (
        <Modal visible={modalIsVisible} animationType='slide' transparent={true} >
            <View style={styles.container}>
                <Animated.View style={[styles.contentContainer, rModalHeight]}>
                    <Entypo name="circle-with-cross" size={34} color={colors.tertiary}  onPress={onIconPress} style={styles.icon}/>
                    {children}
                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    contentContainer: {
        height: 0,
        backgroundColor: colors.primary,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 'auto'
    },
    icon: {
        margin: responsiveWidth(4),
        alignSelf: 'flex-end'
    },
});

export default BottomModal;