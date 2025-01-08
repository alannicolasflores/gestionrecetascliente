import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchPedidoById, updatePedido } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import PedidoForm from '../components/PedidoForm';

const EditarPedidoPage = () => {
  const { id } = useParams(); // Obtiene el ID de la URL
  const navigate = useNavigate();

  // Fetch del pedido por ID
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['pedido', id],
    queryFn: () => fetchPedidoById(id),
  });

  // Mutación para actualizar pedido
  const mutation = useMutation({
    mutationFn: (updatedPedido) => updatePedido(id, updatedPedido),
    onSuccess: () => {
      alert('Pedido actualizado con éxito.');
      navigate('/pedidos'); // Redirige a la lista de pedidos
    },
    onError: (err) => {
      alert('Error al actualizar pedido: ' + err.message);
    },
  });

  const handleSubmit = (data) => {
    mutation.mutate(data); // Ejecuta la mutación con los datos actualizados
  };

  if (isLoading) return <p>Cargando datos del pedido...</p>;
  if (isError) return <p>Error al cargar el pedido: {error.message}</p>;

  return (
    <div className="container py-5">
      <h1 className="mb-4">Editar Pedido</h1>
      <PedidoForm onSubmit={handleSubmit} initialData={data} />

      {/* Enlace para cancelar y regresar */}
      <div className="mt-3">
        <button className="btn btn-link" onClick={() => navigate(-1)}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditarPedidoPage;
