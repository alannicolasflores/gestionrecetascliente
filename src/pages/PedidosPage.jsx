import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchPedidos, deletePedido } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const PedidosPage = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['pedidos'],
    queryFn: fetchPedidos,
  });

  const mutation = useMutation({
    mutationFn: deletePedido,
    onSuccess: () => {
      alert('Pedido eliminado con éxito.');
      refetch();
    },
    onError: (err) => {
      alert('Error al eliminar pedido: ' + err.message);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este pedido?')) {
      mutation.mutate(id);
    }
  };

  if (isLoading) return <p>Cargando pedidos...</p>;
  if (isError) return <p>Error al cargar los pedidos: {error.message}</p>;

  const pedidos = data || [];

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 text-info">Pedidos</h1>

      <div className="d-flex justify-content-start mb-4">
        <Link to="/" className="back-to-home d-flex align-items-center">
          <i className="bi bi-house-door me-2"></i>
          <span>Volver a la Página Principal</span>
        </Link>
      </div>

      <div className="d-flex justify-content-end mb-4">
        <Link to="/pedidos/crear" className="btn btn-lg btn-primary d-flex align-items-center">
          <i className="bi bi-plus-circle me-2"></i> Crear Pedido
        </Link>
      </div>

      <div className="row">
        {pedidos.length === 0 ? (
          <div className="col-12 text-center text-muted">
            <p>No hay pedidos disponibles</p>
          </div>
        ) : (
          pedidos.map((pedido) => (
            <div key={pedido.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="recipe-card shadow-lg border-0 rounded-lg overflow-hidden h-100">
                <div className="card-body p-4">
                  <h5 className="card-title">Pedido #{pedido.id}</h5>
                  <p className="card-text">Fecha: {pedido.fecha}</p>
                  <p className="card-text">Estado: {pedido.estado}</p>
                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => navigate(`/pedidos/editar/${pedido.id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(pedido.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PedidosPage;
