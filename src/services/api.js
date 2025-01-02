import axios from 'axios';

// Instancia de Axios con la configuración base
const axiosInstance = axios.create({
  baseURL: 'http://20.102.104.104:8080/api',
});

// Función para obtener todas las recetas
export const fetchRecetas = async () => {
  try {
    const response = await axiosInstance.get('/recetas');
    return response.data; // Devuelve solo los datos
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener recetas');
  }
};

// Función para crear una nueva receta
export const createReceta = async (data) => {
  try {
    const response = await axiosInstance.post('/recetas', data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al crear la receta');
  }
};

// Función para obtener una receta por ID
export const fetchRecetaById = async (id) => {
  try {
    const response = await axiosInstance.get(`/recetas/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener la receta');
  }
};

// Función para eliminar una receta por ID
export const deleteReceta = async (id) => {
  try {
    await axiosInstance.delete(`/recetas/${id}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al eliminar la receta');
  }
};
