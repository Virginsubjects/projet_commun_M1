import {GuestStateType, GuestType, ImageUrlType} from "./guest.types";
import produce from "immer";
import {ADD_IMAGE_URL} from "./guest.constants";

const initialState: GuestStateType  = {
    guests: [],
    imagesUrl: []
}

export const guestReducer = (state = initialState, action: any) => {
    if (action.type === 'ADD_GUEST') {
        return produce(state, draft => {
            draft.guests.push({...action.payload})
        });
    }
    if (action.type === ADD_IMAGE_URL){
        return produce(state, draft => {
            draft.imagesUrl!.push({...action.payload})
        });
    }
    return state;
}
