import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PedidoForm = ({ onSubmit, initialData = { fecha: '', estado: '' } }) => {
  const [formData, setFormData] = useState({
    fecha: initialData.fecha ? new Date(initialData.fecha) : null,
    estado: initialData.estado,
  });

  const handleDateChange = (date) => {
    setFormData({ ...formData, fecha: date });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      fecha: formData.fecha ? formData.fecha.toISOString() : '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 shadow-lg rounded-3 bg-light">
      <div className="mb-3">
        <label htmlFor="fecha" className="form-label">Fecha y Hora</label>
        <DatePicker
          selected={formData.fecha}
          onChange={handleDateChange}
          showTimeSelect
          dateFormat="Pp"
          className="form-control"
          placeholderText="Selecciona una fecha y hora"
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
