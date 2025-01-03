import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchIngredienteById, updateIngrediente } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import IngredienteForm from '../components/IngredienteForm';

const EditarIngredientePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch del ingrediente por ID
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['ingrediente', id],
    queryFn: () => fetchIngredienteById(id),
    enabled: !!id, // Evita ejecutar si no hay ID
  });

  // Mutación para actualizar ingrediente
  const mutation = useMutation({
    mutationFn: (updatedIngrediente) => updateIngrediente(id, updatedIngrediente),
    onSuccess: () => {
      alert('Ingrediente actualizado con éxito.');
      navigate('/ingredientes'); // Redirige a la lista de ingredientes
    },
    onError: (err) => {
      alert('Error al actualizar ingrediente: ' + err.message);
    },
  });

  const handleSubmit = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) return <p>Cargando datos del ingrediente...</p>;
  if (isError) return <p>Error al cargar el ingrediente: {error.message}</p>;

  return (
    <div className="container py-5">
      <h1>Editar Ingrediente</h1>
      <IngredienteForm onSubmit={handleSubmit} initialData={data} />
    </div>
  );
};

export default EditarIngredientePage;
