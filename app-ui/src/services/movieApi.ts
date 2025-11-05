import type { 
  Movie, 
  CreateMovieData, 
  UpdateMovieData, 
  MoviesResponse, 
  MoviesQueryParams,
  ApiError 
} from '../types/movie';

const API_BASE_URL = 'http://localhost:5093';

class MovieApiService {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: ApiError = {
        type: 'Error',
        title: response.statusText,
        status: response.status,
        detail: await response.text()
      };
      throw error;
    }
    return response.json();
  }

  async getMovies(params?: MoviesQueryParams): Promise<MoviesResponse> {
    const searchParams = new URLSearchParams();
    
    if (params?.search) searchParams.append('search', params.search);
    if (params?.genre) searchParams.append('genre', params.genre);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.pageSize) searchParams.append('pageSize', params.pageSize.toString());

    const url = `${API_BASE_URL}/api/movies${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    
    const response = await fetch(url);
    return this.handleResponse<MoviesResponse>(response);
  }

  async getMovie(id: number): Promise<Movie> {
    const response = await fetch(`${API_BASE_URL}/api/movies/${id}`);
    return this.handleResponse<Movie>(response);
  }

  async createMovie(data: CreateMovieData): Promise<Movie> {
    const response = await fetch(`${API_BASE_URL}/api/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return this.handleResponse<Movie>(response);
  }

  async updateMovie(id: number, data: UpdateMovieData): Promise<Movie> {
    const response = await fetch(`${API_BASE_URL}/api/movies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return this.handleResponse<Movie>(response);
  }

  async deleteMovie(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/movies/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const error: ApiError = {
        type: 'Error',
        title: response.statusText,
        status: response.status,
        detail: await response.text()
      };
      throw error;
    }
  }

  async getGenres(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/api/movies/genres`);
    return this.handleResponse<string[]>(response);
  }
}

export const movieApi = new MovieApiService();