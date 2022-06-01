export type TravelInitialStateType = {
    travels: TravelStateType[]
}
export type TravelStateType = {
    id: number;
    name: string;
    budget: number;
    destination: string;
    startDate: string;
    endDate: string;
}