import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchPedidos, deletePedido } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import pedidoImage from '../imagenes/pedido.png'; // Imagen a la izquierda del título

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
      {/* Contenedor centrado para la imagen y el título */}
      <div className="d-flex justify-content-center align-items-center mb-4">
        <img
          src={pedidoImage}
          alt="Pedido Icon"
          style={{
            width: '200px', // Ajusta el tamaño de la imagen
            height: '200px',
            marginRight: '15px',
          }}
        />
        <h1
          className="text-info"
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '5rem', // Tamaño de fuente más grande
            textShadow: '3px 3px 10px rgba(0, 0, 0, 0.2)', // Sombra de texto
            fontWeight: 'bold',
          }}
        >
          Pedidos
        </h1>
      </div>

      {/* Enlace para volver a la página principal */}
      <div className="d-flex justify-content-start mb-4">
        <Link to="/" className="back-to-home d-flex align-items-center">
          <i className="bi bi-house-door me-2"></i>
          <span>Volver a la Página Principal</span>
        </Link>
      </div>

      {/* Enlace para crear un nuevo pedido */}
      <div className="d-flex justify-content-end mb-4">
        <Link to="/pedidos/crear" className="btn btn-lg btn-primary d-flex align-items-center transition-btn">
          <i className="bi bi-plus-circle me-2"></i> Crear Pedido
        </Link>
      </div>

      {/* Mostrar los pedidos */}
      <div className="row">
        {pedidos.length === 0 ? (
          <div className="col-12 text-center text-muted">
            <p>No hay pedidos disponibles</p>
          </div>
        ) : (
          pedidos.map((pedido) => (
            <div key={pedido.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div
                className="recipe-card shadow-lg border-0 rounded-lg overflow-hidden h-100 transition-card"
                style={{
                  backgroundColor: pedido.estado === 'Cancelado' ? 'gray' : 'white', // Fondo gris si el estado es "Cancelado"
                }}
              >
                <div className="card-body p-4">
                  <h5 className="card-title text-white">Pedido #{pedido.id}</h5>
                  <p className="card-text text-white">Fecha: {pedido.fecha}</p>
                  <p className="card-text text-white">Estado: {pedido.estado}</p>
                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-sm btn-warning transition-btn"
                      onClick={() => navigate(`/pedidos/editar/${pedido.id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger transition-btn"
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
