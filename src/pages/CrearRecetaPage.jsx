import { useMutation } from '@tanstack/react-query';
import { createReceta } from '../services/api';
import { useNavigate } from 'react-router-dom';
import RecetaForm from '../components/RecetaForm';
import { Link } from 'react-router-dom';

const CrearRecetaPage = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createReceta,
    onSuccess: () => {
      alert('Receta creada con éxito!');
      setTimeout(() => {
        navigate('/recetas'); // Redirigir a la página de recetas
      }, 1000); // Redirigir después de 1 segundo
    },
    onError: (error) => {
      console.error('Error al crear receta:', error);
      alert('Hubo un problema al crear la receta.');
    },
  });

  const handleSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 text-info">Crear Nueva Receta</h1>

      {/* Enlace para regresar a la página principal */}
      <div className="d-flex justify-content-start mb-4">
        <Link to="/" className="back-to-home d-flex align-items-center">
          <i className="bi bi-house-door me-2"></i>
          <span>Volver a la Página Principal</span>
        </Link>
      </div>

      {/* Formulario de creación de receta */}
      <div className="card shadow-lg border-0 rounded-lg overflow-hidden">
        <div className="card-body p-4">
          <RecetaForm onSubmit={handleSubmit} />
        </div>
      </div>

      {/* Mostrar el estado de la mutación (si está cargando o si hay error) */}
      {mutation.isLoading && <div className="alert alert-info mt-4">Creando receta...</div>}
      {mutation.isError && (
        <div className="alert alert-danger mt-4">
          Hubo un error al crear la receta: {mutation.error.message}
        </div>
      )}
    </div>
  );
};

export default CrearRecetaPage;
