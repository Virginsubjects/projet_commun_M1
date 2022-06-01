import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {travelReducer} from "./store/travel/travel.reducer";
import {guestReducer} from "./store/guest/guest.reducer";
import {spentReducer} from "./store/budget/spent.reducer";
import {userReducer} from "./store/user/user.reducer";

const rootReducer = combineReducers({
    travel: travelReducer,
    guest: guestReducer,
    budget: spentReducer,
    user: userReducer
});

export const store = configureStore({
    reducer: rootReducer
})

export type CustomRootState = ReturnType<typeof store.getState>;
export type CustomAppDispatch = typeof store.dispatch;