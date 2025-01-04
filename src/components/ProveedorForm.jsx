import React, { useState } from 'react';

const ProveedorForm = ({ onSubmit, initialData = { nombre: '' } }) => {
  const [formData, setFormData] = useState(initialData);

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
      <button type="submit" className="btn btn-primary btn-lg w-100">Guardar</button>
    </form>
  );
};

export default ProveedorForm;
