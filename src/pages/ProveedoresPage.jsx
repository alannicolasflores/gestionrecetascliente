import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchProveedores, deleteProveedor } from '../services/api';
import { Link } from 'react-router-dom';

const ProveedoresPage = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['proveedores'],
    queryFn: fetchProveedores,
  });

  const mutation = useMutation({
    mutationFn: deleteProveedor,
    onSuccess: () => {
      alert('Proveedor eliminado con éxito.');
      refetch();
    },
    onError: (err) => {
      alert('Error al eliminar proveedor: ' + err.message);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este proveedor?')) {
      mutation.mutate(id);
    }
  };

  if (isLoading) return <p>Cargando proveedores...</p>;
  if (isError) return <p>Error al cargar los proveedores: {error.message}</p>;

  const proveedores = data || [];

  return (
    <div className="container py-5">
      <h1 className="mb-4">Proveedores</h1>
      <Link to="/proveedores/crear" className="btn btn-primary mb-4">Crear Proveedor</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor) => (
            <tr key={proveedor.id}>
              <td>{proveedor.id}</td>
              <td>{proveedor.nombre}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDelete(proveedor.id)}
                >
                  Eliminar
                </button>
                <Link to={`/proveedores/editar/${proveedor.id}`} className="btn btn-warning btn-sm">
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProveedoresPage;
