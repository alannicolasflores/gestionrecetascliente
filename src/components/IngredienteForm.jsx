import React, { useState, useEffect } from 'react';

const IngredienteForm = ({ onSubmit, initialData = { nombre: '', cantidad: 0 } }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cantidad" className="form-label">Cantidad</label>
        <input
          type="number"
          className="form-control"
          id="cantidad"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">Guardar</button>
    </form>
  );
};

export default IngredienteForm;
