import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchRecetas, deleteReceta } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import recetaImg from '../imagenes/image.png'; // Importar la imagen principal

const RecetasPage = () => {
  const navigate = useNavigate();

  // Fetch de recetas
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['recetas'],
    queryFn: fetchRecetas,
  });

  // Mutación para eliminar receta
  const mutation = useMutation({
    mutationFn: deleteReceta,
    onSuccess: () => {
      alert('Receta eliminada con éxito.');
      refetch(); // Refresca la lista de recetas
    },
    onError: (error) => {
      alert('Hubo un problema al eliminar la receta: ' + error.message);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta receta?')) {
      mutation.mutate(id); // Ejecuta la mutación de eliminar
    }
  };

  if (isLoading) return <p>Cargando recetas...</p>;
  if (isError) return <p>Error al cargar las recetas: {error.message}</p>;

  const recetas = data || [];

  return (
    <div
      className="container py-5"
      style={{
        background: 'url("https://www.toptal.com/designers/subtlepatterns/patterns/figured_paper.png")',
        backgroundSize: 'cover',
        padding: '60px 0',
      }}
    >
      {/* Imagen principal con título superpuesto */}
      <div className="position-relative text-center mb-5">
        <img
          src={recetaImg}
          alt="Recetas principales"
          className="img-fluid rounded shadow"
          style={{ maxWidth: '100%', height: 'auto' }}
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
  Recetas
</h1>

      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/" className="btn btn-outline-dark d-flex align-items-center">
          <i className="bi bi-house-door me-2"></i> Volver a la Página Principal
        </Link>
        <Link to="/recetas/crear" className="btn btn-lg btn-success d-flex align-items-center shadow-sm">
          <i className="bi bi-plus-circle me-2"></i> Crear Receta
        </Link>
      </div>

      <div className="row">
        {recetas.length === 0 ? (
          <div className="col-12 text-center text-muted">
            <p>No hay recetas disponibles</p>
          </div>
        ) : (
          recetas.map((receta) => (
            <div key={receta.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div
                className="recipe-card shadow border-0 rounded-lg overflow-hidden h-100"
                style={{
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  background: '#ffffff',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0px 8px 20px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div
                  className="card-header"
                  style={{
                    background: 'linear-gradient(135deg, rgb(17, 175, 203) 0%, rgb(100, 157, 255) 100%)',
                    color: '#fff',
                    textAlign: 'center',
                    padding: '15px',
                  }}
                >
                  <h5 className="card-title mb-0">{receta.nombre}</h5>
                </div>
                <div className="card-body p-4">
                  <p
                    className="card-text"
                    style={{
                      color: '#FFF', 
                      fontWeight: '500',
                    }}
                  >
                    {receta.descripcion}
                  </p>
                  <div className="d-flex justify-content-between mt-3">
                    {/* Botón para editar */}
                    <button
                      className="btn btn-sm btn-warning shadow-sm"
                      onClick={() => navigate(`/recetas/editar/${receta.id}`)}
                    >
                      Editar
                    </button>
                    {/* Botón para eliminar */}
                    <button
                      className="btn btn-sm btn-danger shadow-sm"
                      onClick={() => handleDelete(receta.id)}
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

export default RecetasPage;
