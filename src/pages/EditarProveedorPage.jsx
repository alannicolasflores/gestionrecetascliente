import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchProveedorById, updateProveedor } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import ProveedorForm from '../components/ProveedorForm';

const EditarProveedorPage = () => {
  const { id } = useParams(); // Obtiene el ID de la URL
  const navigate = useNavigate();

  // Fetch del proveedor por ID
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['proveedor', id],
    queryFn: () => fetchProveedorById(id),
  });

  // Mutación para actualizar proveedor
  const mutation = useMutation({
    mutationFn: (updatedProveedor) => updateProveedor(id, updatedProveedor),
    onSuccess: () => {
      alert('Proveedor actualizado con éxito.');
      navigate('/proveedores');
    },
    onError: (err) => {
      alert('Error al actualizar proveedor: ' + err.message);
    },
  });

  const handleSubmit = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) return <p>Cargando datos del proveedor...</p>;
  if (isError) return <p>Error al cargar el proveedor: {error.message}</p>;

  return (
    <div className="container py-5">
      <h1 className="mb-4">Editar Proveedor</h1>
      <ProveedorForm onSubmit={handleSubmit} initialData={data} />
    </div>
  );
};

export default EditarProveedorPage;
