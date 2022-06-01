import {SpentState} from "./spent.type";
import {
  ADD_BUDGET,
  ADD_SPENT, REFRESH_BUDGET,
  REMOVE_SPENT, REMOVE_SPENT_BY_ID, SUBTRACT_AMOUNT_OF_BUDGET,
  UPDATE_AMOUNT_0F_BUDGET,
  UPDATE_AMOUNT_OF_SPENT
} from "./spent.constants";
import produce from "immer";

const initialState: SpentState = {
    budget: 0,
    expenses: []
};

export const spentReducer = (state = initialState, action: any) => {
  if (action.type === ADD_SPENT) {
    return produce(state, draft => {
      draft.expenses.push(action.payload);
      draft.budget -= action.payload.amount;
    });
  }
  if(action.type === UPDATE_AMOUNT_OF_SPENT) {
    return produce(state, draft => {
      draft.expenses[action.payload.spentId].amount = action.payload.amount;
      draft.budget = draft.budget + action.payload.amount;
    });
  }
  if(action.type === SUBTRACT_AMOUNT_OF_BUDGET) {
    return produce(state, (draft) => {
        draft.budget = draft.budget - action.payload;
    })
  }
  if (action.type === REMOVE_SPENT) {
    return produce(state, draft => {
        draft.expenses = draft.expenses.filter((expense) => expense.travelId !== action.payload);
    });
  }
  if (action.type === REMOVE_SPENT_BY_ID) {
    return produce(state, draft => {
        draft.expenses = draft.expenses.filter((expense) => expense.id !== action.payload);
    });
  }
  return state;
}