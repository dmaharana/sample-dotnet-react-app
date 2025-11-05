import { MovieList } from './components/movie';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <MovieList />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
