import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, Text, TextInput, StatusBar, TouchableOpacity, ScrollView} from "react-native";
import {Formik} from "formik";
import colors from "../constants/colors";
import {Octicons} from "@expo/vector-icons";
import {Navigation} from "../navigation/utils";
import {AppStackParamList} from "../navigation/stacks";
import {useSelector} from "react-redux";
import {CustomRootState} from "../redux";
import TravelDisplayButton from "../components/TravalDisplayButton";
import SuggestDisplay from "../components/SuggestDisplay";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
    useResponsiveHeight
} from "react-native-responsive-dimensions";
import AddGuestModal from "../components/guest/AddGuestModal";

const Home: React.FC<Navigation<AppStackParamList>> = ({navigation}) => {
    const travels = useSelector((state: CustomRootState) => state.travel.travels);
    const user = useSelector((state: CustomRootState) => state.user.user);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    {`Bonjour, ${user.firstName}`}
                </Text>
                <TouchableOpacity style={styles.addTravelIcon} onPress={() => navigation.navigate('AddTravel',  {travelId: 0})}>
                    <Octicons name="plus" size={responsiveFontSize(4)} color={colors.tertiary} />
                </TouchableOpacity>
            </View>
                <View style={styles.travelsContainer}>
                    {travels.length === 0 ? (
                        <Text style={styles.noTravelText}>Vous n'avez pas encore de voyage !</Text>
                    ): (
                        <ScrollView style={{ width: '100%'}}>
                            { travels.map((item, index) => (
                                <TravelDisplayButton travelName={item.name} key={index} navigation={navigation} travelId={item.id} />
                            ))}
                        </ScrollView>
                    )}
                </View>
            <View style={styles.suggestContainer}>
                <Text style={styles.suggestTitle}>En panne d'idées ?</Text>
                <Text style={styles.suggestSubTitle}>Inspirez-vous</Text>
                <View style={styles.suggestItemsContainer}>
                    <SuggestDisplay imageUrl={require('../assets/cities/marrakech.jpg')} imageTitle={'Marrakech'}/>
                    <SuggestDisplay imageUrl={require('../assets/cities/madrid.jpg')} imageTitle={'Madrid'}/>
                    <SuggestDisplay imageUrl={require('../assets/cities/Tokyo.jpg')} imageTitle={'Tokyo'}/>
                    <SuggestDisplay imageUrl={require('../assets/cities/SanFrancisco.jpg')} imageTitle={'San francisco'}/>
                </View>
            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: colors.dark
    },
    titleContainer: {
        width: responsiveWidth(90),
        marginTop: responsiveHeight(5),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: responsiveFontSize(4),
        fontWeight: "bold",
        color: colors.primary,
    },
    addTravelIcon: {
        width: responsiveWidth(11),
        height: responsiveWidth(11),
        borderRadius: 100,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    travelsContainer: {
        height: responsiveHeight(40),
        marginTop: responsiveHeight(2),
        justifyContent: "center",
        alignItems: "center",
        width: responsiveWidth(100),
    },
    noTravelText: {
        fontSize: responsiveFontSize(2),
        color: colors.secondary
    },
    suggestContainer: {
        flex: 1,
        width: responsiveWidth(90),
        marginTop: 'auto'
    },
    suggestTitle : {
        fontSize: responsiveFontSize(3),
        fontWeight: "bold",
        color: colors.primary,
    },
    suggestSubTitle: {
        fontSize: 16,
        color: colors.secondary
    },
    suggestItemsContainer: {
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        alignItems: "center",
        marginTop: responsiveHeight(2),
        justifyContent: 'space-around'
    }
})
export default Home;