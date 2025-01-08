import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchIngredientes, deleteIngrediente } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import ingredientesImage from '../imagenes/ingredientes.png'; // Imagen de los ingredientes

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
      {/* Imagen principal con título superpuesto */}
      <div className="position-relative text-center mb-5">
        <img
          src={ingredientesImage}
          alt="Ingredientes"
          className="img-fluid rounded shadow"
          style={{
            width: '100%', // Se ajusta al 100% del contenedor
            maxWidth: '1000px', // Se puede modificar el valor para hacerla más ancha
            height: '300px', // Mantener la relación de aspecto
          }}
        />
        <h1
          className="position-absolute text-white"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 'clamp(2.5rem, 5vw, 5rem)', // Tamaño adaptable
            fontWeight: 'bold',
            textShadow: '3px 3px 8px rgba(0, 0, 0, 0.7)',
          }}
        >
          Ingredientes
        </h1>
      </div>

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
                  <p className="card-text" style={{ color: 'white' }}>
                    Cantidad: {ingrediente.cantidad}
                  </p>
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
