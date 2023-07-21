export type TUser = {
    id: string;
    firstName: string;
    lastName: string;
    mail: string;
    birthday: string;
    isAdmin: boolean;
}

export type TTopic = {
    id: string;
    title: string;
    subject: string;
    movieId: string;
    type: string;

}

export type TLike = {
    id: number | string;
    userId: string;
    movieId: string
}