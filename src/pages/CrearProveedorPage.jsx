import { useMutation } from '@tanstack/react-query';
import { createProveedor } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react'; 
import ProveedorForm from '../components/ProveedorForm';
import fondoImage from '../imagenes/fondo2.png'; // Ruta de la imagen

const CrearProveedorPage = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createProveedor, // Define la función que realiza la mutación
    onSuccess: () => {
      alert('Proveedor creado con éxito.');
      navigate('/proveedores'); // Redirige a la lista de proveedores
    },
    onError: (err) => {
      alert('Error al crear proveedor: ' + err.message);
    },
  });

  const handleSubmit = (data) => {
    // Validación: Verificar si los campos del proveedor están vacíos
    if (!data.nombre || data.nombre.trim() === '') {
      alert('El nombre del proveedor no puede estar vacío.');
      return; // Evita la ejecución de la mutación si el campo está vacío
    }

    if (!data.direccion || data.direccion.trim() === '') {
      alert('La dirección del proveedor no puede estar vacía.');
      return;
    }

    mutation.mutate(data); // Ejecuta la mutación con los datos del formulario
  };

  return (
    <div 
      className="container-fluid py-5" 
      style={{
        backgroundImage: `url(${fondoImage})`, // Fondo de la imagen
        backgroundSize: '100% 140%', // Ajusta el ancho a 120% y el alto a 100%
        backgroundPosition: 'center',
        height: '120vh', // Ajusta el alto de la pantalla al tamaño de la ventana
        width: '100%', // Asegura que el fondo ocupe todo el ancho de la pantalla
        position: 'relative',
      }}
    >
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
        <div className="card shadow-lg border-0 rounded-lg overflow-hidden w-100" style={{ maxWidth: '600px' }}>
          <h1 className="text-center mb-4 text-info">Crear Proveedor</h1>

          {/* Enlace para regresar a la página anterior */}
          <div className="d-flex justify-content-start mb-4">
            <button 
              className="back-to-home d-flex align-items-center btn btn-link"
              onClick={() => navigate(-1)} // Regresar a la página anterior
            >
              <i className="bi bi-arrow-left me-2"></i>
              <span>Volver a la Página Anterior</span>
            </button>
          </div>

          {/* Formulario de creación de proveedor */}
          <div className="card-body p-4" style={{ backgroundColor: 'white' }}>
            <ProveedorForm onSubmit={handleSubmit} />

            {/* Estado de la mutación */}
            {mutation.isLoading && (
              <div className="alert alert-info mt-4 fade show" role="alert">
                <strong>Creando proveedor...</strong>
              </div>
            )}
            {mutation.isError && (
              <div className="alert alert-danger mt-4 fade show" role="alert">
                <strong>Error:</strong> Hubo un error al crear el proveedor: {mutation.error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearProveedorPage;
