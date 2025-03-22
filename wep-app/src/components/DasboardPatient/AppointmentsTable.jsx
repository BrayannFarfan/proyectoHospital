// src/components/Dashboard/AppointmentsTable.jsx
export const AppointmentsTable = () => {
    const appointments = [
      { doctor: "Dr. Anna", date: "20 Oct 2020", bookingDate: "18 Oct 2020", amount: "$50.00", status: "Confirm" },
      { doctor: "Dr. Pablo Dybala", date: "20 Oct 2020", bookingDate: "18 Oct 2020", amount: "$50.00", status: "Confirm" },
      { doctor: "Dr. Samuel Daniels", date: "20 Oct 2020", bookingDate: "18 Oct 2020", amount: "$50.00", status: "Cancel" },
      { doctor: "Dr. Julia Jones", date: "20 Oct 2020", bookingDate: "18 Oct 2020", amount: "$50.00", status: "Confirm" },
      { doctor: "Dr. Mary Astor", date: "20 Oct 2020", bookingDate: "18 Oct 2020", amount: "$50.00", status: "Pending" },
    ];
  
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
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.doctor}</td>
                <td>{appointment.date}</td>
                <td>{appointment.bookingDate}</td>
                <td>{appointment.amount}</td>
                <td className={`status-${appointment.status.toLowerCase()}`}>
                  {appointment.status}
                </td>
                <td>
                  <button className="action-btn">Print</button>
                  <button className="action-btn">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };