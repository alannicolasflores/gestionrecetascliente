import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchProveedores, deleteProveedor } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import proveedorImage from '../imagenes/proveedor.png'; // Ruta de la imagen

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
      {/* Imagen encima del título */}
      <div className="text-center mb-4">
        <img
          src={proveedorImage}
          alt="Proveedores"
          className="img-fluid rounded mb-3"
          style={{ width: '1200px', height: '300px' }} // Establecer el tamaño fijo para ambos
        />
      </div>

      <div className="d-flex justify-content-start mb-4">
        <Link to="/" className="back-to-home d-flex align-items-center text-decoration-none">
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
              <div
                className={`recipe-card shadow-lg border-0 rounded-lg overflow-hidden h-100 ${proveedor.estado === 'Cancelado' ? 'cancelado' : ''}`}
                style={{
                  transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s', // Transiciones suaves
                  backgroundColor: proveedor.estado === 'Cancelado' ? '#d3d3d3' : '#f8f9fa', // Color base o gris si está cancelado
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = proveedor.estado === 'Cancelado' ? '#d3d3d3' : '#007bff'; // Cambia a azul o gris si está cancelado
                  e.currentTarget.style.transform = 'scale(1.05)'; // Agrandar la tarjeta
                  e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 123, 255, 0.4)'; // Sombra azul
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = proveedor.estado === 'Cancelado' ? '#d3d3d3' : '#f8f9fa'; // Vuelve al color original
                  e.currentTarget.style.transform = 'scale(1)'; // Vuelve al tamaño original
                  e.currentTarget.style.boxShadow = 'none'; // Elimina la sombra
                }}
              >
                <div className="card-body p-4">
                  <h5 className="card-title" style={{ color: proveedor.estado === 'Cancelado' ? '#7f7f7f' : '#fff' }}>
                    {proveedor.nombre}
                  </h5>
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
