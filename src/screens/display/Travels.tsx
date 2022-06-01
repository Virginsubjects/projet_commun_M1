import React from "react";
import {View, Text, TouchableOpacity, Image, ScrollView} from "react-native";
import {Navigation} from "../../navigation/utils";
import {AppStackParamList} from "../../navigation/stacks";
import {useSelector} from "react-redux";
import {CustomRootState} from "../../redux";
import {responsiveFontSize, responsiveHeight, responsiveWidth} from "react-native-responsive-dimensions";
import colors from "../../constants/colors";
import { Ionicons } from '@expo/vector-icons';
import DateDisplay from "../../components/travel/DateDisplay";
import GuestDisplay from "../../components/travel/GuestDisplay";
import ExpensesDisplay from "../../components/budget/ExpensesDisplay";

const Travel: React.FC<Navigation<AppStackParamList>> = ({navigation, route}) => {
    const routeParams = route!.params;
    const data = useSelector((state: CustomRootState) => state.travel.travels.find(travel => travel.id === routeParams?.travelId));
    const guests = useSelector((state: CustomRootState) => state.guest.guests.filter(guest => guest.travelId === routeParams?.travelId));
    const spends = useSelector((state: CustomRootState) => state.budget.expenses.filter(spent => spent.travelId === routeParams?.travelId));
    console.log(data);
    return (
        <ScrollView>
            <View style={{width: responsiveWidth(100), backgroundColor: colors.primary, flexDirection: 'row',alignItems: 'center', padding: responsiveWidth(5)}}>
                <TouchableOpacity style={{width: responsiveWidth(10),height: responsiveWidth(10),borderRadius: 100, alignItems: 'center', justifyContent: 'center'}} onPress={navigation.goBack}>
                    <Ionicons name="caret-back" size={responsiveFontSize(4)} color={colors.tertiary} />
                </TouchableOpacity>
                <Text style={{marginLeft: 'auto', fontSize: responsiveFontSize(3)}}>{data?.name}</Text>
            </View>
            <View style={{width: responsiveWidth(100)}}>
                <Image source={require('../../assets/1-.png')} style={{width: responsiveWidth(100)}} />
            </View>
            <View>
                <Text style={{textAlign: 'center', marginVertical: responsiveHeight(3), fontSize: responsiveFontSize(4)}}>{data!.destination}</Text>
                <Text style={{fontSize: responsiveFontSize(3)}}>Date:</Text>
                <DateDisplay item={data!} />
                <Text style={{fontSize: responsiveFontSize(3)}}>Invités:</Text>
                {guests.length > 0 ? guests.map((item, index) => (
                    <GuestDisplay item={item} key={index}/>
                )) : (
                    <Text style={{textAlign: 'center', marginVertical: responsiveHeight(1.5), fontSize: responsiveFontSize(2)}}>Aucun invité</Text>
                )}
                <Text style={{fontSize: responsiveFontSize(3)}}>Dépenses:</Text>
                {spends.length > 0 ? spends.map((item, index) => (
                    <ExpensesDisplay item={item} key={index} isTravelDisplay/>
                )) : (
                    <Text style={{textAlign: 'center', marginVertical: responsiveHeight(1.5), fontSize: responsiveFontSize(2)}}>Aucune dépense</Text>
                )}
            </View>
        </ScrollView>
    )
}
export default Travel;