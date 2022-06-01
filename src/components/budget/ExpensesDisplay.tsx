import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {responsiveFontSize, responsiveHeight, responsiveWidth} from "react-native-responsive-dimensions";
import colors from "../../constants/colors";
import {Expenses} from "../../redux/store/budget/spent.type";
import {TrashIcon} from "../svg/TrashIcon";
import {WalletIcon} from "../svg/WalletIcon";
import {useDispatch, useSelector} from "react-redux";
import {removeSpentById} from "../../redux/store/budget/spent.actions";
import {refreshBudget} from "../../redux/store/travel/travel.actions";
import {CustomRootState, store} from "../../redux";

interface Props {
    item: Expenses
    isTravelDisplay?: boolean
}

const ExpensesDisplay: React.FC<Props> = ({item, isTravelDisplay= false}) => {
    const travel = useSelector((state: CustomRootState) => state.travel.travels.find(target => target.id === item.travelId)!.budget) + item.amount;
    const dispatch = useDispatch();
    const test = (num1: number, num2: number) => {
        return (num1 + num2);
    }
    return (
        <View style={[styles.container, {backgroundColor: isTravelDisplay ? colors.lightgreen : colors.tertiary}]}>
            <WalletIcon onPress={() => console.log('lol')} isDark />
            <View style={{marginLeft: responsiveWidth(10), flexDirection: 'column', justifyContent: 'space-between', width: responsiveWidth(60)}}>
                <Text style={{fontSize: responsiveFontSize(2)}}>Montant: {item.amount} €</Text>
                <Text style={{fontSize: responsiveFontSize(2)}}>Description: {item.description}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding:20,
        marginVertical: responsiveHeight(2),
        width: responsiveWidth(80),
        height: responsiveHeight(8),
        borderRadius: 10,
        alignSelf: 'center',
    },
});
export default ExpensesDisplay;