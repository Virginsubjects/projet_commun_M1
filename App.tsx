import 'react-native-gesture-handler';
import {useState} from "react";
import {CustomRootState, store} from "./src/redux";
import {NavigationContainer} from "@react-navigation/native";
import AppStack from "./src/navigation/stacks";
import {Provider} from "react-redux";
import navigationOptions from "./src/navigation/config";

export default function App() {
  const [date, setDate] = useState(new Date());
    const [modalVisible, setModalVisible] = useState(false);
  return (
    <Provider store={store}>
        <NavigationContainer theme={navigationOptions}>
             <AppStack />
        </NavigationContainer>
    </Provider>
  );
}
