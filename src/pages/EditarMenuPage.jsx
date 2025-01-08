import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchMenuById, updateMenu } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import MenuForm from '../components/MenuForm';

const EditarMenuPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch del menú por ID
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['menu', id],
    queryFn: () => fetchMenuById(id),
    enabled: !!id, // Evita ejecutar si no hay ID
  });

  // Mutación para actualizar menú
  const mutation = useMutation({
    mutationFn: (updatedMenu) => updateMenu(id, updatedMenu),
    onSuccess: () => {
      alert('Menú actualizado con éxito.');
      navigate('/menus'); // Redirige a la lista de menús
    },
    onError: (err) => {
      alert('Error al actualizar menú: ' + err.message);
    },
  });

  const handleSubmit = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) return <p>Cargando datos del menú...</p>;
  if (isError) return <p>Error al cargar el menú: {error.message}</p>;

  return (
    <div className="container py-5">
      <h1>Editar Menú</h1>
      <MenuForm onSubmit={handleSubmit} initialData={data || { nombre: '' }} />

      {/* Enlace para cancelar y regresar */}
      <div className="mt-3">
        <button className="btn btn-link" onClick={() => navigate(-1)}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditarMenuPage;
