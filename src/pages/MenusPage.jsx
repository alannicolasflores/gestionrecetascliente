import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchMenus, deleteMenu } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import fondoImage from '../imagenes/menu.png'; // Imagen para el encabezado

const MenusPage = () => {
  const navigate = useNavigate();

  // Cargar menús
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['menus'],
    queryFn: fetchMenus,
  });

  // Mutación para eliminar menú
  const mutation = useMutation({
    mutationFn: deleteMenu,
    onSuccess: () => {
      alert('Menú eliminado con éxito.');
      refetch();
    },
    onError: (err) => {
      alert('Error al eliminar menú: ' + err.message);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este menú?')) {
      mutation.mutate(id);
    }
  };

  if (isLoading) return <p>Cargando menús...</p>;
  if (isError) return <p>Error al cargar los menús: {error.message}</p>;

  const menus = data || [];

  return (
    <div className="container py-5">
      {/* Imagen justo encima del título */}
      <div 
        className="mb-4 text-center" 
        style={{
          backgroundImage: `url(${fondoImage})`, 
          backgroundSize: 'contain', // Ajusta la imagen para que se vea completa sin recortes
          backgroundPosition: 'center',
          width: '100%', // Ajusta el ancho al 100% del contenedor
          height: '250px', // Ajusta la altura de la imagen
          borderRadius: '10px', // Añadir bordes redondeados a la imagen
          backgroundRepeat: 'no-repeat', // Evita que la imagen se repita si no ocupa todo el espacio
        }}
      />
      
      {/* Título de la página */}

      <div className="d-flex justify-content-start mb-4">
        <Link to="/" className="back-to-home d-flex align-items-center">
          <i className="bi bi-house-door me-2"></i>
          <span>Volver a la Página Principal</span>
        </Link>
      </div>

      <div className="d-flex justify-content-end mb-4">
        <Link to="/menus/crear" className="btn btn-lg btn-primary d-flex align-items-center">
          <i className="bi bi-plus-circle me-2"></i> Crear Menú
        </Link>
      </div>

      <div className="row">
        {menus.length === 0 ? (
          <div className="col-12 text-center text-muted">
            <p>No hay menús disponibles</p>
          </div>
        ) : (
          menus.map((menu) => (
            <div key={menu.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="recipe-card shadow-lg border-0 rounded-lg overflow-hidden h-100">
                <div className="card-body p-4">
                  <h5 className="card-title">{menu.nombre}</h5>
                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => navigate(`/menus/editar/${menu.id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(menu.id)}
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

export default MenusPage;
