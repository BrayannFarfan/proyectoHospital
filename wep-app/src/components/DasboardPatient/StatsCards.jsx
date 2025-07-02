import { LuCalendarClock } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineCheckCircle } from "react-icons/md";
import { MdOutlinePending } from "react-icons/md";
import { useAuth } from "../../context/AuthProvider";

export const StatsCards = () => {
  const { appointments } = useAuth();
  
  // Calcular estadísticas por estado
  const totalAppointments = appointments?.length || 0;
  const rejectedAppointments = appointments?.filter(apt => apt.status === 'rejected').length || 0;
  const confirmedAppointments = appointments?.filter(apt => apt.status === 'confirmed').length || 0;
  const pendingAppointments = appointments?.filter(apt => apt.status === 'pending').length || 0;

    return (
      <div className="stats-cards">
        <div className="stats-card card_1">
          <div >
            <LuCalendarClock className="steps-icon" />
          </div>
          <div className="stats_text">
            <h4>{totalAppointments}</h4>
            <p>Total Appointments</p>
          </div>
        </div>
        <div className="stats-card card_2">
          <div>
            <MdOutlineCancel className="steps-icon"/>
          </div>
          <div className="stats_text">
            <h4>{rejectedAppointments}</h4>
            <p>Rejected Appointments</p>
          </div>
        </div>
        <div className="stats-card card_3">
          <div>
            <MdOutlineCheckCircle className="steps-icon"/>
          </div>
          <div className="stats_text">
            <h4>{confirmedAppointments}</h4>
            <p>Confirmed Appointments</p>
          </div>
        </div>
        <div className="stats-card card_4 pending-card">
          <div>
            <MdOutlinePending className="steps-icon pending-icon"/>
          </div>
          <div className="stats_text">
            <h4>{pendingAppointments}</h4>
            <p>Pending Appointments</p>
          </div>
        </div>
      </div>
    );
  };