# CRUSH.md - Sample .NET React Movie App

This document provides essential information for agents working on this movie CRUD application.

## Project Structure

```
sample-dotnet-react-app/
├── server/                 # .NET 8.0 Web API backend
│   ├── Program.cs         # Main application entry point
│   ├── server.csproj      # Project configuration
│   └── Properties/
│       └── launchSettings.json
├── app-ui/                # React TypeScript frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   └── ui/        # shadcn/ui components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   └── assets/        # Static assets
│   ├── package.json       # Dependencies and scripts
│   ├── vite.config.ts     # Vite configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── components.json    # shadcn/ui configuration
└── requirement.md         # Project requirements and description
```

## Project Type & Technology Stack

- **Backend**: .NET 8.0 Web API with minimal API approach
- **Frontend**: React 19.1.1 + TypeScript + Vite
- **UI Framework**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables
- **Package Manager**: PNPM (not npm/yarn)
- **Database**: PostgreSQL (planned but not implemented)
- **API Documentation**: Swagger/OpenAPI via Swashbuckle

## Frontend Commands
```bash
# From app-ui/ directory

# Install dependencies (PNPM - NOT npm/yarn)
pnpm install

# Start development server (connects to server on port 5080)
pnpm dev

# Build for production
pnpm build

# Run linting
pnpm lint

# Preview production build
pnpm preview
```

## Code Organization & Patterns

### Backend Patterns
- **Minimal API**: Uses `MapGet()`, `MapPost()` etc. for endpoint definition
- **Record Types**: Uses C# 9+ record types for DTOs (e.g., `WeatherForecast`)
- **Swagger Integration**: Auto-configured for development environment
- **Property Group Settings**: Nullable enabled, implicit usings enabled

### Frontend Patterns
- **Component Structure**: Uses compound component pattern with forwardRef
- **Variants Pattern**: Uses `class-variance-authority` for component variants
- **Utility-First CSS**: Tailwind classes with CSS custom properties
- **Path Aliasing**: `@/*` aliases configured to point to `src/*`
- **Component Organization**: 
  - `components/ui/` - Base shadcn/ui components
  - `components/` - Application-specific components
  - `hooks/` - Custom React hooks
  - `lib/` - Utility functions (utils.ts for cn() function)

## UI Component Architecture

### shadcn/ui Components
- **Base Pattern**: Each component exports both component and variants
- **ForwardRef**: Components use `React.forwardRef` for proper ref handling
- **Variant System**: Uses `class-variance-authority` for styling variants
- **Utility Function**: `cn()` function in `lib/utils.ts` combines `clsx` and `tailwind-merge`

### Component Example Pattern
```typescript
// button.tsx pattern
const buttonVariants = cva("base-classes", {
  variants: {
    variant: { default: "...", destructive: "..." },
    size: { default: "...", sm: "...", lg: "..." }
  },
  defaultVariants: { variant: "default", size: "default" }
})

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
```

## Styling System

### Tailwind Configuration
- **Base Color**: Slate color palette
- **CSS Variables**: Uses `hsl(var(--variable))` pattern for theming
- **Dark Mode**: Class-based dark mode configuration
- **Animations**: Custom keyframes for accordion animations
- **Plugins**: `tailwindcss-animate` for additional animations

### CSS Custom Properties
Components use CSS custom properties for theming:
```css
--primary: hsl(var(--primary))
--primary-foreground: hsl(var(--primary-foreground))
--secondary: hsl(var(--secondary))
--destructive: hsl(var(---destructive))
```

## Build Configuration

### Vite Configuration
- **React Plugin**: Uses `@vitejs/plugin-react`
- **Path Resolution**: Alias `@` → `./src`
- **Target**: ES2020+ for modern browser support

### TypeScript Configuration
- **Multiple Configs**: Separate configs for app and node environments
- **Path Mapping**: `@/*` aliases configured in tsconfig
- **React Compiler**: Not enabled (performance considerations)

## Development State

### Implementation Status

#### Backend (.NET) - COMPLETED ✅
- [x] **Movie Entity Model**: Complete Movie class with validation attributes
- [x] **Database Integration**: Entity Framework Core with SQLite/PostgreSQL support
- [x] **CRUD API Endpoints**: Full movie management API (`/api/movies`)
- [x] **Sample Data**: 5 pre-loaded movies (Shawshank, Godfather, Dark Knight, Pulp Fiction, LOTR)
- [x] **CORS Configuration**: Enabled for React frontend communication
- [x] **Database Auto-Initialization**: SQLite database created automatically
- [x] **Validation & Error Handling**: Comprehensive input validation and error responses
- [x] **API Documentation**: Swagger/OpenAPI docs for all endpoints

