import { Link } from 'react-router-dom';
import img1 from '../imagenes/img1.png';  // Importar la imagen desde la carpeta src/imagenes
import 'animate.css';  // Importar Animate.css para usar las animaciones

const HomePage = () => {
  return (
    <div className="container py-5 text-center">
      {/* Imagen de fondo */}
      <img
        src={img1}
        alt="Restaurante"
        className="img-fluid rounded-circle mb-4 animate__animated animate__fadeIn"
        style={{ maxWidth: '350px' }}
      />

      {/* Título sin tarjeta */}
      <h1 className="text-center text-success animate__animated animate__fadeIn" style={{ fontSize: '3rem', fontWeight: 'bold' }}>
        Gestión de Restaurante
      </h1>

      {/* Menú de navegación */}
      <div className="list-group">
        <Link
          to="/recetas"
          className="list-group-item list-group-item-action list-group-item-success mb-2 animate__animated animate__fadeIn animate__delay-1s shadow-lg"
          style={{ borderRadius: '10px' }}
        >
          <i className="bi bi-book me-2"></i> Recetas
        </Link>
        <Link
          to="/proveedores"
          className="list-group-item list-group-item-action list-group-item-primary mb-2 animate__animated animate__fadeIn animate__delay-1s shadow-lg"
          style={{ borderRadius: '10px' }}
        >
          <i className="bi bi-person-circle me-2"></i> Proveedores
        </Link>
        <Link
          to="/pedidos"
          className="list-group-item list-group-item-action list-group-item-warning mb-2 animate__animated animate__fadeIn animate__delay-1s shadow-lg"
          style={{ borderRadius: '10px' }}
        >
          <i className="bi bi-cart me-2"></i> Pedidos
        </Link>
        <Link
          to="/menus"
          className="list-group-item list-group-item-action list-group-item-info mb-2 animate__animated animate__fadeIn animate__delay-1s shadow-lg"
          style={{ borderRadius: '10px' }}
        >
          <i className="bi bi-list-ul me-2"></i> Menús
        </Link>
        <Link
          to="/ingredientes"
          className="list-group-item list-group-item-action list-group-item-danger mb-2 animate__animated animate__fadeIn animate__delay-1s shadow-lg"
          style={{ borderRadius: '10px' }}
        >
          <i className="bi bi-box me-2"></i> Ingredientes
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
