export type GuestStateType = {
    guests: GuestType[]
    imagesUrl: ImageUrlType[]
}
export type ImageUrlType = {
    guestId: number
    imageUrl: string
}
export type GuestType = {
    id: number | null;
    travelId: number | null;
    firstName: string | null;
    lastName: string | null;
    imageUrl: string | null;
}