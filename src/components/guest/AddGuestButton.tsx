import {ImageSourcePropType, View, Image, Text, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import { Octicons } from '@expo/vector-icons';
import colors from "../../constants/colors";
import {responsiveWidth} from "react-native-responsive-dimensions";

interface Props {
    onBtnPress: () => void,
}

const AddGuestButton: React.FC<Props> = ({onBtnPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onBtnPress}>
            <Octicons name="plus" size={55} color={colors.primary} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: responsiveWidth(35),
        height: responsiveWidth(35),
        borderRadius: 17,
        backgroundColor: colors.secondary,
        alignItems: "center",
        justifyContent: 'center',
    },
})

export default AddGuestButton;