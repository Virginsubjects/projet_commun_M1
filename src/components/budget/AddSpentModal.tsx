import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {CustomRootState} from "../../redux";
import {Formik} from "formik";
import {responsiveFontSize, responsiveHeight, responsiveWidth} from "react-native-responsive-dimensions";
import colors from "../../constants/colors";
import { addSpent} from "../../redux/store/budget/spent.actions";
import ScreenModal from "../ScreenModal";
import ExpensesDisplay from "./ExpensesDisplay";
import {updateBudget} from "../../redux/store/travel/travel.actions";

interface Props {
    modalIsVisible: boolean,
    onIconPress: () => void,
    travelId?: number,
}

const AddSpentModal: React.FC<Props> = ({modalIsVisible, onIconPress, travelId}) => {
    const state = useSelector((state: CustomRootState) => state.budget);
    const guests = useSelector((state: CustomRootState) => state.guest.guests.filter(item => item.travelId === travelId));
    const budget = useSelector((state: CustomRootState) => state.travel.travels.find(item => item.id === travelId));
    const expenses = useSelector((state: CustomRootState) => state.budget.expenses.filter(item => item.travelId === travelId));
    const [value, setValue] = React.useState('');
    const dispatch = useDispatch();
    const amountInputRef = React.createRef<TextInput>();
    const descriptionInputRef = React.createRef<TextInput>();
    return (
        <ScreenModal modalIsVisible={modalIsVisible} onIconPress={onIconPress} travelId={travelId}>
            <View style={{marginHorizontal: 10, width: responsiveWidth(90)}}>
                <Formik
                    initialValues={{amount: 0, description: ''}}
                    onSubmit={((values) => {
                        dispatch(updateBudget(travelId!, values.amount))
                        dispatch(addSpent({
                            id: expenses.length + 1,
                            travelId: travelId!,
                            amount: values.amount,
                            description: values.description,
                        }));
                    })}>
                    {({handleChange, values, handleSubmit}) => (
                        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                            <View style={styles.inputContainer}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{fontSize: responsiveFontSize(2)}}>Budget
                                        actuel: {budget!.budget} €</Text>
                                </View>
                            </View>
                            {expenses.length > 0 ? expenses.map((item, index) => (
                                    <View style={{width: responsiveWidth(90), alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}>
                                        <ExpensesDisplay item={item} key={index}/>
                                    </View>
                                )) :
                                (
                                    <View style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginVertical: responsiveHeight(10)
                                    }}>
                                        <Text style={{fontSize: responsiveFontSize(2)}}>Vous n'avez aucune dépense</Text>
                                    </View>
                                )
                            }
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={[styles.input, {marginRight: 20}]}
                                    ref={amountInputRef}
                                    onChangeText={handleChange('amount')}
                                    placeholder="Montant"
                                    keyboardType={'numeric'}
                                    placeholderTextColor={colors.tertiary}
                                />
                                <TextInput
                                    style={[styles.input, { width: responsiveWidth(40)}]}
                                    ref={descriptionInputRef}
                                    onChangeText={handleChange('description')}
                                    placeholder="Description"
                                    placeholderTextColor={colors.tertiary}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.submit}
                                onPress={() => {
                                    handleSubmit();
                                }}>
                                <Text style={styles.addGuestText}>
                                    Ajouter une dépense
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </View>
        </ScreenModal>
    );
}
const styles = StyleSheet.create({
    image: {
        width: responsiveWidth(30),
        height: responsiveWidth(30),
        borderRadius: 100,
        marginHorizontal: responsiveWidth(10),
        borderWidth: 2,
        borderColor: colors.secondary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addImageText: {
        fontSize: responsiveFontSize(1.3),
        fontWeight: "bold",
        color: colors.secondary
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        width: responsiveWidth(90),
    },
    input: {
        borderWidth: 1,
        borderColor: colors.secondary,
        padding: 10,
        marginTop: 10,
        borderRadius: 10
    },
    submit: {
        marginTop: responsiveHeight(5),
        borderRadius: 10,
        width: responsiveWidth(60),
        borderWidth: 1,
        borderColor: colors.tertiary,
        padding: 10,
        alignSelf: 'center'
    },
    addGuestText: {
        fontSize: 24,
        textAlign: 'center',
        color: colors.tertiary,
        fontWeight: 'bold'
    }
});
export default AddSpentModal;