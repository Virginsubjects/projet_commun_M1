import {GuestType} from "../guest/guest.types";

export type Expenses = {
  id: number;
  travelId: number;
  description?: string;
  amount: number;
  for?: GuestType
};

export type SpentState = {
  budget: number,
  expenses: Expenses[]
};