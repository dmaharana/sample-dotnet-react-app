# Movie CRUD Application Requirements

## Overview

Create a sample CRUD (Create, Read, Update, Delete) application with a user interface for managing movie data. This is a full-stack application demonstrating modern web development practices with .NET Core backend and React frontend.

## Technical Stack

### Backend
- **Framework**: .NET 8.0 Web API
- **API Style**: Minimal API with endpoint routing
- **Database**: PostgreSQL
- **ORM**: Entity Framework Core (to be implemented)
- **API Documentation**: Swagger/OpenAPI integration

### Frontend
- **Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite
- **UI Library**: shadcn/ui components (built on Radix UI)
- **Styling**: Tailwind CSS
- **Package Manager**: PNPM

## Project Structure

```
sample-dotnet-react-app/
├── server/                 # .NET 8.0 Web API backend
├── app-ui/                 # React TypeScript frontend
└── requirement.md          # This requirements document
```

## Core Features

### Movie Management
The application should provide complete CRUD functionality for movie data:

#### Movie Entity
- **Title** (string, required)
- **Director** (string, required)
- **Genre** (string, required)
- **Release Date** (date, required)
- **Duration** (integer, minutes)
- **Rating** (decimal, 0.0-10.0)
- **Description** (text, optional)
- **Poster URL** (string, optional)

#### CRUD Operations
1. **Create**: Add new movies to the database
2. **Read**: 
   - List all movies with pagination and search
   - View individual movie details
3. **Update**: Edit existing movie information
4. **Delete**: Remove movies from the database

### User Interface Requirements

#### Movie List Page
- Display movies in a responsive grid or table layout
- Search functionality by title, director, or genre
- Filter by genre or release year
- Pagination for large datasets
- Sort by title, release date, or rating

#### Movie Detail Page
- Display all movie information
- Edit functionality with form validation
- Delete confirmation dialog
- Back to list navigation

#### Movie Form
- Validation for required fields
- Date picker for release date
- Numeric inputs for duration and rating
- Image URL validation for poster

## Implementation Status

### Completed ✅
- [x] Basic .NET 8.0 Web API template with weather forecast endpoint
- [x] React + Vite + TypeScript frontend template
- [x] shadcn/ui component library setup
- [x] Tailwind CSS configuration
- [x] Swagger/OpenAPI documentation setup
- [x] PNPM package manager configuration

### To Be Implemented 🔄

#### Backend Development
- [ ] Entity Framework Core setup with PostgreSQL
- [ ] Movie entity model creation
- [ ] Database context and migrations
- [ ] Movie CRUD API endpoints
- [ ] Data validation and error handling
- [ ] CORS configuration for frontend communication

#### Frontend Development
- [ ] Movie data types and interfaces
- [ ] API service layer for backend communication
- [ ] Movie list component with search and pagination
- [ ] Movie detail component
- [ ] Movie form component (create/edit)
- [ ] Loading states and error handling
- [ ] Responsive design implementation

#### Integration
- [ ] Frontend-backend API integration
- [ ] Database seeding with sample movie data
- [ ] End-to-end testing of CRUD operations

## Quality Requirements

### Code Quality
- TypeScript strict mode enabled
- ESLint configuration with React rules
- Proper error handling and validation
- Consistent code formatting

### User Experience
- Responsive design for mobile and desktop
- Loading indicators during API calls
- Form validation with user-friendly messages
- Confirmation dialogs for destructive actions

### Performance
- Optimized database queries with pagination
- Efficient component rendering
- Proper state management
- Image optimization for movie posters

## Success Criteria

1. **Functionality**: All CRUD operations work correctly
2. **Data Persistence**: Movie data persists in PostgreSQL database
3. **User Interface**: Clean, responsive interface using shadcn/ui components
4. **API Integration**: Seamless communication between frontend and backend
5. **Code Quality**: Well-structured, type-safe code with proper error handling

## Notes

- The server folder contains a working .NET webapp template
- The app-ui folder contains a template React project with shadcn/ui setup
- PostgreSQL database setup and connection string configuration required
- Consider adding authentication/authorization for production use
- Movie poster images can use placeholder URLs or implement file upload later

---

*Last Updated: Current development state as of repository analysis*
