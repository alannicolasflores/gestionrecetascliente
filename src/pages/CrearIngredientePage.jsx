import { useMutation } from '@tanstack/react-query';
import { createIngrediente } from '../services/api';
import { useNavigate } from 'react-router-dom';
import IngredienteForm from '../components/IngredienteForm';
import fondoImage from '../imagenes/fondo5.png'; // Imagen de fondo

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
    <div
      className="container-fluid py-5"
      style={{
        backgroundImage: `url(${fondoImage})`,
        backgroundSize: '1100px 900px', // Ajusta el tamaño del fondo
        backgroundRepeat: 'no-repeat', // Evita repeticiones
        backgroundPosition: 'center', // Centra la imagen
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa', // Color de respaldo
      }}
    >
      <div
        className="bg-white rounded shadow p-5"
        style={{
          maxWidth: '600px',
          width: '100%',
          backdropFilter: 'blur(5px)',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Título de la página */}
        <h1 className="text-center mb-4 text-info">Crear Ingrediente</h1>

        {/* Enlace para regresar a la página anterior */}
        <div className="d-flex justify-content-start mb-4">
          <button
            className="btn btn-link text-decoration-none text-secondary d-flex align-items-center"
            onClick={() => navigate(-1)} // Regresar a la página anterior
          >
            <i className="bi bi-arrow-left me-2" style={{ fontSize: '1.2rem' }}></i>
            <span style={{ fontSize: '1rem' }}>Volver a la Página Anterior</span>
          </button>
        </div>

        {/* Formulario de creación de ingrediente */}
        <IngredienteForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CrearIngredientePage;
