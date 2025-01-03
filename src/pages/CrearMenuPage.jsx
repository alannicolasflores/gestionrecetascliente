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
    <div>
      <h1>Crear Menú</h1>
      <MenuForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CrearMenuPage;
