import { useMutation } from '@tanstack/react-query';
import { createMenu } from '../services/api';
import { useNavigate } from 'react-router-dom';
import MenuForm from '../components/MenuForm';
import fondoImage from '../imagenes/fondo4.png'; // Imagen de fondo

const CrearMenuPage = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createMenu,
    onSuccess: () => {
      alert('Menú creado con éxito.');
      navigate('/menus'); // Redirige al listado de menús después de crear
    },
    onError: (err) => {
      alert('Error al crear menú: ' + err.message);
    },
  });

  const handleSubmit = (data) => {
    // Validar que el campo 'nombre' no esté vacío
    if (!data.nombre) {
      alert('Por favor, complete el campo Nombre.');
      return; // Detener el envío si el campo está vacío
    }

    mutation.mutate(data); // Enviar los datos si son válidos
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundImage: `url(${fondoImage})`,
        backgroundSize: '1000px 700px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
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
        <h1 className="text-center mb-4 text-info">Crear Menú</h1>

        <div className="d-flex justify-content-start mb-4">
          <button
            className="btn btn-link text-decoration-none text-secondary d-flex align-items-center"
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-arrow-left me-2" style={{ fontSize: '1.2rem' }}></i>
            <span style={{ fontSize: '1rem' }}>Volver a la Página Anterior</span>
          </button>
        </div>

        {/* Formulario de creación de menú */}
        <MenuForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CrearMenuPage;
