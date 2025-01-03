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
    mutation.mutate(data);
  };

  return (
    <div>
      <h1>Crear Ingrediente</h1>
      <IngredienteForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CrearIngredientePage;
