export type UserInitialType = {
    user: UserStateType
}
export type UserStateType = {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}