import {
    CREATE_TRAVEL,
    DELETE_TRAVEL,
    UPDATE_BUDGET,
    UPDATE_TRAVEL,
    ADD_BUDGET,
    REFRESH_BUDGET
} from "./travel.constants";
import {TravelStateType} from "./travel.types";

/**
 * @description Travel Actions
 */
export const createTravel = (travel: TravelStateType) => ({type: CREATE_TRAVEL, payload: travel});
export const updateTravel = (travel: TravelStateType) => ({type: UPDATE_TRAVEL, payload: travel});
export const deleteTravel = (travelId: number) => ({type: DELETE_TRAVEL, payload: travelId});
export const addBudget = (amount: number) => ({type: ADD_BUDGET, payload: amount});
export const updateBudget = (travelId: number, amount: number) => ({type: UPDATE_BUDGET, payload: {travelId, amount}});
export const refreshBudget = (travelId: number, amount: number) => ({type: REFRESH_BUDGET, payload: {travelId, amount}});