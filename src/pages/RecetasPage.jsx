import { useQuery } from '@tanstack/react-query';
import { fetchRecetas } from '../services/api';
import Table from '../components/Table'; // Asegúrate de tener el componente Table configurado correctamente

const RecetasPage = () => {
  // Uso de useQuery con el formato de objeto requerido en v5
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['recetas'], // Clave única para la consulta
    queryFn: fetchRecetas, // Función que obtiene los datos
  });

  if (isLoading) return <p>Cargando recetas...</p>;
  if (isError) return <p>Error al cargar las recetas: {error.message}</p>;

  const recetas = data || []; // Asegúrate de que los datos estén definidos

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'descripcion', label: 'Descripción' },
  ];

  const handleRowClick = (receta) => {
    console.log('Receta seleccionada:', receta);
  };

  return (
    <div>
      <h1>Recetas</h1>
      <Table columns={columns} data={recetas} onRowClick={handleRowClick} />
    </div>
  );
};

export default RecetasPage;
