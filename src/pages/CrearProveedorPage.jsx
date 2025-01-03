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
    mutation.mutate(data); // Ejecuta la mutación con los datos del formulario
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Crear Proveedor</h1>
      <ProveedorForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CrearProveedorPage;
