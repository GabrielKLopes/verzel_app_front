export interface Genre {
    id: number;
    name: string;
  }
  
  export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    genre_ids: number[];
    release_date: string;
  }

  export interface MoviesDetails {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    budget: number;
    revenue: number;
    genres: Genre[];
    cast: { id: number; name: string; character: string; profile_path: string }[];
    trailer: string;
  }