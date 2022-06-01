import {createStackNavigator} from '@react-navigation/stack';
import Auth from "../../screens/Auth";
import AddTravel from "../../screens/AddTravel";
import Travel from "../../screens/display/Travels";
import Home from "../../screens/Home";
import Register from "../../screens/Register";

export type AppStackParamList = {
    Home: undefined;
    Auth: undefined;
    Register: undefined;
    AddTravel: { travelId: number };
    Travel: { travelId: number };
}

const Stack = createStackNavigator<AppStackParamList>();

const AppStack = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Auth" component={Auth}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="AddTravel" component={AddTravel}/>
        <Stack.Screen name="Travel" component={Travel}/>
    </Stack.Navigator>
);

export default AppStack;