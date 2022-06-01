import {Expenses, SpentState} from "./spent.type";
import {
    ADD_BUDGET,
    ADD_SPENT,
    REMOVE_SPENT,
    REMOVE_SPENT_BY_ID,
    UPDATE_AMOUNT_0F_BUDGET,
    UPDATE_AMOUNT_OF_SPENT
} from "./spent.constants";

export const addSpent = (expenses: Expenses) => ({type: ADD_SPENT, payload: expenses});
export const removeSpent = (travelId: number) => ({type: REMOVE_SPENT, payload: travelId});
export const removeSpentById = (id: number) => ({type: REMOVE_SPENT_BY_ID, payload: id});
export const updateAmountSpent = (spentId: number, amount: number) => ({type: UPDATE_AMOUNT_OF_SPENT, payload: {spentId, amount}})