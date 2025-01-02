import { useState } from 'react';

const RecetaForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input name="nombre" value={formData.nombre} onChange={handleChange} />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default RecetaForm;
