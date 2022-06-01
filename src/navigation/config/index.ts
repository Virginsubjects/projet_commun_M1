import { DefaultTheme } from '@react-navigation/native';
import colors from "../../constants/colors";


const navigationOptions = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: colors.primary,
        background: colors.primary,
    },
};

export default navigationOptions;
