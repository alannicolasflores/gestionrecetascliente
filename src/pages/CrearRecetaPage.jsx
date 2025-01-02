import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReceta } from '../services/api';
import RecetaForm from '../components/RecetaForm';

const CrearRecetaPage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(createReceta, {
    onSuccess: () => {
      // Refresca las recetas en la cache de React Query
      queryClient.invalidateQueries(['recetas']);
      alert('Receta creada con éxito!');
    },
  });

  const handleSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <h1>Crear Nueva Receta</h1>
      <RecetaForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CrearRecetaPage;
