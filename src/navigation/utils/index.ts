import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack/src/types';

export type Navigation<T extends ParamListBase, K extends keyof T = keyof T> = {
    navigation: StackNavigationProp<T, K>;
    route?: RouteProp<T, K>;
};
