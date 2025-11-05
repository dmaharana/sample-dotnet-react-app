# Movie UI - React Frontend

A production-ready React TypeScript frontend for the Movie CRUD application, built with Vite, shadcn/ui, and Tailwind CSS.

## 🚀 Features

- **Modern React Architecture**: Built with React 19.1.1 and TypeScript for type safety
- **Beautiful UI Components**: shadcn/ui components with Radix UI primitives
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Search**: Search movies by title, director, or genre
- **Genre Filtering**: Filter movies by specific genres
- **Pagination**: Navigate through large movie collections efficiently
- **CRUD Operations**: Create, read, update, and delete movies
- **Loading States**: Skeleton screens and loading indicators
- **Error Handling**: Toast notifications for user feedback
- **Form Validation**: Client-side validation with user-friendly error messages

## 🛠️ Technology Stack

- **Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite with rolldown-vite
- **UI Library**: shadcn/ui (built on Radix UI)
- **Styling**: Tailwind CSS with CSS custom properties
- **Icons**: Lucide React
- **Package Manager**: PNPM
- **HTTP Client**: Native fetch API
- **State Management**: React hooks (useState, useEffect)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui base components
│   └── movie/              # Movie-specific components
│       ├── MovieCard.tsx   # Individual movie display card
│       ├── MovieList.tsx   # Main movie list with search/filter
│       ├── MovieForm.tsx   # Create/edit movie form
│       └── index.ts        # Component exports
├── services/
│   └── movieApi.ts         # API service layer
├── types/
│   └── movie.ts            # TypeScript type definitions
├── hooks/
│   └── use-toast.ts        # Toast notification hook
├── lib/
│   └── utils.ts            # Utility functions (cn, etc.)
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
└── index.css              # Global styles and Tailwind CSS
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ 
- PNPM package manager
- .NET 8.0 server running (port 5080)

### Installation

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Start development server**:
   ```bash
   pnpm dev
   ```

3. **Open your browser**:
   Navigate to `http://localhost:5174`

## 🖥️ Available Scripts

```bash
# Start development server with hot reload
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run linting
pnpm lint
```

## 🎯 Key Components

### MovieList
The main component that displays all movies with:
- **Search functionality**: Real-time search across title, director, and genre
- **Genre filtering**: Dropdown to filter by specific genres
- **Pagination**: Navigate through movie pages (12 items per page)
- **Loading states**: Skeleton screens while fetching data
- **Empty states**: Helpful messages when no movies are found

### MovieCard
Individual movie display cards featuring:
- **Poster display**: Shows movie poster with fallback to emoji
- **Movie metadata**: Title, director, genre, release date, duration, rating
- **Quick actions**: Edit and delete options in dropdown menu
- **Hover effects**: Smooth transitions and card elevation
- **Responsive layout**: Adapts to different screen sizes

### MovieForm
Comprehensive form for creating and editing movies:
- **Form validation**: Client-side validation with error messages
- **Required fields**: Title, Director, Genre, Release Date
- **Optional fields**: Duration, Rating, Description, Poster URL
- **Rating validation**: Ensures rating is between 0.0 and 10.0
- **URL validation**: Validates poster URL format
- **Genre management**: Dropdown with existing genres plus custom input

## 🔌 API Integration

The frontend communicates with the .NET backend through a dedicated API service layer:

### Service Layer (`services/movieApi.ts`)
- **Error handling**: Comprehensive error handling with user-friendly messages
- **Type safety**: Full TypeScript integration with backend DTOs
- **Request/Response handling**: Automatic JSON serialization
- **CORS configuration**: Properly configured for cross-origin requests

### API Endpoints Used
- `GET /api/movies` - List movies with pagination and filtering
- `GET /api/movies/{id}` - Get single movie details
- `POST /api/movies` - Create new movie
- `PUT /api/movies/{id}` - Update existing movie
- `DELETE /api/movies/{id}` - Delete movie
- `GET /api/movies/genres` - Get all unique genres

## 🎨 UI/UX Features

### Design System
- **shadcn/ui**: Consistent, accessible component library
- **Tailwind CSS**: Utility-first styling with custom design tokens
- **Dark mode ready**: CSS custom properties for easy theming
- **Responsive design**: Mobile-first approach with breakpoint utilities

### User Experience
- **Loading states**: Skeleton screens and spinners for better perceived performance
- **Error handling**: Toast notifications with appropriate styling
- **Empty states**: Helpful guidance when no data is available
- **Form feedback**: Real-time validation with clear error messages
- **Confirmation dialogs**: Safe delete operations with confirmation

### Accessibility
- **ARIA labels**: Proper accessibility attributes
- **Keyboard navigation**: Full keyboard support for all interactions
- **Screen reader friendly**: Semantic HTML and proper labeling
- **Color contrast**: WCAG compliant color schemes

## 📱 Responsive Design

The interface is fully responsive and works on:
- **Mobile phones** (320px+)
- **Tablets** (768px+)
- **Laptops** (1024px+)
- **Desktops** (1280px+)

### Layout Adaptations
- **Mobile**: Single column layout, touch-friendly interactions
- **Tablet**: 2-column grid for movie cards
- **Desktop**: 3-4 column grid depending on screen size
- **Large screens**: Optimal spacing and typography scaling

## 🚀 Performance Features

- **Code splitting**: Automatic code splitting with Vite
- **Tree shaking**: Unused code elimination
- **Asset optimization**: Optimized images and fonts
- **Lazy loading**: Components loaded on demand
- **Memoization**: React.memo and useMemo for expensive operations

## 🔧 Development Features

- **Hot Module Replacement**: Instant updates during development
- **TypeScript**: Full type safety and IntelliSense
- **ESLint**: Code quality and consistency rules
- **Path aliases**: Clean imports with `@/` prefix
- **Development tools**: React DevTools integration

## 🌐 Deployment

### Build for Production
```bash
pnpm build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build
```bash
pnpm preview
```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the .NET server is running and CORS is configured
2. **API Connection Failed**: Check that the server is running on the correct port (5080)
3. **Build Errors**: Run `pnpm install` to ensure all dependencies are installed
4. **Port Already in Use**: Vite will automatically use the next available port

### Development Tips
- Check browser console for detailed error messages
- Use React DevTools for component debugging
- Monitor network tab for API request/response details
- Test on different screen sizes using browser dev tools

## 📋 Future Enhancements

Potential improvements for the frontend:
- **Advanced filtering**: Year range, rating range, duration filters
- **Sorting options**: Sort by title, release date, rating, duration
- **Movie details view**: Full movie information display
- **Image upload**: Direct image upload instead of URL
- **Favorites system**: Mark movies as favorites
- **Watchlist**: Personal watchlist functionality
- **Bulk operations**: Select and delete multiple movies
- **Export/Import**: Data export and import features

---

*Built with ❤️ using React, TypeScript, and shadcn/ui*