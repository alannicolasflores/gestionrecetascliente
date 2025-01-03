import { useQuery } from '@tanstack/react-query';
import { fetchRecetas } from '../services/api';
import { Link } from 'react-router-dom';

const RecetasPage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['recetas'],
    queryFn: fetchRecetas,
  });

  if (isLoading) return <p>Cargando recetas...</p>;
  if (isError) return <p>Error al cargar las recetas: {error.message}</p>;

  const recetas = data || [];

  return (
    <div
      className="container py-5"
      style={{
        background: 'url("https://www.toptal.com/designers/subtlepatterns/patterns/figured_paper.png")', // Cambia el patrón si prefieres otro
        backgroundSize: 'cover',
        padding: '60px 0',
      }}
    >
      <h1 className="text-center mb-4 text-info">Recetas</h1>

      <div className="d-flex justify-content-start mb-4">
        <Link to="/" className="back-to-home d-flex align-items-center">
          <i className="bi bi-house-door me-2"></i>
          <span>Volver a la Página Principal</span>
        </Link>
      </div>

      <div className="d-flex justify-content-end mb-4">
        <Link to="/recetas/crear" className="btn btn-lg btn-primary d-flex align-items-center">
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
              <div className="recipe-card shadow-lg border-0 rounded-lg overflow-hidden h-100">
                <div className="card-body p-4">
                  <h5 className="card-title">{receta.nombre}</h5>
                  <p className="card-text">{receta.descripcion}</p>
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
