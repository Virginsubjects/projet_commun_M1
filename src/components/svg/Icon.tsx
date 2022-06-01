import React from "react";
import {TouchableOpacity} from "react-native";


interface Props {
    onPress: () => void;
}
export const Icon: React.FC<Props> = ({onPress, children}) => {
    return (
       <TouchableOpacity onPress={onPress}>
           {children}
       </TouchableOpacity>
    )
}