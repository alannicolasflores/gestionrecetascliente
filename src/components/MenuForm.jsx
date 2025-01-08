import React, { useState, useEffect } from 'react';

const MenuForm = ({ onSubmit, initialData = { nombre: '' } }) => {
  const [formData, setFormData] = useState(initialData);

  // Usamos useEffect solo para inicializar formData cuando se monta el componente
  useEffect(() => {
    setFormData(initialData); // Inicializamos formData solo al montar
  }, []); // Lo ejecutamos solo una vez cuando el componente se monta

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Actualizar el valor de nombre
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pasa los datos del formulario al componente padre
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange} // Llama a handleChange cuando el valor cambie
        />
      </div>

      <button type="submit" className="btn btn-primary">Guardar</button>
    </form>
  );
};

export default MenuForm;
