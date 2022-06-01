import React, {useState} from "react";
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

import {Octicons} from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import {useDispatch, useSelector} from "react-redux";
import {Formik} from 'formik';
import {CustomRootState} from "../../redux";
import {addGuest, addImageUrl} from "../../redux/store/guest/guest.actions";
import colors from "../../constants/colors";
import {responsiveFontSize, responsiveHeight, responsiveWidth,} from "react-native-responsive-dimensions";
import BottomModal from "../BottomModal";

interface Props {
    modalIsVisible: boolean,
    onIconPress: () => void,
    travelId?: number,
}
const AddGuestModal: React.FC<Props> = ({modalIsVisible, onIconPress, travelId}) => {
    const dispatch = useDispatch();
    const guest = useSelector((state: CustomRootState) => state.guest.guests);
    const imageUrls = useSelector((state: CustomRootState) => state.guest.imagesUrl);
    const travel = useSelector((state: CustomRootState) => state.travel.travels);

    return (
        <BottomModal modalIsVisible={modalIsVisible} onIconPress={onIconPress} travelId={travelId}>
            <View style={{ flexDirection: 'row', marginTop: responsiveHeight(3)}}>
                    <TouchableOpacity style={styles.image}>
                        <Text style={styles.addImageText}>?</Text>
                    </TouchableOpacity>
                <Formik initialValues={{firstName: '', lastName: ''}} onSubmit={(values => console.log(values))}>
                    {({handleChange, values}) => (
                        <View style={{flexDirection: 'column', alignItems: 'center'}}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={[styles.input, {marginRight: 20}]}
                                    onChangeText={handleChange('firstName')}
                                    placeholder="Prénom"
                                />
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('lastName')}
                                    placeholder="Nom"
                                />

                            </View>
                            <TouchableOpacity
                                style={styles.submit}
                                onPress={() => {
                                    dispatch(addGuest({
                                        id: guest.length + 1,
                                        travelId: travelId !== undefined ? travelId : travel.length + 1,
                                        firstName: values.firstName,
                                        lastName: values.lastName,
                                        imageUrl: ''
                                    }));
                                    onIconPress();
                                } }>
                                <Text style={styles.addGuestText}>
                                    Ajouter un invité
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </View>
        </BottomModal>
    )
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
        fontSize: responsiveFontSize(5),
        fontWeight: "bold",
        color: colors.secondary
    },
    inputContainer: {
        flexDirection: 'column',
    },
    input: {
       borderWidth: 1,
       borderColor: colors.secondary,
       padding: 10,
       marginTop: 10,
       width: responsiveWidth(45),
       borderRadius: 10
    },
    submit: {
        marginTop: responsiveHeight(5),
        marginLeft: responsiveWidth(-50),
        borderRadius: 10,
        width: responsiveWidth(60),
        borderWidth: 1,
        borderColor: colors.tertiary,
        padding: 10,
    },
    addGuestText: {
        fontSize: 24,
        textAlign: 'center',
        color: colors.tertiary,
        fontWeight: 'bold'
    }
});

export default AddGuestModal;