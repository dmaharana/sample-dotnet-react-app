import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Movie, CreateMovieData, UpdateMovieData } from '@/types/movie';
import { movieApi } from '@/services/movieApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface MovieFormProps {
  movie?: Movie | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function MovieForm({ movie, onClose, onSuccess }: MovieFormProps) {
  const [formData, setFormData] = useState<CreateMovieData>({
    title: '',
    director: '',
    genre: '',
    releaseDate: '',
    duration: undefined,
    rating: undefined,
    description: '',
    posterUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState<string[]>([]);

  const { toast } = useToast();
  const isEditing = !!movie;

  useEffect(() => {
    loadGenres();
    if (movie) {
      setFormData({
        title: movie.title,
        director: movie.director,
        genre: movie.genre,
        releaseDate: movie.releaseDate,
        duration: movie.duration || undefined,
        rating: movie.rating || undefined,
        description: movie.description || '',
        posterUrl: movie.posterUrl || '',
      });
    }
  }, [movie]);

  const loadGenres = async () => {
    try {
      const genresList = await movieApi.getGenres();
      setGenres(genresList);
    } catch (error) {
      console.error('Failed to load genres:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.director.trim() || !formData.genre.trim() || !formData.releaseDate) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      if (isEditing && movie) {
        const updateData: UpdateMovieData = {};
        if (formData.title.trim() !== movie.title) updateData.title = formData.title.trim();
        if (formData.director.trim() !== movie.director) updateData.director = formData.director.trim();
        if (formData.genre.trim() !== movie.genre) updateData.genre = formData.genre.trim();
        if (formData.releaseDate !== movie.releaseDate) updateData.releaseDate = formData.releaseDate;
        if (formData.duration !== movie.duration) updateData.duration = formData.duration;
        if (formData.rating !== movie.rating) updateData.rating = formData.rating;
        if (formData.description !== movie.description) updateData.description = formData.description;
        if (formData.posterUrl !== movie.posterUrl) updateData.posterUrl = formData.posterUrl;

        await movieApi.updateMovie(movie.id, updateData);
      } else {
        await movieApi.createMovie({
          ...formData,
          title: formData.title.trim(),
          director: formData.director.trim(),
          genre: formData.genre.trim(),
        });
      }
      
      onSuccess();
    } catch (error) {
      toast({
        title: isEditing ? "Error updating movie" : "Error creating movie",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreateMovieData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value === '' ? undefined : value,
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {isEditing ? 'Edit Movie' : 'Add New Movie'}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Movie title"
                required
              />
            </div>

            {/* Director */}
            <div className="space-y-2">
              <Label htmlFor="director">Director *</Label>
              <Input
                id="director"
                value={formData.director}
                onChange={(e) => handleInputChange('director', e.target.value)}
                placeholder="Director name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Genre */}
            <div className="space-y-2">
              <Label htmlFor="genre">Genre *</Label>
              <Select
                value={formData.genre}
                onValueChange={(value) => handleInputChange('genre', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map(genre => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">+ Add custom genre</SelectItem>
                </SelectContent>
              </Select>
              {formData.genre === 'custom' && (
                <Input
                  value={genres.includes(formData.genre) ? '' : formData.genre}
                  onChange={(e) => handleInputChange('genre', e.target.value)}
                  placeholder="Enter custom genre"
                  className="mt-2"
                />
              )}
            </div>

            {/* Release Date */}
            <div className="space-y-2">
              <Label htmlFor="releaseDate">Release Date *</Label>
              <Input
                id="releaseDate"
                type="date"
                value={formData.releaseDate}
                onChange={(e) => handleInputChange('releaseDate', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration || ''}
                onChange={(e) => handleInputChange('duration', e.target.value ? parseInt(e.target.value) : '')}
                placeholder="120"
                min="1"
                max="1000"
              />
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <Label htmlFor="rating">Rating (0.0 - 10.0)</Label>
              <Input
                id="rating"
                type="number"
                step="0.1"
                value={formData.rating || ''}
                onChange={(e) => handleInputChange('rating', e.target.value ? parseFloat(e.target.value) : '')}
                placeholder="8.5"
                min="0"
                max="10"
              />
            </div>
          </div>

          {/* Poster URL */}
          <div className="space-y-2">
            <Label htmlFor="posterUrl">Poster URL</Label>
            <Input
              id="posterUrl"
              type="url"
              value={formData.posterUrl || ''}
              onChange={(e) => handleInputChange('posterUrl', e.target.value)}
              placeholder="https://example.com/poster.jpg"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Brief description of the movie..."
              rows={4}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : isEditing ? 'Update Movie' : 'Create Movie'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}