#### Frontend (React) - COMPLETED ✅
- [x] **Complete Movie Management Interface**: Full-featured React app with CRUD operations
- [x] **Professional UI Components**: shadcn/ui with modern, responsive design
- [x] **Real-time Search & Filtering**: Search by title/director/genre, filter by genre
- [x] **Pagination System**: Navigate through large movie collections efficiently
- [x] **Form Validation**: Client-side validation with user-friendly error messages
- [x] **Loading States**: Skeleton screens and loading indicators
- [x] **Error Handling**: Toast notifications for user feedback
- [x] **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- [x] **Type Safety**: Complete TypeScript integration with backend types
- [x] **API Service Layer**: Robust API communication with error handling

### Frontend Architecture

#### Component Structure
```
src/components/movie/
├── MovieList.tsx          # Main movie management interface
├── MovieCard.tsx          # Individual movie display card
├── MovieForm.tsx          # Create/edit movie dialog form
└── index.ts              # Component exports

src/services/
└── movieApi.ts           # API communication layer

src/types/
└── movie.ts              # TypeScript type definitions
```

#### UI Features
- **Modern Card Design**: Beautiful movie cards with hover effects
- **Responsive Grid**: 1-4 columns based on screen size
- **Smart Search**: Real-time filtering across all movie fields
- **Genre Filtering**: Dropdown with dynamic genre list
- **Pagination**: Efficient navigation through large datasets
- **Loading States**: Skeleton screens for better UX
- **Empty States**: Helpful messages and call-to-action
- **Toast Notifications**: Success/error feedback
- **Form Validation**: Real-time validation with error messages
- **Confirmation Dialogs**: Safe delete operations

#### API Integration
- **Service Layer**: Dedicated `movieApi.ts` service
- **Type Safety**: Full TypeScript integration
- **Error Handling**: Comprehensive error handling with user feedback
- **CORS Ready**: Configured for cross-origin requests

### Current API Endpoints

#### Movie Management
- **GET `/api/movies`** - List movies with pagination and filtering
- **GET `/api/movies/{id}`** - Get single movie by ID
- **POST `/api/movies`** - Create new movie
- **PUT `/api/movies/{id}`** - Update existing movie
- **DELETE `/api/movies/{id}`** - Delete movie
- **GET `/api/movies/genres`** - Get all genres for filters

### Database Status
- **Development**: SQLite (`movies.db`) auto-created with sample data
- **Production**: PostgreSQL support configured in `appsettings.json`
- **Auto-Detection**: Database provider selected based on connection string
- **Sample Movies**: 5 classic films pre-loaded for testing

### Server Status
- **Port**: http://localhost:5093 (development)
- **Swagger**: Available at `/swagger` in development
- **Database**: Auto-created SQLite file with sample data

## Important Gotchas

### Package Manager
- **Use PNPM**: Don't use npm or yarn - this project specifically uses PNPM
- **Vite Override**: Vite version overridden in `pnpm.overrides` to use rolldown-vite

### Path Aliases
- **@ Alias**: Imports use `@/` prefix which resolves to `./src/`
- **Components**: Import as `@/components/ui/button`, not relative paths
- **Utils**: Import utility functions as `@/lib/utils`

### Development Environment
- **Swagger**: Only available in development environment (`app.Environment.IsDevelopment()`)
- **Hot Reload**: Backend requires restart for changes, frontend has HMR
- **CORS**: Not configured - will need setup for frontend-backend communication

### shadcn/ui Specific
- **Variant Pattern**: Components use `VariantProps<T>` pattern - consistent across all UI components
- **Class Merging**: Always use `cn()` utility to merge Tailwind classes
- **Component Composition**: Use `asChild` pattern with Radix Slot for composition

## Next Development Steps

Based on requirements, implement:
1. Movie entity models in .NET backend
2. PostgreSQL database integration with Entity Framework Core
3. CRUD API endpoints for movies
4. Movie-related React components and pages
5. API integration in frontend
6. CORS configuration for frontend-backend communication

## Testing & Quality

- **Linting**: ESLint configured with React-specific rules
- **TypeScript**: Strict type checking enabled
- **No Test Framework**: No Jest/Vitest or xUnit/NUnit setup found
- **No CI/CD**: No GitHub Actions or other CI/CD configuration

## API Documentation

- **Swagger UI**: Available at `/swagger` in development
- **OpenAPI Spec**: Auto-generated from minimal API endpoints
- **Endpoints**: Currently only weather forecast endpoint exists

---

*This documentation reflects the current state of the codebase. Update as the movie CRUD functionality is implemented.*

## Quick Start Guide

### 1. Start the Backend Server
```bash
cd server
dotnet run
```
Server runs on http://localhost:5093 with auto-created SQLite database.

### 2. Start the Frontend
```bash
cd app-ui
pnpm install
pnpm dev
```
Frontend runs on http://localhost:5174 and connects to the backend API.

### 3. Access the Application
- **Frontend**: http://localhost:5174
- **API Documentation**: http://localhost:5093/swagger
- **API Base**: http://localhost:5093/api

### 4. Test with Sample Data
The application comes pre-loaded with 5 classic movies ready to explore!