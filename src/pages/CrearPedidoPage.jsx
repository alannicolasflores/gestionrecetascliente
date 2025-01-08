import { useMutation } from '@tanstack/react-query';
import { createPedido } from '../services/api';
import { useNavigate } from 'react-router-dom';
import PedidoForm from '../components/PedidoForm';
import fondoImage from '../imagenes/fondo3.png'; // Ruta de la imagen

const CrearPedidoPage = () => {
  const navigate = useNavigate();

  // Configuración de la mutación
  const mutation = useMutation({
    mutationFn: createPedido, // Función para crear un pedido
    onSuccess: () => {
      alert('Pedido creado con éxito.');
      navigate('/pedidos'); // Redirige a la lista de pedidos
    },
    onError: (err) => {
      alert('Error al crear pedido: ' + err.message);
    },
  });

  const handleSubmit = (data) => {
    mutation.mutate(data); // Ejecuta la mutación con los datos del formulario
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        position: 'relative',
        backgroundImage: `url(${fondoImage})`,
        backgroundSize: '100% 120%', // Ajusta el ancho y alto de la imagen (100% del ancho y 100% del alto)
        backgroundPosition: 'center', // Centra la imagen
        minHeight: '100vh', // Hace que el fondo cubra toda la altura de la pantalla
      }}
    >
      {/* Overlay oscuro para mejorar la legibilidad */}
    

      <div
        className="container d-flex justify-content-center align-items-center"
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
        }}
      >
        <div
          className="card shadow-lg border-0 rounded-lg w-100"
          style={{ maxWidth: '600px' }}
        >
          <h1 className="text-center mb-4 text-info">Crear Pedido</h1>

          {/* Enlace para regresar a la página anterior */}
          <div className="d-flex justify-content-start mb-4">
            <button 
              className="back-to-home d-flex align-items-center btn btn-link"
              onClick={() => navigate(-1)} // Regresar a la página anterior
            >
              <i className="bi bi-arrow-left me-2"></i>
              <span>Volver a la Página Anterior</span>
            </button>
          </div>

          {/* Formulario de creación de pedido */}
          <div
            className="card-body p-4"
            style={{ backgroundColor: 'white', borderRadius: '10px' }}
          >
            <PedidoForm onSubmit={handleSubmit} />

            {/* Estado de la mutación */}
            {mutation.isLoading && (
              <div className="alert alert-info mt-4 fade show" role="alert">
                <strong>Creando pedido...</strong>
              </div>
            )}
            {mutation.isError && (
              <div className="alert alert-danger mt-4 fade show" role="alert">
                <strong>Error:</strong> Hubo un error al crear el pedido: {mutation.error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearPedidoPage;
