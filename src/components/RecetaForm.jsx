import React, { useState } from 'react';

const RecetaForm = ({ onSubmit, initialData = { nombre: '', descripcion: '' } }) => {
  // Inicializamos el estado una sola vez
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({ nombre: '', descripcion: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = { nombre: '', descripcion: '' };

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre no puede estar vacío.';
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción no puede estar vacía.';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 shadow-lg rounded-3 bg-light">
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label text-primary">Nombre</label>
        <input
          type="text"
          className={`form-control border-primary ${errors.nombre ? 'is-invalid' : ''}`}
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="descripcion" className="form-label text-primary">Descripción</label>
        <textarea
          className={`form-control border-primary ${errors.descripcion ? 'is-invalid' : ''}`}
          id="descripcion"
          name="descripcion"
          rows="4"
          value={formData.descripcion}
          onChange={handleChange}
        />
        {errors.descripcion && <div className="invalid-feedback">{errors.descripcion}</div>}
      </div>
      <button type="submit" className="btn btn-primary btn-lg w-100">Guardar</button>
    </form>
  );
};

export default RecetaForm;
