import React from "react";
import {Image, ImageSourcePropType, View, Text, StyleSheet, TouchableOpacity} from "react-native";
import colors from "../constants/colors";
import {responsiveFontSize, responsiveHeight, responsiveWidth} from "react-native-responsive-dimensions";

interface Props {
    imageUrl: ImageSourcePropType;
    imageTitle: string;
}
const SuggestDisplay: React.FC<Props> = ({imageTitle, imageUrl}) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Image source={imageUrl} style={styles.image} />
            <View style={styles.overlay}>
                <Text style={styles.text}>{imageTitle}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: responsiveWidth(40),
        height: responsiveWidth(30),
        borderRadius: 17,
        marginBottom: responsiveHeight(2),
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 17,
    },
    overlay: {
        position: "absolute",
        width: '100%',
        height: responsiveHeight(5),
        borderBottomRightRadius: 17,
        borderBottomLeftRadius: 17,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.33)',
    },
    text: {
        position: 'relative',
        color: colors.primary,
        fontSize: responsiveFontSize(2),
        margin: 5,
        marginLeft: 15,
    }
});

export default SuggestDisplay;