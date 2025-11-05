export interface Movie {
  id: number;
  title: string;
  director: string;
  genre: string;
  releaseDate: string; // DateOnly serialized as string
  duration?: number;
  rating?: number;
  description?: string;
  posterUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMovieData {
  title: string;
  director: string;
  genre: string;
  releaseDate: string;
  duration?: number;
  rating?: number;
  description?: string;
  posterUrl?: string;
}

export interface UpdateMovieData {
  title?: string;
  director?: string;
  genre?: string;
  releaseDate?: string;
  duration?: number;
  rating?: number;
  description?: string;
  posterUrl?: string;
}

export interface MoviesResponse {
  movies: Movie[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface MoviesQueryParams {
  search?: string;
  genre?: string;
  page?: number;
  pageSize?: number;
}

export interface ApiError {
  type: string;
  title: string;
  status: number;
  detail?: string;
}