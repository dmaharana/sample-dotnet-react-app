using Microsoft.EntityFrameworkCore;
using MovieApp.Server.Data;
using MovieApp.Server.DTOs;
using MovieApp.Server.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add Entity Framework with automatic provider selection
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? "Host=localhost;Database=MovieApp;Username=postgres;Password=password";

builder.Services.AddDbContext<MovieDbContext>(options =>
{
    if (connectionString.Contains("Data Source=") || connectionString.Contains("movies.db"))
    {
        // Use SQLite for development
        options.UseSqlite(connectionString);
        Console.WriteLine("Using SQLite database for development");
    }
    else
    {
        // Use PostgreSQL for production
        options.UseNpgsql(connectionString);
        Console.WriteLine("Using PostgreSQL database for production");
    }
});

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:5174", "http://localhost:3000", "http://localhost:5093")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");

// Initialize database
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<MovieDbContext>();
    try
    {
        context.Database.EnsureCreated();
        Console.WriteLine("Database initialized successfully");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Database initialization failed: {ex.Message}");
    }
}

// Movie CRUD Endpoints

// Get all movies with optional filtering and pagination
app.MapGet("/api/movies", async (MovieDbContext context, 
    string? search, string? genre, int page = 1, int pageSize = 10) =>
{
    try
    {
        var query = context.Movies.AsQueryable();

        // Apply search filter
        if (!string.IsNullOrEmpty(search))
        {
            query = query.Where(m => m.Title.Contains(search) || 
                                   m.Director.Contains(search) ||
                                   m.Genre.Contains(search));
        }

        // Apply genre filter
        if (!string.IsNullOrEmpty(genre))
        {
            query = query.Where(m => m.Genre == genre);
        }

        // Get total count for pagination
        var totalCount = await query.CountAsync();
        var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

        // Apply pagination and get results
        var movies = await query
            .OrderBy(m => m.Title)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(m => new MovieResponseDto
            {
                Id = m.Id,
                Title = m.Title,
                Director = m.Director,
                Genre = m.Genre,
                ReleaseDate = m.ReleaseDate,
                Duration = m.Duration,
                Rating = m.Rating,
                Description = m.Description,
                PosterUrl = m.PosterUrl,
                CreatedAt = m.CreatedAt,
                UpdatedAt = m.UpdatedAt
            })
            .ToListAsync();

        return Results.Ok(new 
        { 
            movies, 
            pagination = new 
            {
                page,
                pageSize,
                totalCount,
                totalPages,
                hasNextPage = page < totalPages,
                hasPreviousPage = page > 1
            }
        });
    }
    catch (Exception ex)
    {
        return Results.Problem($"Error retrieving movies: {ex.Message}");
    }
})
.WithName("GetMovies")
.WithOpenApi();

// Get all genres (for dropdown filters)
app.MapGet("/api/movies/genres", async (MovieDbContext context) =>
{
    try
    {
        var genres = await context.Movies
            .Select(m => m.Genre)
            .Distinct()
            .OrderBy(g => g)
            .ToListAsync();

        return Results.Ok(genres);
    }
    catch (Exception ex)
    {
        return Results.Problem($"Error retrieving genres: {ex.Message}");
    }
})
.WithName("GetGenres")
.WithOpenApi();

// Get movie by ID
app.MapGet("/api/movies/{id}", async (int id, MovieDbContext context) =>
{
    try
    {
        var movie = await context.Movies
            .Where(m => m.Id == id)
            .Select(m => new MovieResponseDto
            {
                Id = m.Id,
                Title = m.Title,
                Director = m.Director,
                Genre = m.Genre,
                ReleaseDate = m.ReleaseDate,
                Duration = m.Duration,
                Rating = m.Rating,
                Description = m.Description,
                PosterUrl = m.PosterUrl,
                CreatedAt = m.CreatedAt,
                UpdatedAt = m.UpdatedAt
            })
            .FirstOrDefaultAsync();

        if (movie == null)
        {
            return Results.NotFound($"Movie with ID {id} not found");
        }

        return Results.Ok(movie);
    }
    catch (Exception ex)
    {
        return Results.Problem($"Error retrieving movie: {ex.Message}");
    }
})
.WithName("GetMovie")
.WithOpenApi();

