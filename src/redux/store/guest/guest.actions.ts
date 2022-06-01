import {ADD_GUEST, ADD_IMAGE_URL, DELETE_GUEST} from "./guest.constants";
import {GuestType, ImageUrlType} from "./guest.types";

/**
 * @description Guest Actions
 */
export const addGuest = (guest: GuestType) => ({type: ADD_GUEST, payload: guest});
export const deleteGuest = (guestId: number) => ({type: DELETE_GUEST, payload: guestId});
export const addImageUrl = (imageUrl: ImageUrlType) => ({type: ADD_IMAGE_URL, payload: imageUrl});