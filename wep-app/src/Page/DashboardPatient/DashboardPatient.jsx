// src/components/Dashboard/DashboardPatient.jsx
import { useEffect } from "react";
import { AppointmentsTable } from "../../components/DasboardPatient/AppointmentsTable";
import { Sidebar } from "../../components/DasboardPatient/Sidebar";
import { StatsCards } from "../../components/DasboardPatient/StatsCards";
import { useAuth } from "../../context/AuthProvider";
import './Dashboard.css';

export const DashboardPatient = () => {
  const { user, loading, getAppointment, appointments, error } = useAuth();

  useEffect(() => {
 

    if (user) {
      getAppointment(user.id);
    }
  }, [user, getAppointment]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="dashboard-container">
        <Sidebar />
        <main className="dashboard-main">
          <div className="dashboard-content">
            <h1>Patient Dashboard</h1>
          </div>
          <StatsCards appointments={appointments} />
          <AppointmentsTable appointments={appointments} />
          {/* {appointments.length === 0 ? (
            <div className="no-appointments-message">You have no booked appointments</div>
          ) : (
          )} */}
        </main>
      </div>
    </>
  );
};