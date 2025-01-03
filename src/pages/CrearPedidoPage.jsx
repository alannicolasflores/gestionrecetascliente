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
      <h1 className="mb-4">Crear Pedido</h1>
      <PedidoForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CrearPedidoPage;
