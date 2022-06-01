import produce from "immer";
import {TravelInitialStateType, TravelStateType} from "./travel.types";
import {CREATE_TRAVEL, DELETE_TRAVEL, REFRESH_BUDGET, UPDATE_BUDGET, UPDATE_TRAVEL} from "./travel.constants";
import {ADD_BUDGET} from "../budget/spent.constants";

const initialState: TravelInitialStateType = {
    travels: []
}

export const travelReducer = (state = initialState, action: any) => {
    if (action.type === CREATE_TRAVEL) {
        return produce(state, (draft) => {
            draft.travels.push({...action.payload})
        });
    }
    if(action.type === UPDATE_TRAVEL) {
        return produce(state, (draft) => {
            draft.travels = draft.travels.map((travel) => {
                if (travel.id === action.payload.id) {
                    return {...travel, ...action.payload}
                }
                return travel
            })
        });
    }
    if(action.type === DELETE_TRAVEL) {
        return produce(state, (draft) => {
            draft.travels = draft.travels.filter((travel) => travel.id !== action.payload);
        });
    }
    if(action.type === UPDATE_BUDGET) {
        return produce(state, (draft) => {
            let actualTravel = draft.travels.find((travel) => travel.id === action.payload.travelId);
            actualTravel!.budget = actualTravel!.budget - action.payload.amount;
        });
    }
    return state;
}