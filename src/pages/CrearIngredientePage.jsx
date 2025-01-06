import { useMutation } from '@tanstack/react-query';
import { createIngrediente } from '../services/api';
import { useNavigate } from 'react-router-dom';
import IngredienteForm from '../components/IngredienteForm';

const CrearIngredientePage = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createIngrediente,
    onSuccess: () => {
      alert('Ingrediente creado con éxito.');
      navigate('/ingredientes');
    },
    onError: (err) => {
      alert('Error al crear ingrediente: ' + err.message);
    },
  });

  const handleSubmit = (data) => {
    // Validación: verificar si el campo del ingrediente está vacío
    if (!data.nombre || data.nombre.trim() === '') {
      alert('El nombre del ingrediente no puede estar vacío.');
      return; // Evitar que se ejecute la mutación si el campo está vacío
    }

    mutation.mutate(data);
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 text-info">Crear Ingrediente</h1>

      {/* Enlace para regresar a la página anterior */}
      <div className="d-flex justify-content-start mb-4">
        <button 
          className="back-to-home d-flex align-items-center btn btn-link"
          onClick={() => navigate(-1)} // Regresar a la página anterior
        >
          <i className="bi bi-arrow-left me-2"></i>
          <span>Volver a la Página Anterior</span>
        </button>
      </div>

      {/* Formulario de creación de ingrediente */}
      <IngredienteForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CrearIngredientePage;
