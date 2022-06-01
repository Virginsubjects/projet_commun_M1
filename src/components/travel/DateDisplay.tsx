import React from 'react';
import {View, StyleSheet, Text} from "react-native";
import {responsiveFontSize, responsiveHeight, responsiveWidth} from "react-native-responsive-dimensions";
import colors from "../../constants/colors";
import {TravelStateType} from "../../redux/store/travel/travel.types";

interface Props {
    item: TravelStateType
}

const DateDisplay: React.FC<Props> = ({item}) => {
    return (
        <View style={styles.container}>
            <View style={{marginTop: 3}}>
                <Text>Départ:</Text>
                <Text style={styles.text}>{item.startDate}</Text>
            </View>
            <View style={styles.separator}/>
            <View style={{marginTop: 3}}>
                <Text>Retour:</Text>
                <Text style={styles.text}>{item.endDate}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: responsiveWidth(80),
        alignSelf: 'center',
        marginVertical: responsiveHeight(2),
        backgroundColor: colors.lightgreen,
        padding: responsiveWidth(3),
        borderRadius: 10
    },
    text : {
       color: colors.primary,
       fontSize: responsiveFontSize(3),
        textAlign: 'center'
    },
    separator: {
        height: 1,
        width: responsiveWidth(60),
        alignSelf: 'center',
        backgroundColor: colors.primary,
    }
});
export default DateDisplay;