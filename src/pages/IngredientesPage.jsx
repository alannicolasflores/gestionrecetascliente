import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchIngredientes, deleteIngrediente } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const IngredientesPage = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['ingredientes'],
    queryFn: fetchIngredientes,
  });

  const mutation = useMutation({
    mutationFn: deleteIngrediente,
    onSuccess: () => {
      alert('Ingrediente eliminado con éxito.');
      refetch();
    },
    onError: (err) => {
      alert('Error al eliminar ingrediente: ' + err.message);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este ingrediente?')) {
      mutation.mutate(id);
    }
  };

  if (isLoading) return <p>Cargando ingredientes...</p>;
  if (isError) return <p>Error al cargar los ingredientes: {error.message}</p>;

  const ingredientes = data || [];

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 text-info">Ingredientes</h1>

      <div className="d-flex justify-content-start mb-4">
        <Link to="/" className="back-to-home d-flex align-items-center">
          <i className="bi bi-house-door me-2"></i>
          <span>Volver a la Página Principal</span>
        </Link>
      </div>

      <div className="d-flex justify-content-end mb-4">
        <Link to="/ingredientes/crear" className="btn btn-lg btn-primary d-flex align-items-center">
          <i className="bi bi-plus-circle me-2"></i> Crear Ingrediente
        </Link>
      </div>

      <div className="row">
        {ingredientes.length === 0 ? (
          <div className="col-12 text-center text-muted">
            <p>No hay ingredientes disponibles</p>
          </div>
        ) : (
          ingredientes.map((ingrediente) => (
            <div key={ingrediente.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="recipe-card shadow-lg border-0 rounded-lg overflow-hidden h-100">
                <div className="card-body p-4">
                  <h5 className="card-title">{ingrediente.nombre}</h5>
                  <p className="card-text">Cantidad: {ingrediente.cantidad}</p>
                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => navigate(`/ingredientes/editar/${ingrediente.id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(ingrediente.id)}
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

export default IngredientesPage;
