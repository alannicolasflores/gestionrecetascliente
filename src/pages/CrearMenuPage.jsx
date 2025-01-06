import { useMutation } from '@tanstack/react-query';
import { createMenu } from '../services/api';
import { useNavigate } from 'react-router-dom';
import MenuForm from '../components/MenuForm';

const CrearMenuPage = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createMenu,
    onSuccess: () => {
      alert('Menú creado con éxito.');
      navigate('/menus');
    },
    onError: (err) => {
      alert('Error al crear menú: ' + err.message);
    },
  });

  const handleSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 text-info">Crear Menú</h1>

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

      {/* Formulario de creación de menú */}
      <MenuForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CrearMenuPage;
