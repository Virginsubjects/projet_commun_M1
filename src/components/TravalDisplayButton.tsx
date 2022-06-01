import React, {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {AntDesign, Entypo, Feather, FontAwesome5, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import colors from "../constants/colors";
import {responsiveFontSize, responsiveHeight, responsiveWidth} from "react-native-responsive-dimensions";
import {Navigation} from "../navigation/utils";
import {AppStackParamList} from "../navigation/stacks";
import {useDispatch} from "react-redux";
import {deleteTravel} from "../redux/store/travel/travel.actions";
import Animated, {useAnimatedStyle, useDerivedValue, withTiming} from 'react-native-reanimated';
import AddGuestModal from "./guest/AddGuestModal";
import {TrashIcon} from "./svg/TrashIcon";
import {ViewIcon} from "./svg/ViewIcon";
import {UserIcon} from "./svg/UserIcon";
import {WalletIcon} from "./svg/WalletIcon";
import AddSpentModal from "./budget/AddSpentModal";
import {removeSpent} from "../redux/store/budget/spent.actions";
import {store} from "../redux";
const defaultOptionPanelWidth = 0;
const animatedTextMarginRight = responsiveWidth(10);

interface Props {
    travelName?: string;
    travelId?: number;
}

const TravelDisplayButton: React.FC<Props & Navigation<AppStackParamList>> = ({travelName, travelId, navigation}) => {
    const dispatch = useDispatch();
    const [showOptions, setShowOptions] = React.useState(false);
    const [isGuestModal, setIsGetModal] = useState(false);
    const [isSpentModal, setIsSpentModal] = useState(false);

    const changeOptionsPanelWidth = useDerivedValue(() => showOptions ? withTiming(100, {duration: 600}) : withTiming(0, {duration: 400}));
    const changeWrenchIcon = useDerivedValue(() => showOptions ? withTiming(0, {duration: 600}) : withTiming(1, {duration: 600}));
    const changeTextWidth = useDerivedValue(() => showOptions ? withTiming(0) : withTiming(100));
    const changeTextOpacity = useDerivedValue(() => showOptions ? withTiming(0) : withTiming(1));
    const changeTextMargin = useDerivedValue(() => showOptions ? withTiming(0) : withTiming(animatedTextMarginRight));
    const changeIconOpacity = useDerivedValue(() => showOptions ? withTiming(1, {duration: 600}) : withTiming(0));

    const rTextStyle = useAnimatedStyle(() => ({
        width: `${changeTextWidth.value}%`,
        opacity: changeTextOpacity.value
    }), []);

    const rStyle = useAnimatedStyle(() => ({
        width: `${changeOptionsPanelWidth.value}%`,
    }), [showOptions]);

    const rWrenchStyle = useAnimatedStyle(() => ({
        opacity: changeWrenchIcon.value
    }), []);

    const rPanelIconStyle = useAnimatedStyle(() => ({
        opacity: changeIconOpacity.value
    }), []);

    return (
        <Animated.View style={styles.container}>
            <Animated.View style={[styles.textContainer, rTextStyle]}>
                <Ionicons name="earth" size={24} color="black"/>
                <Text style={[styles.text]}>{travelName}</Text>
            </Animated.View>
            {!showOptions && (
                <Animated.View style={[{marginLeft: 'auto'}, rWrenchStyle]}>
                    <MaterialCommunityIcons
                        name="progress-wrench"
                        size={responsiveFontSize(4)} color={colors.tertiary}
                        onPress={() => setShowOptions(true)}/>
                </Animated.View>
            )}
            <Animated.View style={[styles.iconsContainer, rStyle]}>
                {showOptions && (
                    <Animated.View style={[styles.closeBtnContainer, rPanelIconStyle]}>
                        <Entypo
                            name="circle-with-cross"
                            size={24}
                            color={colors.primary}
                            onPress={() => setShowOptions(false)}/>
                    </Animated.View>
                )}
                <Animated.View style={[rPanelIconStyle, {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: responsiveWidth(80),
                }]}>
                    <Animated.View style={[{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}, rPanelIconStyle]}>
                        <WalletIcon onPress={()=> setIsSpentModal(true)}/>
                        <UserIcon onPress={() => setIsGetModal(true)} />
                        <ViewIcon onPress={() => navigation.navigate('Travel', {travelId: travelId!})}/>
                        <TrashIcon
                            onPress={() => {
                            dispatch(deleteTravel(travelId!));
                            dispatch(removeSpent(travelId!));
                            console.log(store.getState().budget.expenses);
                            setShowOptions(false);
                        }}/>
                    </Animated.View>
                </Animated.View>
            </Animated.View>
            <AddGuestModal modalIsVisible={isGuestModal} onIconPress={() => setIsGetModal(false)} travelId={travelId}/>
            <AddSpentModal  modalIsVisible={isSpentModal} onIconPress={() => setIsSpentModal(false)} travelId={travelId}/>
        </Animated.View>
    )
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: responsiveWidth(6),
        marginVertical: responsiveHeight(2),
        width: responsiveWidth(90),
        height: responsiveHeight(8),
        backgroundColor: colors.primary,
        borderRadius: 10,
    },
    textContainer: {
        height: '100%',
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        color: colors.dark,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: responsiveFontSize(1.5),
        marginLeft: responsiveWidth(3)

    },
    closeBtnContainer: {
        width: responsiveWidth(8),
        backgroundColor: colors.tertiary,
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
        borderTopLeftRadius: 9,
        borderBottomLeftRadius: 9,
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: defaultOptionPanelWidth,
        height: '100%',
        borderRadius: 10,
        backgroundColor: colors.primary,
    }
});

export default TravelDisplayButton