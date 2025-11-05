using System.ComponentModel.DataAnnotations;

namespace MovieApp.Server.Models;

public class Movie
{
    public int Id { get; set; }
    
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
    
    public int? Duration { get; set; } // Duration in minutes
    
    [Range(0.0, 10.0)]
    public decimal? Rating { get; set; }
    
    public string? Description { get; set; }
    
    [Url]
    public string? PosterUrl { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}