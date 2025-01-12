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
import MenusPage from './pages/MenusPage';
import CrearMenuPage from './pages/CrearMenuPage';
import EditarMenuPage from './pages/EditarMenuPage';
import IngredientesPage from './pages/IngredientesPage';
import CrearIngredientePage from './pages/CrearIngredientePage';
import EditarIngredientePage from './pages/EditarIngredientePage';

const App = () => {
  return (
    <div className="container py-5">
      <header className="text-center mb-4"></header>
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
          <Route path="/menus" element={<MenusPage />} />
          <Route path="/menus/crear" element={<CrearMenuPage />} />
          <Route path="/menus/editar/:id" element={<EditarMenuPage />} />
          <Route path="/ingredientes" element={<IngredientesPage />} />
          <Route path="/ingredientes/crear" element={<CrearIngredientePage />} />
          <Route path="/ingredientes/editar/:id" element={<EditarIngredientePage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
