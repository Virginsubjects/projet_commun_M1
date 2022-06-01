import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import user from "../data/user";
import { Ionicons } from '@expo/vector-icons';
import colors from "../constants/colors";
import React, {useState} from "react";
import {Navigation} from "../navigation/utils";
import {AppStackParamList} from "../navigation/stacks";
import {Formik} from "formik";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import formatDateDay from "../utils/formatDateDay";
import formatDateMonth from "../utils/formatDateMonth";
import { AntDesign } from '@expo/vector-icons';
import AddGuestButton from "../components/guest/AddGuestButton";
import AddGuestModal from "../components/guest/AddGuestModal";
import {useDispatch, useSelector} from "react-redux";
import {CustomRootState} from "../redux";
import GuestDisplay from "../components/guest/GuestDisplay";
import {createTravel} from "../redux/store/travel/travel.actions";
import {responsiveFontSize, responsiveHeight, responsiveWidth} from "react-native-responsive-dimensions";


const AddTravel: React.FC<Navigation<AppStackParamList>> = ({navigation}) => {
    const [isGuestModal, setIsGetModal] = useState(false);
    const [isStartDatePicker, setIsStartDatePicker] = useState(false);
    const [isEndDatePicker, setIsEndDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const travels = useSelector((state: CustomRootState) => state.travel.travels);
    const guests = useSelector((state: CustomRootState) => state.guest.guests.filter(guest => guest.travelId === travels.length + 1));
    const dispatch = useDispatch();

    const showStartDatePicker = () => {
        setIsStartDatePicker(true);
    };
    const showEndDatePicker = () => {
        setIsEndDatePicker(true);
    };
    const hideStartDatePicker = () => {
        setIsStartDatePicker(false);
    };
    const hideEndDatePicker = () => {
        setIsEndDatePicker(false);
    };
    const handleStartDateConfirm = (date: Date) => {
        setStartDate(date);
        hideStartDatePicker();
    };
    const handleEndDateConfirm = (date: Date) => {
        setEndDate(date);
        hideEndDatePicker();
    };
    const formatDate = (date: Date) => {
        return `${formatDateDay(date.getDay())} ${date.getDate()} ${formatDateMonth(date.getMonth())} ${date.getFullYear()}`;
    };

    return (
        <>
            <StatusBar />
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={styles.container}>
                    <View style={{alignItems: 'center'}}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>
                                Créer un voyage
                            </Text>
                            <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
                                <Ionicons name="chevron-back-outline" size={30} color={colors.tertiary} />
                                <Text style={styles.backText}>Retour</Text>
                            </TouchableOpacity>
                        </View>
                        <Formik initialValues={{travelName: '', destination: '', budget: 0 }} onSubmit={(values) => console.log(values)}>
                            {({handleSubmit, handleChange, values}) => (
                                <>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={handleChange('travelName')}
                                            placeholder="Nom du voyage"
                                            placeholderTextColor={colors.primary}
                                        />
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={handleChange('destination')}
                                            placeholder="Destination"
                                            placeholderTextColor={colors.primary}
                                        />
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={handleChange('budget')}
                                            keyboardType="decimal-pad"
                                            placeholder="Budget"
                                            placeholderTextColor={colors.primary}
                                        />
                                        <View style={styles.datePickerContainer} >
                                            <TouchableOpacity  onPress={showStartDatePicker} style={styles.datePicker}>
                                                <AntDesign name="calendar" size={responsiveFontSize(4)} color={colors.tertiary} />
                                                <View style={{marginLeft: 15}}>
                                                    <Text style={styles.dateTitle}>Date de début</Text>
                                                    <Text style={styles.dateText}>
                                                        {formatDate(startDate)}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                            <View style={{borderColor: colors.secondary, borderWidth: 1, marginVertical: 20}}>

                                            </View>
                                            <TouchableOpacity onPress={showEndDatePicker} style={styles.datePicker}>
                                                <AntDesign name="calendar" size={responsiveFontSize(4)} color={colors.tertiary} />
                                                <View style={{marginLeft: 15}}>
                                                    <Text style={styles.dateTitle}>Date de fin</Text>
                                                    <Text style={styles.dateText}>
                                                        {formatDate(endDate)}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <DateTimePickerModal
                                            isVisible={isStartDatePicker}
                                            mode="date"
                                            onConfirm={handleStartDateConfirm}
                                            onCancel={hideStartDatePicker}
                                        />
                                        <DateTimePickerModal
                                            isVisible={isEndDatePicker}
                                            mode="date"
                                            onConfirm={handleEndDateConfirm}
                                            onCancel={hideEndDatePicker}
                                        />
                                    </View>
                                    <View style={styles.guestContainer}>
                                        <Text style={styles.guestText}>Invités</Text>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', alignItems: 'center'}}>
                                            {guests.length > 0 && (
                                                guests.map((item, index) => (
                                                    <GuestDisplay guestName={`${item.firstName} ${item.lastName}`} guestImageUrl={item.imageUrl!} key={index}/>
                                                ))
                                            )}
                                            <AddGuestButton onBtnPress={() => setIsGetModal(true)} />
                                        </View>
                                        <AddGuestModal modalIsVisible={isGuestModal} onIconPress={() => setIsGetModal(false)}/>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.submit} onPress={() => {
                                        dispatch(createTravel({
                                            id: travels.length + 1,
                                            budget: values.budget,
                                            name: values.travelName,
                                            destination: values.destination,
                                            startDate: formatDate(startDate),
                                            endDate: formatDate(endDate),
                                        }));
                                        navigation.navigate('Home');
                                    }}>
                                        <Text style={styles.submitText}>Ajouter</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </Formik>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark,
    },
    titleContainer: {
        width: responsiveWidth(90),
        marginTop: responsiveHeight(5),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: responsiveFontSize(3.5),
        fontWeight: "bold",
        color: colors.primary,
    },
    goBackButton: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
    },
    backText: {
        fontSize: responsiveFontSize(2.5),
        color: colors.tertiary,
        fontWeight: "bold"
    },
    inputContainer: {
        flexDirection: 'column',
        marginHorizontal: responsiveWidth(5),
        width: responsiveWidth(90),
    },
    input: {
        borderWidth: 1,
        borderColor: colors.secondary,
        color: colors.primary,
        padding: responsiveWidth(3),
        paddingLeft: responsiveWidth(5),
        marginTop: responsiveHeight(2),
        width: '100%',
        borderRadius: 10,
        fontSize: responsiveFontSize(2),
    },
    datePickerContainer: {
        borderWidth: 1,
        borderColor: colors.secondary,
        color: colors.primary,
        padding: 15,
        marginTop: responsiveHeight(2),
        width: '100%',
        borderRadius: 10,
        fontSize: responsiveFontSize(2.5),
    },
    datePicker: {
        flexDirection: "row",
        alignItems: "center",
    },
    dateTitle: {
        fontSize: responsiveFontSize(1.5),
        color: colors.secondary,
    },
    dateText: {
        fontSize: responsiveFontSize(3),
        color: colors.primary,
    },
    guestContainer: {
        flex: 1,
        width: responsiveWidth(90),
    },
    guestText : {
        fontSize: responsiveFontSize(2.5),
        fontWeight: "bold",
        color: colors.primary,
        marginTop: 10,
        marginBottom: 10,
    },
    submit: {
        marginTop: responsiveHeight(5),
        borderRadius: 10,
        width: responsiveWidth(60),
        borderWidth: 1,
        borderColor: colors.tertiary,
        backgroundColor: colors.primary,
        padding: 10,
    },
    submitText: {
        fontSize: responsiveFontSize(2.5),
        textAlign: 'center',
        color: colors.tertiary,
        fontWeight: 'bold'
    }
})
export default AddTravel;