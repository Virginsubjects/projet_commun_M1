import produce from "immer";
import {UserInitialType} from "./user.types";


const initialState: UserInitialType = {
    user: {
        id: undefined,
        email: undefined,
        firstName: undefined,
        lastName: undefined,
        password: undefined,
    }
}

export const userReducer = (state = initialState, action: any) => {
    if (action.type === 'ADD_USER') {
        return produce(state, draft => {
            draft.user = {...action.payload};
        })
    }
    return state;
}