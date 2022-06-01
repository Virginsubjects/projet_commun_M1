import React, {useEffect} from "react";
import {StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {Formik, FormikValues} from "formik";
import colors from "../constants/colors";
import {Navigation} from "../navigation/utils";
import {AppStackParamList} from "../navigation/stacks";
import {responsiveFontSize, responsiveHeight, responsiveWidth} from "react-native-responsive-dimensions";
import {useDispatch, useSelector} from "react-redux";
import {CustomRootState} from "../redux";
import * as Yup from 'yup';
import {err} from "react-native-svg/lib/typescript/xml";
import {addUser} from "../redux/store/user/user.actions";

export const Register: React.FC<Navigation<AppStackParamList>> = ({navigation}) => {
    const user = useSelector((state: CustomRootState) => state.user.user);
    useEffect(() => {
        if (user.email !== undefined || user.password !== undefined) {
            navigation.navigate('Home')
        }
    }, [])
    const dispatch = useDispatch();
    const signUpValidation = () => Yup.object().shape({
        email: Yup.string().email('veuillez saisir un email valide').required('Ce champ est requis'),
        firstname: Yup.string()
            .min(3, 'min 3 caractéres')
            .max(20, 'max 20 caractéres')
            .required('Ce champ est requis'),
        lastname: Yup.string()
            .min(3, 'min 3 caractéres')
            .max(20, 'max 20 caractéres')
            .required('Ce champ est requis'),
        password: Yup.string()
            .required('Ce champ est requis')
            .min(6, 'min 6 caractéres'),

    });
    return (
        <>
            <StatusBar/>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Travvi</Text>
                </View>
                <Formik
                    initialValues={{firstname: '',lastname: '', password: '', email: '',}}
                    validationSchema={signUpValidation()}
                    onSubmit={(values) => {
                        dispatch(addUser({
                            id: 1,
                            email: values.email,
                            firstName: values.firstname,
                            lastName: values.lastname,
                            password: values.password,

                        }));
                        navigation.navigate('Home');
                    }}>
                    {({handleSubmit, handleChange, values, errors, touched}) => (
                        <>
                            <View style={styles.inputContainer}>
                                {errors.email && touched.email ? (
                                    <Text style={{color: 'red'}}>{errors.email}</Text>
                                ) : null}
                                <TextInput
                                    style={[styles.input, {marginRight: 20}]}
                                    onChangeText={handleChange('email')}
                                    keyboardType={'email-address'}
                                    placeholder="Email"
                                    placeholderTextColor={colors.tertiary}
                                />
                                {errors.firstname && touched.firstname ? (
                                    <Text style={{color: 'red'}}>{errors.firstname}</Text>
                                ) : null}
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('firstname')}
                                    placeholder="Prénom"
                                    keyboardType={'default'}
                                    placeholderTextColor={colors.tertiary}
                                />
                                {errors.lastname && touched.lastname ? (
                                    <Text style={{color: 'red'}}>{errors.lastname}</Text>
                                ) : null}
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('lastname')}
                                    placeholder="Nom"
                                    keyboardType={'default'}
                                    placeholderTextColor={colors.tertiary}
                                />
                                {errors.password && touched.password ? (
                                    <Text style={{color: 'red'}}>{errors.password}</Text>
                                ) : null}
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('password')}
                                    placeholder="Mot de passe"
                                    secureTextEntry={true}
                                    placeholderTextColor={colors.tertiary}
                                />
                            </View>
                            <TouchableOpacity style={styles.submit} onPress={() => handleSubmit()}>
                                <Text style={styles.submitText}>Se connecter</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </Formik>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    titleContainer: {
        paddingVertical: responsiveHeight(5)
    },
    title: {
        fontSize: responsiveFontSize(15),
        color: colors.secondary
    },
    inputContainer: {
        flexDirection: 'column',
        marginHorizontal: responsiveWidth(10),
        width: responsiveWidth(90),
    },
    input: {
        borderWidth: 1,
        borderColor: colors.secondary,
        color: colors.tertiary,
        padding: 15,
        marginBottom: responsiveHeight(4),
        width: '100%',
        borderRadius: 10,
        fontSize: 18,
    },
    submit: {
        borderRadius: 10,
        width: responsiveWidth(60),
        borderWidth: 1,
        borderColor: colors.tertiary,
        padding: 10,
        marginTop: responsiveHeight(5),
    },
    submitText: {
        fontSize: responsiveFontSize(3),
        textAlign: 'center',
        color: colors.tertiary,
        fontWeight: 'bold'
    }
});

export default Register;