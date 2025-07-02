import { useAuth } from "../../context/AuthProvider";
import { useState, useMemo } from "react";
import { isToday, isUpcoming, isPast, formatDateForDisplay } from "../../utils/dateUtils";

export const AppointmentsTable = ({ appointments }) => {
  const [activeFilter, setActiveFilter] = useState("upcoming");
  const { confirmAppointment, rejectAppointment } = useAuth();

  // Filtrar citas basado en la fecha actual
  const filteredAppointments = useMemo(() => {
    if (!appointments || appointments.length === 0) return [];
    
    return appointments.filter(appointment => {
      if (activeFilter === "today") {
        return isToday(appointment.date);
      } else if (activeFilter === "upcoming") {
        return isUpcoming(appointment.date);
      } else if (activeFilter === "past") {
        return isPast(appointment.date);
      }
      return true;
    });
  }, [appointments, activeFilter]);
  return (
    <div className="appointments-table">
      <div className="table-header">
        <h3>Doctors Appointment</h3>
        <div className="table-actions">
          <span 
            className={activeFilter === "upcoming" ? "active-filter" : "filter-option"}
            onClick={() => setActiveFilter("upcoming")}
            style={{ cursor: "pointer" }}
          >
            Upcoming
          </span>
          <button 
            className={activeFilter === "today" ? "active-filter" : "filter-option"}
            onClick={() => setActiveFilter("today")}
          >
            Today
          </button>
          <button 
            className={activeFilter === "past" ? "active-filter" : "filter-option"}
            onClick={() => setActiveFilter("past")}
          >
            Past
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Date</th>
            <th>Booking Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments && filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              
              <tr key={appointment.id} className={activeFilter === "past" ? "past-appointment" : ""}>
                <td className="td-medic">
                  Dr. 
                  {appointment.medic.name || 'N/A'}
                  <span className="appointment-specialty">{appointment.specialty.name}</span>
                </td>
                <td  >{appointment.date ? new Date(appointment.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year:'numeric',
                    timeZone: "UTC"
                  }) : 'N/A'} <span className="appointment-time">{appointment.time.slice(0,5) || "N/A"}</span></td>
                <td className="appointment-date">{appointment.date ? new Date(appointment.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year:'numeric',
                  }) : 'N/A'}</td>
                <td>{appointment.amount ? `$${appointment.amount}` : 'N/A'}</td>
                <td className={`status-${appointment.status?.toLowerCase() || 'unknown'}`}>
                  {appointment.status || 'N/A'}
                </td>
                <td>
                  {appointment.status === "pending" && activeFilter !== "past" && (
                    <>
                      <button
                        className="action-btn confirm-btn"
                        onClick={() => confirmAppointment(appointment.id)}
                      >
                        Confirm
                      </button>
                      <button
                        className="action-btn reject-btn"
                        onClick={() => rejectAppointment(appointment.id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {activeFilter === "past" && (
                    <span className="past-label">Completed</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No appointments found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};