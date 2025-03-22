import { useNavigate } from 'react-router';
import { AppointmentsTable } from "../../components/DasboardPatient/AppointmentsTable"
import { Sidebar } from "../../components/DasboardPatient/Sidebar"
import { StatsCards } from "../../components/DasboardPatient/StatsCards"
import './Dashboard.css'

import { useAuth } from '../../context/AuthProvider';


export const DashboardPatient = () =>{

    const { user, loading } = useAuth();
    const navigate = useNavigate();

    if (loading) {
        return <div>Loading...</div>;
      }

    if (!user) {
        return null;
    }

    return(
        <>
            <div className="dashboard-container">
                <Sidebar />
                <main className="dashboard-main">
                    <div className="dashboard-content">
                        <h1>Patient Dashboard</h1>
                    </div>
                    <StatsCards />
                    <AppointmentsTable />
                </main>
            </div>
        </>
    )
}