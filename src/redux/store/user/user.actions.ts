import {ADD_USER} from "./user.constants";
import {UserStateType} from "./user.types";

/**
 * @description Travel Actions
 */

export const addUser = (user: UserStateType) => ({type: ADD_USER, payload: user })