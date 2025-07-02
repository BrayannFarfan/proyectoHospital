import { useState } from "react";
import "./AddEventModal.css";

export const AddEventModal = ({ isOpen, onClose, onSave, selectedDate }) => {
  const [eventData, setEventData] = useState({
    title: "",
    time: "",
    description: "",
    color: "#2CB0A5"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventData.title && eventData.time) {
      onSave({
        ...eventData,
        date: selectedDate
      });
      setEventData({
        title: "",
        time: "",
        description: "",
        color: "#2CB0A5"
      });
      onClose();
    }
  };

  const handleClose = () => {
    setEventData({
      title: "",
      time: "",
      description: "",
      color: "#2CB0A5"
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Agregar Nuevo Evento</h3>
          <button className="close-button" onClick={handleClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Título del Evento:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={eventData.title}
              onChange={handleInputChange}
              placeholder="Ej: Consulta con Dr. García"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="time">Hora:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={eventData.time}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción (opcional):</label>
            <textarea
              id="description"
              name="description"
              value={eventData.description}
              onChange={handleInputChange}
              placeholder="Detalles adicionales del evento"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="color">Color del Evento:</label>
            <select
              id="color"
              name="color"
              value={eventData.color}
              onChange={handleInputChange}
            >
              <option value="#2CB0A5">Verde (Consulta General)</option>
              <option value="#6b48ff">Morado (Especialidad)</option>
              <option value="#00c4ff">Azul (Emergencia)</option>
              <option value="#ff4d4f">Rojo (Cirugía)</option>
              <option value="#ffa940">Naranja (Seguimiento)</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleClose} className="cancel-button">
              Cancelar
            </button>
            <button type="submit" className="save-button">
              Guardar Evento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
