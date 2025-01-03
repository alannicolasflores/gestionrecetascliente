import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchProveedores, deleteProveedor } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const ProveedoresPage = () => {
  const navigate = useNavigate();

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
      alert('Hubo un problema al eliminar el proveedor: ' + err.message);
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
    <div
      className="container py-5"
      style={{
        background: 'url("https://www.toptal.com/designers/subtlepatterns/patterns/figured_paper.png")',
        backgroundSize: 'cover',
        padding: '60px 0',
      }}
    >
      <h1 className="text-center mb-4 text-info">Proveedores</h1>

      <div className="d-flex justify-content-start mb-4">
        <Link to="/" className="back-to-home d-flex align-items-center">
          <i className="bi bi-house-door me-2"></i>
          <span>Volver a la Página Principal</span>
        </Link>
      </div>

      <div className="d-flex justify-content-end mb-4">
        <Link to="/proveedores/crear" className="btn btn-lg btn-primary d-flex align-items-center">
          <i className="bi bi-plus-circle me-2"></i> Crear Proveedor
        </Link>
      </div>

      <div className="row">
        {proveedores.length === 0 ? (
          <div className="col-12 text-center text-muted">
            <p>No hay proveedores disponibles</p>
          </div>
        ) : (
          proveedores.map((proveedor) => (
            <div key={proveedor.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="recipe-card shadow-lg border-0 rounded-lg overflow-hidden h-100">
                <div className="card-body p-4">
                  <h5 className="card-title">{proveedor.nombre}</h5>
                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => navigate(`/proveedores/editar/${proveedor.id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(proveedor.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProveedoresPage;
