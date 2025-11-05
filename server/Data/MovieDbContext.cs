using Microsoft.EntityFrameworkCore;
using MovieApp.Server.Models;

namespace MovieApp.Server.Data;

public class MovieDbContext : DbContext
{
    public MovieDbContext(DbContextOptions<MovieDbContext> options) : base(options)
    {
    }

    public DbSet<Movie> Movies { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure Movie entity
        modelBuilder.Entity<Movie>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Director).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Genre).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Duration).IsRequired(false);
            entity.Property(e => e.Rating).HasColumnType("decimal(3,1)");
            entity.Property(e => e.Description).IsRequired(false);
            entity.Property(e => e.PosterUrl).IsRequired(false);
            entity.Property(e => e.CreatedAt).IsRequired();
            entity.Property(e => e.UpdatedAt).IsRequired();
        });

        // Seed some sample data
        modelBuilder.Entity<Movie>().HasData(
            new Movie
            {
                Id = 1,
                Title = "The Shawshank Redemption",
                Director = "Frank Darabont",
                Genre = "Drama",
                ReleaseDate = new DateOnly(1994, 9, 23),
                Duration = 142,
                Rating = 9.3m,
                Description = "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
                PosterUrl = "https://example.com/shawshank.jpg",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Movie
            {
                Id = 2,
                Title = "The Godfather",
                Director = "Francis Ford Coppola",
                Genre = "Crime",
                ReleaseDate = new DateOnly(1972, 3, 24),
                Duration = 175,
                Rating = 9.2m,
                Description = "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
                PosterUrl = "https://example.com/godfather.jpg",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Movie
            {
                Id = 3,
                Title = "The Dark Knight",
                Director = "Christopher Nolan",
                Genre = "Action",
                ReleaseDate = new DateOnly(2008, 7, 18),
                Duration = 152,
                Rating = 9.0m,
                Description = "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
                PosterUrl = "https://example.com/darkknight.jpg",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Movie
            {
                Id = 4,
                Title = "Pulp Fiction",
                Director = "Quentin Tarantino",
                Genre = "Crime",
                ReleaseDate = new DateOnly(1994, 10, 14),
                Duration = 154,
                Rating = 8.9m,
                Description = "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
                PosterUrl = "https://example.com/pulpfiction.jpg",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Movie
            {
                Id = 5,
                Title = "The Lord of the Rings: The Fellowship of the Ring",
                Director = "Peter Jackson",
                Genre = "Adventure",
                ReleaseDate = new DateOnly(2001, 12, 19),
                Duration = 178,
                Rating = 8.8m,
                Description = "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring.",
                PosterUrl = "https://example.com/lotr1.jpg",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        );
    }
}