// Create new movie
app.MapPost("/api/movies", async (CreateMovieDto createMovieDto, MovieDbContext context) =>
{
    try
    {
        // Validate that no movie with same title and director exists
        var existingMovie = await context.Movies
            .FirstOrDefaultAsync(m => m.Title.ToLower() == createMovieDto.Title.ToLower() && 
                                     m.Director.ToLower() == createMovieDto.Director.ToLower());

        if (existingMovie != null)
        {
            return Results.Conflict("A movie with the same title and director already exists");
        }

        var movie = new Movie
        {
            Title = createMovieDto.Title,
            Director = createMovieDto.Director,
            Genre = createMovieDto.Genre,
            ReleaseDate = createMovieDto.ReleaseDate,
            Duration = createMovieDto.Duration,
            Rating = createMovieDto.Rating,
            Description = createMovieDto.Description,
            PosterUrl = createMovieDto.PosterUrl,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        context.Movies.Add(movie);
        await context.SaveChangesAsync();

        var movieResponse = new MovieResponseDto
        {
            Id = movie.Id,
            Title = movie.Title,
            Director = movie.Director,
            Genre = movie.Genre,
            ReleaseDate = movie.ReleaseDate,
            Duration = movie.Duration,
            Rating = movie.Rating,
            Description = movie.Description,
            PosterUrl = movie.PosterUrl,
            CreatedAt = movie.CreatedAt,
            UpdatedAt = movie.UpdatedAt
        };

        return Results.Created($"/api/movies/{movie.Id}", movieResponse);
    }
    catch (Exception ex)
    {
        return Results.Problem($"Error creating movie: {ex.Message}");
    }
})
.WithName("CreateMovie")
.WithOpenApi();

// Update movie
app.MapPut("/api/movies/{id}", async (int id, UpdateMovieDto updateMovieDto, MovieDbContext context) =>
{
    try
    {
        var movie = await context.Movies.FindAsync(id);
        if (movie == null)
        {
            return Results.NotFound($"Movie with ID {id} not found");
        }

        // Update properties if provided
        if (!string.IsNullOrEmpty(updateMovieDto.Title))
            movie.Title = updateMovieDto.Title;
        
        if (!string.IsNullOrEmpty(updateMovieDto.Director))
            movie.Director = updateMovieDto.Director;
        
        if (!string.IsNullOrEmpty(updateMovieDto.Genre))
            movie.Genre = updateMovieDto.Genre;
        
        if (updateMovieDto.ReleaseDate.HasValue)
            movie.ReleaseDate = updateMovieDto.ReleaseDate.Value;
        
        if (updateMovieDto.Duration.HasValue)
            movie.Duration = updateMovieDto.Duration;
        
        if (updateMovieDto.Rating.HasValue)
            movie.Rating = updateMovieDto.Rating;
        
        if (updateMovieDto.Description != null)
            movie.Description = updateMovieDto.Description;
        
        if (updateMovieDto.PosterUrl != null)
            movie.PosterUrl = updateMovieDto.PosterUrl;

        movie.UpdatedAt = DateTime.UtcNow;

        await context.SaveChangesAsync();

        var movieResponse = new MovieResponseDto
        {
            Id = movie.Id,
            Title = movie.Title,
            Director = movie.Director,
            Genre = movie.Genre,
            ReleaseDate = movie.ReleaseDate,
            Duration = movie.Duration,
            Rating = movie.Rating,
            Description = movie.Description,
            PosterUrl = movie.PosterUrl,
            CreatedAt = movie.CreatedAt,
            UpdatedAt = movie.UpdatedAt
        };

        return Results.Ok(movieResponse);
    }
    catch (Exception ex)
    {
        return Results.Problem($"Error updating movie: {ex.Message}");
    }
})
.WithName("UpdateMovie")
.WithOpenApi();

// Delete movie
app.MapDelete("/api/movies/{id}", async (int id, MovieDbContext context) =>
{
    try
    {
        var movie = await context.Movies.FindAsync(id);
        if (movie == null)
        {
            return Results.NotFound($"Movie with ID {id} not found");
        }

        context.Movies.Remove(movie);
        await context.SaveChangesAsync();

        return Results.NoContent();
    }
    catch (Exception ex)
    {
        return Results.Problem($"Error deleting movie: {ex.Message}");
    }
})
.WithName("DeleteMovie")
.WithOpenApi();

// Keep the original weather forecast endpoint for reference
var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
