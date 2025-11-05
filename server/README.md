# Movie API Server

.NET 8.0 Web API backend for the Movie CRUD application.

## Prerequisites

- .NET 8.0 SDK
- PostgreSQL (for production) or SQLite (for development)

## Setup

### Development (SQLite)
1. Restore packages: `dotnet restore`
2. Run the application: `dotnet run`

The development server will automatically create and use a SQLite database (`movies.db`).

### Production (PostgreSQL)
1. Set up PostgreSQL database
2. Update connection string in `appsettings.json`:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Host=localhost;Database=MovieApp;Username=postgres;Password=your_password;Port=5432"
     }
   }
   ```
3. Restore packages: `dotnet restore`
4. Run migrations: `dotnet ef database update`
5. Run the application: `dotnet run`

## API Endpoints

### Movies
- `GET /api/movies` - Get all movies with pagination and filtering
- `GET /api/movies/{id}` - Get movie by ID
- `POST /api/movies` - Create new movie
- `PUT /api/movies/{id}` - Update existing movie
- `DELETE /api/movies/{id}` - Delete movie
- `GET /api/movies/genres` - Get all unique genres

### Parameters

#### GET /api/movies
- `search` (optional): Search in title, director, or genre
- `genre` (optional): Filter by specific genre
- `page` (optional): Page number (default: 1)
- `pageSize` (optional): Items per page (default: 10)

#### POST /api/movies
```json
{
  "title": "Movie Title",
  "director": "Director Name",
  "genre": "Genre",
  "releaseDate": "2023-01-01",
  "duration": 120,
  "rating": 8.5,
  "description": "Movie description",
  "posterUrl": "https://example.com/poster.jpg"
}
```

#### PUT /api/movies/{id}
```json
{
  "title": "Updated Title", // optional
  "director": "Updated Director", // optional
  "genre": "Updated Genre", // optional
  "releaseDate": "2023-01-01", // optional
  "duration": 150, // optional
  "rating": 9.0, // optional
  "description": "Updated description", // optional
  "posterUrl": "https://example.com/new-poster.jpg" // optional
}
```

## Response Format

### Success Response
```json
{
  "movies": [
    {
      "id": 1,
      "title": "Movie Title",
      "director": "Director Name",
      "genre": "Genre",
      "releaseDate": "2023-01-01",
      "duration": 120,
      "rating": 8.5,
      "description": "Movie description",
      "posterUrl": "https://example.com/poster.jpg",
      "createdAt": "2023-01-01T00:00:00Z",
      "updatedAt": "2023-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "totalCount": 25,
    "totalPages": 3,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

### Error Response
```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "Not Found",
  "status": 404,
  "detail": "Movie with ID 999 not found"
}
```

## Database Schema

### Movies Table
| Column | Type | Required | Constraints |
|--------|------|----------|-------------|
| Id | int | Yes | Primary Key, Auto-increment |
| Title | nvarchar(200) | Yes | Required |
| Director | nvarchar(100) | Yes | Required |
| Genre | nvarchar(50) | Yes | Required |
| ReleaseDate | date | Yes | Required |
| Duration | int | No | |
| Rating | decimal(3,1) | No | Range 0.0-10.0 |
| Description | nvarchar(max) | No | |
| PosterUrl | nvarchar(max) | No | URL format |
| CreatedAt | datetime2 | Yes | Default: UTC now |
| UpdatedAt | datetime2 | Yes | Default: UTC now |

## Sample Data

The application comes with 5 pre-loaded movies:
1. The Shawshank Redemption (1994)
2. The Godfather (1972) 
3. The Dark Knight (2008)
4. Pulp Fiction (1994)
5. The Lord of the Rings: The Fellowship of the Ring (2001)

## CORS Configuration

The API is configured to accept requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (React dev server)

## Swagger Documentation

When running in development mode, API documentation is available at:
- Swagger UI: `/swagger`
- OpenAPI Spec: `/swagger/v1/swagger.json`

## Development Commands

```bash
# Build the project
dotnet build

# Run the project
dotnet run

# Watch for changes and restart
dotnet watch run

# Run tests (when implemented)
dotnet test

# Clean build artifacts
dotnet clean

# Restore packages
dotnet restore

# Add new migration (Entity Framework Core)
dotnet ef migrations add MigrationName

# Update database with migrations
dotnet ef database update

# Remove last migration
dotnet ef migrations remove
```