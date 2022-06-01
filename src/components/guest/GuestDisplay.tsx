import {ImageSourcePropType, View, Image, Text, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import colors from "../../constants/colors";
import {responsiveFontSize} from "react-native-responsive-dimensions";

interface Props {
    guestImageUrl: string,
    guestName: string
}
const GuestDisplay: React.FC<Props> = ({guestImageUrl, guestName}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.image}>
                <Text style={styles.addImageText}>?</Text>
            </TouchableOpacity>
            <Text style={styles.text}>{ guestName }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 150,
        borderRadius: 17,
        borderWidth: 2,
        borderColor: colors.tertiary,
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 20
    },
    image: {
        width: 76,
        height: 76,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.secondary,
    },
    addImageText: {
        fontSize: responsiveFontSize(5),
        fontWeight: "bold",
        color: colors.secondary
    },
    text: {
        color: colors.primary,
        fontSize: 17,
        textAlign: 'center',
        marginTop: 10,
    },
})

export default GuestDisplay;