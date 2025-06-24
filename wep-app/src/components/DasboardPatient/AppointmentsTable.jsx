import { useAuth } from "../../context/AuthProvider";



export const AppointmentsTable = ({ appointments }) => {

  const { confirmAppointment, rejectAppointment } = useAuth();
  // console.log("Citas recibidas:", appointments);
  return (
    <div className="appointments-table">
      <div className="table-header">
        <h3>Doctors Appointment</h3>
        <div className="table-actions">
          <span>Upcoming</span>
          <button>Today</button>
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
          {appointments && appointments.length > 0 ? (
            appointments.map((appointment) => (
              
              <tr key={appointment.id}>
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
                  {appointment.status === "pending" && (
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