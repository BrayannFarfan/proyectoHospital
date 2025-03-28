import { useState } from "react";
import "./DoctorSchedule.css";

// Datos simulados para los eventos
const events = [
  { id: 1, date: new Date(2025, 2, 7), time: "08:30AM", title: "Meeting", color: "#6b48ff" },
  { id: 2, date: new Date(2025, 2, 9), time: "11:30AM", title: "Meeting", color: "#00c4ff" },
  { id: 3, date: new Date(2025, 2, 18), time: "02:30PM", title: "Meeting", color: "#ff4d4f" },
];

export const DoctorSchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 1)); // Fecha inicial: 1 de marzo de 2025

  // Obtener el mes y año actuales
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  // Obtener el primer día del mes y el número de días en el mes
  const firstDayOfMonth = new Date(year, currentDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();

  // Generar los días del calendario
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
      <div key={day} className="calendar-day">
        <span className="day-number">{day}</span>
        {dayEvents.map((event) => (
          <div
            key={event.id}
            className="event"
            style={{ backgroundColor: event.color }}
          >
            {event.time} {event.title}
          </div>
        ))}
      </div>
    );
  }

  // Funciones para navegar entre meses
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date(2025, 2, 1)); // Volver a marzo de 2025 para este ejemplo
  };

  return (
    <div className="doctor-schedule">
      <div className="schedule-header">
        <h1>Doctor Schedule</h1>
        <div className="header-actions">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search event" />
          </div>
          <button className="event-title-button">Event title</button>
          <button className="add-event-button">Add Event +</button>
        </div>
      </div>
      <div className="calendar">
        <div className="calendar-header">
          <h2>Calendar</h2>
          <div className="calendar-nav">
            <span className="month-year">{`${month} ${year}`}</span>
            <div className="nav-buttons">
              <button onClick={goToPreviousMonth}>{"<"}</button>
              <button onClick={goToNextMonth}>{">"}</button>
              <button onClick={goToToday}>Today</button>
            </div>
            <div className="view-buttons">
              <button className="active">Month</button>
              <button>Week</button>
              <button>Day</button>
            </div>
          </div>
        </div>
        <div className="calendar-grid">
          <div className="calendar-day-header">Sun</div>
          <div className="calendar-day-header">Mon</div>
          <div className="calendar-day-header">Tue</div>
          <div className="calendar-day-header">Wed</div>
          <div className="calendar-day-header">Thu</div>
          <div className="calendar-day-header">Fri</div>
          <div className="calendar-day-header">Sat</div>
          {days}
        </div>
      </div>
    </div>
  );
};