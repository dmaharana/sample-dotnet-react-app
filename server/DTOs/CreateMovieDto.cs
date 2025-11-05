using System.ComponentModel.DataAnnotations;

namespace MovieApp.Server.DTOs;

public class CreateMovieDto
{
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(100)]
    public string Director { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(50)]
    public string Genre { get; set; } = string.Empty;
    
    [Required]
    public DateOnly ReleaseDate { get; set; }
    
    public int? Duration { get; set; }
    
    [Range(0.0, 10.0, ErrorMessage = "Rating must be between 0.0 and 10.0")]
    public decimal? Rating { get; set; }
    
    public string? Description { get; set; }
    
    [Url(ErrorMessage = "Please provide a valid URL for the poster")]
    public string? PosterUrl { get; set; }
}