import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchPedidos, deletePedido } from '../services/api';
import { Link } from 'react-router-dom';

const PedidosPage = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['pedidos'],
    queryFn: fetchPedidos,
  });

  const mutation = useMutation({
    mutationFn: deletePedido, // Define la función que realiza la mutación
    onSuccess: () => {
      alert('Pedido eliminado con éxito.');
      refetch(); // Refresca la lista de pedidos
    },
    onError: (err) => {
      alert('Error al eliminar pedido: ' + err.message);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este pedido?')) {
      mutation.mutate(id); // Ejecuta la mutación con el ID del pedido
    }
  };

  if (isLoading) return <p>Cargando pedidos...</p>;
  if (isError) return <p>Error al cargar los pedidos: {error.message}</p>;

  const pedidos = data || [];

  return (
    <div className="container py-5">
      <h1 className="mb-4">Pedidos</h1>
      <Link to="/pedidos/crear" className="btn btn-primary mb-4">Crear Pedido</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.fecha}</td>
              <td>{pedido.estado}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDelete(pedido.id)}
                >
                  Eliminar
                </button>
                <Link to={`/pedidos/editar/${pedido.id}`} className="btn btn-warning btn-sm">
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PedidosPage;
