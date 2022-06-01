import React, {useEffect} from "react";
import {StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {Formik, FormikValues} from "formik";
import colors from "../constants/colors";
import {Navigation} from "../navigation/utils";
import {AppStackParamList} from "../navigation/stacks";
import {responsiveFontSize, responsiveHeight, responsiveWidth} from "react-native-responsive-dimensions";
import {useSelector} from "react-redux";
import {CustomRootState} from "../redux";


export const Auth: React.FC<Navigation<AppStackParamList>> = ({navigation}) => {
    const user = useSelector((state: CustomRootState) => state.user.user);

    useEffect(() => {
        if (user.email !== undefined || user.password !== undefined) {
            navigation.navigate('Home')
        }
    }, [])

    const checkIfUserExists = (values: FormikValues) => {
        if (values.email === user.email && values.password === user.password) {
            navigation.navigate('Home')
        } else {
            alert('Aucun utilisateur ne correspond à ces identifiants')
        }
    }
    return (
        <>
            <StatusBar/>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Travvi</Text>
                </View>
                <Formik initialValues={{email: '', password: ''}} onSubmit={(values) => console.log(values)}>
                    {({handleSubmit, handleChange, values}) => (
                        <>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={[styles.input, {marginRight: 20}]}
                                    onChangeText={handleChange('email')}
                                    placeholder="Email"
                                    placeholderTextColor={colors.tertiary}
                                />
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('password')}
                                    placeholder="Mot de passe"
                                    placeholderTextColor={colors.tertiary}
                                />
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 10}}>
                                <TouchableOpacity style={[styles.submit, {marginRight: 5}]}
                                                  onPress={() => navigation.navigate('Register')}>
                                    <Text style={styles.submitText}>S'inscrire</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.submit} onPress={() => checkIfUserExists(values)}>
                                    <Text style={styles.submitText}>Se connecter</Text>
                                </TouchableOpacity>
                            </View>
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
        paddingVertical: responsiveHeight(10)
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
        width: responsiveWidth(45),
        borderWidth: 1,
        borderColor: colors.tertiary,
        padding: 10,
    },
    submitText: {
        fontSize: responsiveFontSize(2.5),
        textAlign: 'center',
        color: colors.tertiary,
        fontWeight: 'bold'
    }
});

export default Auth;