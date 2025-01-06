import { useMutation } from '@tanstack/react-query';
import { createProveedor } from '../services/api';
import { useNavigate } from 'react-router-dom';
import ProveedorForm from '../components/ProveedorForm';

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
    <div className="container py-5">
      <h1 className="mb-4 text-info">Crear Proveedor</h1>

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
      <ProveedorForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CrearProveedorPage;
