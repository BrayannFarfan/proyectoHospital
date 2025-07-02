import { useState, useEffect } from "react";
import "./DoctorSchedule.css";
import { AddEventModal } from "./AddEventModal";
import { useAppointment } from "../../context/Appointment";

const getColorBySpecialty = (specialtyName) => {
  const colors = {
    'Cardiología': '#ff4d4f',
    'Neurología': '#6b48ff',
    'Pediatría': '#00c4ff',
    'Ginecología': '#ffa940',
    'Traumatología': '#2CB0A5',
    'Medicina General': '#52c41a'
  };
  return colors[specialtyName] || '#2CB0A5';
};

export const DoctorSchedule = () => {
  const { getConfirmedAppointments, confirmedAppointments } = useAppointment();
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'day'
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);


  useEffect(() => {
    const loadConfirmedAppointments = async () => {
      try {
        const appointments = await getConfirmedAppointments();
        
        const formattedEvents = appointments.map(appointment => {
          
          const medicName = appointment.medic ? 
            `${appointment.medic.name} ${appointment.medic.lastName}` : 'Médico no asignado';
          const specialtyName = appointment.specialty ? 
            appointment.specialty.name : 'Especialidad no definida';
          
          const formattedEvent = {
            id: appointment.id,
            date: new Date(appointment.date),
            time: appointment.time,
            title: `Dr. ${medicName}`,
            subtitle: specialtyName,
            color: getColorBySpecialty(specialtyName)
          };
          
          return formattedEvent;
        });
        
        setEvents(formattedEvents);
      } catch (error) {
        setEvents([
          { id: 1, date: new Date(2025, 6, 20), time: "08:30", title: "Consulta Dr. García", subtitle: "Cardiología", color: "#ff4d4f" },
          { id: 2, date: new Date(2025, 6, 22), time: "11:30", title: "Consulta Dr. López", subtitle: "Neurología", color: "#6b48ff" },
        ]);
      }
    };

    loadConfirmedAppointments();
  }, [getConfirmedAppointments]);

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const handleAddEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: Date.now(), 
      date: new Date(eventData.date)
    };
    setEvents(prevEvents => [...prevEvents, newEvent]);
  };

  const openModal = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const firstDayOfMonth = new Date(year, currentDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, currentDate.getMonth(), day);
    const dayEvents = events.filter(
      (event) =>
        event.date.getDate() === day &&
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === year
    );
    
    days.push(
      <div 
        key={day} 
        className={`calendar-day ${isToday(date) ? 'today' : ''}`}
        onClick={() => openModal(date)}
        style={{ cursor: 'pointer' }}
      >
        <span className="day-number">{day}</span>
        {dayEvents.map((event) => (
          <div
            key={event.id}
            className="event"
            style={{ backgroundColor: event.color }}
            title={`${event.time} - ${event.title}${event.subtitle ? ` (${event.subtitle})` : ''}`}
          >
            <div className="event-title">
              {event.time} {event.title}
            </div>
            {event.subtitle && (
              <div className="event-subtitle">
                {event.subtitle}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const goToJuly2025 = () => {
    setCurrentDate(new Date(2025, 6, 1));
  };

  // Función para buscar eventos
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.length > 0) {
      const results = events.filter(event => 
        event.title.toLowerCase().includes(term.toLowerCase()) ||
        event.subtitle?.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const goToEvent = (event) => {
    setCurrentDate(new Date(event.date.getFullYear(), event.date.getMonth(), 1));
    setShowSearchResults(false);
    setSearchTerm('');
  };

  const changeView = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="doctor-schedule">
      <div className="schedule-header">
        <h1>Appointement Calendar </h1>
        <div className="header-actions">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Buscar evento" 
              value={searchTerm}
              onChange={handleSearch}
            />
            {showSearchResults && (
              <div className="search-results">
                {searchResults.length > 0 ? (
                  searchResults.map(event => (
                    <div 
                      key={event.id} 
                      className="search-result-item"
                      onClick={() => goToEvent(event)}
                    >
                      {event.title} - {event.subtitle} ({event.date.toLocaleDateString()})
                    </div>
                  ))
                ) : (
                  <div className="search-result-item">No se encontraron eventos</div>
                )}
              </div>
            )}
          </div>
          <button className="event-title-button">Título del Evento</button>
          <button 
            className="add-event-button"
            onClick={() => openModal(new Date())}
          >
            Agregar Evento +
          </button>
        </div>
      </div>
      
      <div className="calendar">
        <div className="calendar-header">
          <h2>Calendario</h2>
          <div className="calendar-nav">
            <span className="month-year">{`${month} ${year}`}</span>
            <div className="nav-buttons">
              <button onClick={goToPreviousMonth}>{"<"}</button>
              <button onClick={goToNextMonth}>{">"}</button>
              <button onClick={goToToday}>Hoy</button>
              <button onClick={goToJuly2025}>Julio 2025</button>
            </div>
            <div className="view-buttons">
              <button 
                className={viewMode === 'month' ? 'active' : ''}
                onClick={() => changeView('month')}
              >
                Mes
              </button>
              <button 
                className={viewMode === 'week' ? 'active' : ''}
                onClick={() => changeView('week')}
              >
                Semana
              </button>
              <button 
                className={viewMode === 'day' ? 'active' : ''}
                onClick={() => changeView('day')}
              >
                Día
              </button>
            </div>
          </div>
        </div>
        
        <div className="calendar-grid">
          <div className="calendar-day-header">Dom</div>
          <div className="calendar-day-header">Lun</div>
          <div className="calendar-day-header">Mar</div>
          <div className="calendar-day-header">Mié</div>
          <div className="calendar-day-header">Jue</div>
          <div className="calendar-day-header">Vie</div>
          <div className="calendar-day-header">Sáb</div>
          {days}
        </div>
      </div>
      
      <AddEventModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleAddEvent}
        selectedDate={selectedDate}
      />
    </div>
  );
};
