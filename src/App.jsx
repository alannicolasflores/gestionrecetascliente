import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecetasPage from './pages/RecetasPage';
import CrearRecetaPage from './pages/CrearRecetaPage';

const App = () => {
  return (
    <div className="container py-5">
      <header className="text-center mb-4">
      </header>
      <main>
        <Routes>
          {/* Página principal Home */}
          <Route path="/" element={<HomePage />} />
          
          {/* Otras páginas */}
          <Route path="/recetas" element={<RecetasPage />} />
          <Route path="/recetas/crear" element={<CrearRecetaPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
