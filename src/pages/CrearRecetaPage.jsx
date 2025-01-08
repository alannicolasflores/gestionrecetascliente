import { useMutation } from '@tanstack/react-query';
import { createReceta } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react'; 
import RecetaForm from '../components/RecetaForm';
import { Link } from 'react-router-dom';
import fondoImage from '../imagenes/fondo.png'; // Ruta de la imagen

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

  const initialData = useMemo(
    () => ({ nombre: '', descripcion: '' }), 
    []
  );

  const handleSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div 
      className="container-fluid py-5" 
      style={{
        backgroundImage: `url(${fondoImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        height: '200vh', // Ajustamos para que el fondo cubra toda la pantalla
        position: 'relative',
      }}
    >
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
        <div className="card shadow-lg border-0 rounded-lg overflow-hidden w-100" style={{ maxWidth: '600px' }}>
          <h1 className="text-center mb-4 text-info">Crear Nueva Receta</h1>

          <div className="d-flex justify-content-start mb-4">
            <button 
              className="back-to-home d-flex align-items-center btn shadow-sm"
              onClick={() => navigate(-1)} // Regresar a la página anterior
            >
              <i className="bi bi-arrow-left me-2"></i>
              <span>Volver a la Página Anterior</span>
            </button>
          </div>

          {/* Formulario de creación de receta */}
          <div className="card-body p-4" style={{ backgroundColor: 'white' }}>
            <RecetaForm onSubmit={handleSubmit} />

            {/* Estado de la mutación */}
            {mutation.isLoading && (
              <div className="alert alert-info mt-4 fade show" role="alert">
                <strong>Creando receta...</strong>
              </div>
            )}
            {mutation.isError && (
              <div className="alert alert-danger mt-4 fade show" role="alert">
                <strong>Error:</strong> Hubo un error al crear la receta: {mutation.error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearRecetaPage;
