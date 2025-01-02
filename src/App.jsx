import { Routes, Route } from 'react-router-dom';
import RecetasPage from './pages/RecetasPage';
import CrearRecetaPage from './pages/CrearRecetaPage';

const App = () => {
  return (
    <div>
      <header>
        <h1>Gestión de Recetas</h1>
      </header>
      <main>
        <Routes>
          <Route path="/recetas" element={<RecetasPage />} />
          <Route path="/recetas/crear" element={<CrearRecetaPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
