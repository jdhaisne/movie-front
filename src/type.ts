export type TUser = {
    id: string;
    firstName: string;
    lastName: string;
    mail: string;
    birthday: string;
    isAdmin?: boolean;
    role?: string;
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

export type TMovie = {
    Actors?: string;
    Awards?: string;
    BoxOffice?: string;
    Country?: string;
    DVD?:  string;
    Director?: string;
    Genre?: string;
    Language?: string;
    Metascore?: string;
    Plot?: string;
    Poster?: string;
    Production?: string;
    Rated?: string;
    Ratings?: any[];
    Released?: string;
    Response?: string;
    Runtime?: string;
    Title?: string;
    Type?: string;
    Website?: string;
    Writer?: string;
    Year?: string;
    imdbID: string;
    imdbRating?: string;
    imdbVotes?: string;
}