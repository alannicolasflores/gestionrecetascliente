import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container py-5 text-center">
      <h1 className="text-success mb-4">Gestión de Restaurante</h1>

      {/* Menú de navegación */}
      <div className="list-group">
        <Link to="/recetas" className="list-group-item list-group-item-action list-group-item-success mb-2">
          <i className="bi bi-book me-2"></i> Recetas
        </Link>
        <Link to="/proveedores" className="list-group-item list-group-item-action list-group-item-primary mb-2">
          <i className="bi bi-person-circle me-2"></i> Proveedores
        </Link>
        <Link to="/pedidos" className="list-group-item list-group-item-action list-group-item-warning mb-2">
          <i className="bi bi-cart me-2"></i> Pedidos
        </Link>
        <Link to="/menus" className="list-group-item list-group-item-action list-group-item-info mb-2">
          <i className="bi bi-list-ul me-2"></i> Menús
        </Link>
        <Link to="/ingredientes" className="list-group-item list-group-item-action list-group-item-danger mb-2">
          <i className="bi bi-box me-2"></i> Ingredientes
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
