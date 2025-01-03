import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchRecetaById, createReceta } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import RecetaForm from '../components/RecetaForm';

const EditarRecetaPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch de receta por ID
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['receta', id],
    queryFn: () => fetchRecetaById(id),
  });

  // Mutación para actualizar receta
  const mutation = useMutation({
    mutationFn: (updatedReceta) => createReceta({ ...updatedReceta, id }),
    onSuccess: () => {
      alert('Receta actualizada con éxito.');
      navigate('/recetas');
    },
    onError: (error) => {
      alert('Hubo un problema al actualizar la receta: ' + error.message);
    },
  });

  const handleSubmit = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) return <p>Cargando receta...</p>;
  if (isError) return <p>Error al cargar la receta: {error.message}</p>;

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 text-info">Editar Receta</h1>
      <RecetaForm onSubmit={handleSubmit} initialData={data} />
    </div>
  );
};

export default EditarRecetaPage;
