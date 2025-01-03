import React, { useState, useEffect } from 'react';

const PedidoForm = ({ onSubmit, initialData = { fecha: '', estado: '' } }) => {
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
    <form onSubmit={handleSubmit} className="p-4 shadow-lg rounded-3 bg-light">
      <div className="mb-3">
        <label htmlFor="fecha" className="form-label">Fecha</label>
        <input
          type="datetime-local"
          className="form-control"
          id="fecha"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="estado" className="form-label">Estado</label>
        <input
          type="text"
          className="form-control"
          id="estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">Guardar</button>
    </form>
  );
};

export default PedidoForm;
