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
export const createReceta = async (newReceta) => {
  const response = await axiosInstance.post('/recetas', newReceta); // Usa axiosInstance para la solicitud POST

  if (!response.data) {
    throw new Error('Error al crear receta');
  }

  return response.data; // Retorna los datos de la receta creada
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
export const fetchProveedores = async () => {
  try {
    const response = await axiosInstance.get('/proveedores');
    return response.data; // Regresa la lista de proveedores
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener proveedores');
  }
};

// Crear un nuevo proveedor
export const createProveedor = async (newProveedor) => {
  try {
    const response = await axiosInstance.post('/proveedores', newProveedor);
    return response.data; // Regresa los datos del proveedor creado
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al crear proveedor');
  }
};

// Obtener proveedor por ID
export const fetchProveedorById = async (id) => {
  try {
    const response = await axiosInstance.get(`/proveedores/${id}`);
    return response.data; // Regresa los datos del proveedor
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener proveedor');
  }
};

// Eliminar proveedor por ID
export const deleteProveedor = async (id) => {
  try {
    await axiosInstance.delete(`/proveedores/${id}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al eliminar proveedor');
  }
};
// Actualizar un proveedor por ID
export const updateProveedor = async (id, updatedProveedor) => {
  try {
    const response = await axiosInstance.put(`/proveedores/${id}`, updatedProveedor);
    return response.data; // Retorna los datos del proveedor actualizado
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al actualizar proveedor');
  }
};
export const fetchPedidos = async () => {
  try {
    const response = await axiosInstance.get('/pedidos');
    return response.data; // Retorna la lista de pedidos
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener pedidos');
  }
};
export const createPedido = async (newPedido) => {
  try {
    const response = await axiosInstance.post('/pedidos', newPedido);
    return response.data; // Retorna los datos del pedido creado
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al crear pedido');
  }
};
export const fetchPedidoById = async (id) => {
  try {
    const response = await axiosInstance.get(`/pedidos/${id}`);
    return response.data; // Retorna los datos del pedido
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener el pedido');
  }
};
export const deletePedido = async (id) => {
  try {
    await axiosInstance.delete(`/pedidos/${id}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al eliminar pedido');
  }
};
// Actualizar un pedido por ID
export const updatePedido = async (id, updatedPedido) => {
  try {
    const response = await axiosInstance.put(`/pedidos/${id}`, updatedPedido);
    return response.data; // Retorna los datos del pedido actualizado
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al actualizar pedido');
  }
};
