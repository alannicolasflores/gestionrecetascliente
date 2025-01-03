import React, { useState, useEffect } from 'react';

const RecetaForm = ({ onSubmit, initialData = { nombre: '', descripcion: '' } }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData); // Actualiza el estado cuando cambian los datos iniciales
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 shadow-lg rounded-3 bg-light">
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label text-primary">Nombre</label>
        <input
          type="text"
          className="form-control border-primary"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="descripcion" className="form-label text-primary">Descripción</label>
        <textarea
          className="form-control border-primary"
          id="descripcion"
          name="descripcion"
          rows="4"
          value={formData.descripcion}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary btn-lg w-100">Guardar</button>
    </form>
  );
};

export default RecetaForm;
