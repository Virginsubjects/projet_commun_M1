import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {responsiveFontSize, responsiveHeight, responsiveWidth} from "react-native-responsive-dimensions";
import colors from "../../constants/colors";
import {GuestStateType, GuestType} from "../../redux/store/guest/guest.types";
import {UserIcon} from "../svg/UserIcon";

interface Props {
    item: GuestType
}

const GuestDisplay: React.FC<Props> = ({item}) => {
    return (
        <View style={styles.container}>
            <UserIcon  onPress={() => console.log('ok')} isDark/>
            <Text style={{fontSize: responsiveFontSize(3), marginLeft: responsiveWidth(10), color: colors.primary}}>{`${item.firstName} ${item.lastName}`}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: responsiveWidth(80),
        alignSelf: 'center',
        marginVertical: responsiveHeight(2),
        backgroundColor: colors.lightgreen,
        padding: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: responsiveWidth(10),
        height: responsiveWidth(10),
        borderRadius: 100,
        marginHorizontal: responsiveWidth(10),
        borderWidth: 2,
        borderColor: colors.secondary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addImageText: {
        fontSize: responsiveFontSize(2),
        fontWeight: "bold",
        color: colors.secondary
    },
});
export default GuestDisplay;