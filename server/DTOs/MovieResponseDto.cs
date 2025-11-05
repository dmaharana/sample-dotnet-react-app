namespace MovieApp.Server.DTOs;

public class MovieResponseDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Director { get; set; } = string.Empty;
    public string Genre { get; set; } = string.Empty;
    public DateOnly ReleaseDate { get; set; }
    public int? Duration { get; set; }
    public decimal? Rating { get; set; }
    public string? Description { get; set; }
    public string? PosterUrl { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}