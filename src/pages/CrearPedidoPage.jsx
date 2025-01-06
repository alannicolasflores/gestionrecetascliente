import { useMutation } from '@tanstack/react-query';
import { createPedido } from '../services/api';
import { useNavigate } from 'react-router-dom';
import PedidoForm from '../components/PedidoForm';

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
    <div className="container py-5">
      <h1 className="mb-4 text-info">Crear Pedido</h1>

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
      <PedidoForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CrearPedidoPage;
