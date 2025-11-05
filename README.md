# 🎬 Movie CRUD Application

A modern, full-stack movie management application built with .NET 8.0 backend and React 19.1.1 frontend.

![Movie App Demo](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![.NET](https://img.shields.io/badge/.NET-8.0-blue)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)

## 🌟 Features

### Backend (.NET 8.0)
- ✅ **Complete CRUD API** - Full movie management with REST endpoints
- ✅ **Entity Framework Core** - SQLite (dev) + PostgreSQL (prod) support
- ✅ **Automatic Database** - SQLite database created with sample data
- ✅ **API Documentation** - Swagger/OpenAPI integration
- ✅ **CORS Configuration** - Ready for frontend integration
- ✅ **Data Validation** - Comprehensive input validation
- ✅ **Error Handling** - Proper HTTP status codes and error responses

### Frontend (React + TypeScript)
- ✅ **Modern UI** - shadcn/ui components with Tailwind CSS
- ✅ **Responsive Design** - Works on mobile, tablet, and desktop
- ✅ **Real-time Search** - Search by title, director, or genre
- ✅ **Genre Filtering** - Filter movies by specific genres
- ✅ **Pagination** - Navigate through large collections efficiently
- ✅ **Form Validation** - Client-side validation with user feedback
- ✅ **Loading States** - Skeleton screens and loading indicators
- ✅ **Error Handling** - Toast notifications for user feedback
- ✅ **Type Safety** - Full TypeScript integration

## 🚀 Quick Start

### Prerequisites
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/)
- [PNPM](https://pnpm.io/) package manager

### 1. Clone and Setup
```bash
git clone <repository-url>
cd sample-dotnet-react-app
```

### 2. Start Backend Server
```bash
cd server
dotnet restore
dotnet run
```
**Server runs on**: http://localhost:5093  
**Swagger API docs**: http://localhost:5093/swagger

### 3. Start Frontend Application
```bash
cd app-ui
pnpm install
pnpm dev
```
**Frontend runs on**: http://localhost:5174

### 4. Open in Browser
Navigate to **http://localhost:5174** to start managing movies!

## 📊 Sample Data

The application comes pre-loaded with 5 classic movies:
1. **The Shawshank Redemption** (1994) - Drama, 9.3★
2. **The Godfather** (1972) - Crime, 9.2★
3. **The Dark Knight** (2008) - Action, 9.0★
4. **Pulp Fiction** (1994) - Crime, 8.9★
5. **The Lord of the Rings: The Fellowship of the Ring** (2001) - Adventure, 8.8★

## 🛠️ Technology Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| .NET | 8.0 | Web API framework |
| Entity Framework Core | 8.0.6 | ORM and database abstraction |
| PostgreSQL | 8.0.4 | Production database provider |
| SQLite | 8.0.6 | Development database |
| Swagger | 6.4.0 | API documentation |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.1.1 | UI framework |
| TypeScript | 5.9.3 | Type safety |
| Vite | 7.1.14 | Build tool |
| Tailwind CSS | 3.4.1 | Styling |
| shadcn/ui | Latest | Component library |
| Lucide React | 0.552.0 | Icons |

## 🏗️ Project Structure

```
sample-dotnet-react-app/
├── server/                 # .NET 8.0 Backend
│   ├── Data/              # Entity Framework DbContext
│   ├── DTOs/              # Data transfer objects
│   ├── Models/            # Entity models
│   ├── Program.cs         # API endpoints and configuration
│   └── README.md          # Backend documentation
├── app-ui/                # React Frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── movie/     # Movie-specific components
│   │   │   └── ui/        # shadcn/ui base components
│   │   ├── services/      # API service layer
│   │   ├── types/         # TypeScript definitions
│   │   └── hooks/         # Custom React hooks
│   └── README.md          # Frontend documentation
├── CRUSH.md               # Developer documentation
└── requirement.md         # Project requirements
```

## 🎯 API Endpoints

### Movie Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/movies` | List movies with pagination and filtering |
| GET | `/api/movies/{id}` | Get single movie by ID |
| POST | `/api/movies` | Create new movie |
| PUT | `/api/movies/{id}` | Update existing movie |
| DELETE | `/api/movies/{id}` | Delete movie |
| GET | `/api/movies/genres` | Get all unique genres |

### Query Parameters
- `search` - Search in title, director, or genre
- `genre` - Filter by specific genre
- `page` - Page number (default: 1)
- `pageSize` - Items per page (default: 10)

## 🎨 UI Features

### Movie List
- **Responsive Grid**: 1-4 columns based on screen size
- **Real-time Search**: Instant filtering as you type
- **Genre Filter**: Dropdown with all available genres
- **Pagination**: Navigate through large collections
- **Loading States**: Skeleton screens while loading
- **Empty States**: Helpful messages when no results found

### Movie Cards
- **Beautiful Design**: Modern card layout with hover effects
- **Movie Metadata**: Title, director, genre, release date, rating
- **Poster Display**: Shows movie poster with fallback to emoji
- **Quick Actions**: Edit and delete options
- **Rating Display**: Star rating with numerical value

### Movie Form
- **Create/Edit Mode**: Unified form for both operations
- **Field Validation**: Real-time validation with error messages
- **Required Fields**: Title, Director, Genre, Release Date
- **Optional Fields**: Duration, Rating, Description, Poster URL
- **Smart Controls**: Date picker, number inputs, URL validation

## 📱 Responsive Design

The application is fully responsive and works on:
- **📱 Mobile** (320px+) - Single column, touch-friendly
- **📱 Tablet** (768px+) - Two-column layout
- **💻 Laptop** (1024px+) - Three-column layout
- **🖥️ Desktop** (1280px+) - Four-column layout

## 🔧 Development

### Backend Development
```bash
cd server

# Install packages
dotnet restore

# Build project
dotnet build

# Run with hot reload
dotnet watch run

# Run migrations (when using PostgreSQL)
dotnet ef migrations add MigrationName
dotnet ef database update
```

### Frontend Development
```bash
cd app-ui

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run linting
pnpm lint

# Preview production build
pnpm preview
```

## 🗄️ Database

### Development (SQLite)
- **Auto-created**: Database file created automatically on first run
- **Sample Data**: 5 pre-loaded movies for testing
- **File Location**: `server/movies.db`

### Production (PostgreSQL)
- **Configuration**: Update connection string in `appsettings.json`
- **Migrations**: Use Entity Framework migrations
- **Connection String**: 
  ```json
  {
    "ConnectionStrings": {
      "DefaultConnection": "Host=localhost;Database=MovieApp;Username=postgres;Password=your_password"
    }
  }
  ```

## 🚀 Deployment

### Backend Deployment
1. Update connection string for production database
2. Build: `dotnet publish -c Release`
3. Deploy to your preferred hosting platform

### Frontend Deployment
1. Update API base URL in `src/services/movieApi.ts`
2. Build: `pnpm build`
3. Deploy `dist/` folder to static hosting

## 🧪 Testing

### Manual Testing
1. **Start both servers** (backend on 5080, frontend on 5174)
2. **Test CRUD operations**:
   - Create new movies with the form
   - Search and filter existing movies
   - Edit movie information
   - Delete movies (with confirmation)
3. **Test responsive design** on different screen sizes
4. **Check API documentation** at `/swagger`

### Sample Test Data
Use the pre-loaded movies to test all functionality:
- Search for "Dark Knight"
- Filter by "Crime" genre
- Navigate through pagination
- Edit and update movie information

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Radix UI** for accessible UI primitives
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the comprehensive icon set
- **.NET Team** for the excellent web framework

## 📞 Support

For questions and support:
- **Check documentation**: Read the detailed READMEs in `server/` and `app-ui/`
- **API Documentation**: Visit `/swagger` when server is running
- **Issues**: Open an issue on the repository

---

**Built with ❤️ using modern web technologies**