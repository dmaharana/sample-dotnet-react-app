import { useState, useEffect } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import type { Movie, MoviesQueryParams } from '@/types/movie';
import { movieApi } from '@/services/movieApi';
import { MovieCard } from './MovieCard';
import { MovieForm } from './MovieForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

export function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [searchParams, setSearchParams] = useState<MoviesQueryParams>({
    page: 1,
    pageSize: 12,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const { toast } = useToast();

  const loadMovies = async (params: MoviesQueryParams = {}) => {
    try {
      setLoading(true);
      const response = await movieApi.getMovies(params);
      setMovies(response.movies);
      setPagination(response.pagination);
    } catch (error) {
      toast({
        title: "Error loading movies",
        description: error instanceof Error ? error.message : "Failed to load movies",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadGenres = async () => {
    try {
      const genresList = await movieApi.getGenres();
      setGenres(genresList);
    } catch (error) {
      console.error('Failed to load genres:', error);
    }
  };

  useEffect(() => {
    loadMovies(searchParams);
    loadGenres();
  }, [searchParams]);

  const handleSearch = (value: string) => {
    setSearchParams(prev => ({
      ...prev,
      search: value || undefined,
      page: 1, // Reset to first page when searching
    }));
  };

  const handleGenreFilter = (genre: string) => {
    setSearchParams(prev => ({
      ...prev,
      genre: genre === 'all' ? undefined : genre,
      page: 1, // Reset to first page when filtering
    }));
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await movieApi.deleteMovie(id);
      toast({
        title: "Movie deleted",
        description: "The movie has been successfully deleted.",
      });
      loadMovies(searchParams); // Reload current page
    } catch (error) {
      toast({
        title: "Error deleting movie",
        description: error instanceof Error ? error.message : "Failed to delete movie",
        variant: "destructive",
      });
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingMovie(null);
    loadMovies(searchParams); // Reload to show changes
  };

  const handleFormSuccess = () => {
    toast({
      title: editingMovie ? "Movie updated" : "Movie created",
      description: `The movie has been successfully ${editingMovie ? 'updated' : 'created'}.`,
    });
    handleFormClose();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Movie Collection</h1>
          <p className="text-muted-foreground">
            Manage your movie library with {pagination.totalCount} movies
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Movie
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by title, director, or genre..."
                  className="pl-9"
                  value={searchParams.search || ''}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:w-48">
              <Select value={searchParams.genre || 'all'} onValueChange={handleGenreFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  {genres.map(genre => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Movie Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[2/3] w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : movies.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-4xl mb-4">🎬</div>
            <h3 className="text-lg font-semibold mb-2">No movies found</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchParams.search || searchParams.genre 
                ? "Try adjusting your search or filter criteria." 
                : "Get started by adding your first movie to the collection."}
            </p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add First Movie
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={!pagination.hasPreviousPage}
                onClick={() => handlePageChange(pagination.page - 1)}
              >
                Previous
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={pagination.page === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={!pagination.hasNextPage}
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {/* Movie Form Dialog */}
      {showForm && (
        <MovieForm
          movie={editingMovie}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}