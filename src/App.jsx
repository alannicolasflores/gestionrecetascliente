import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecetasPage from './pages/RecetasPage';
import CrearRecetaPage from './pages/CrearRecetaPage';
import EditarRecetaPage from './pages/EditarRecetaPage';
import ProveedoresPage from './pages/ProveedoresPage';
import CrearProveedorPage from './pages/CrearProveedorPage';
import EditarProveedorPage from './pages/EditarProveedorPage';
import PedidosPage from './pages/PedidosPage';
import CrearPedidoPage from './pages/CrearPedidoPage';
import EditarPedidoPage from './pages/EditarPedidoPage';

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
          <Route path="/recetas/editar/:id" element={<EditarRecetaPage />} />
          <Route path="/proveedores" element={<ProveedoresPage />} />
          <Route path="/proveedores/crear" element={<CrearProveedorPage />} />
          <Route path="/proveedores/editar/:id" element={<EditarProveedorPage />} />
          <Route path="/pedidos" element={<PedidosPage />} />
          <Route path="/pedidos/crear" element={<CrearPedidoPage />} />
          <Route path="/pedidos/editar/:id" element={<EditarPedidoPage />} />

        </Routes>
      </main>
    </div>
  );
};

export default App;
