import { Sidebar } from "../../components/DasboardPatient/Sidebar"
import { DoctorSchedule } from "../../components/DoctorShedule/DoctorSchedule"




export const DoctorContainerDash = ( ) =>{



    return(
         <div className="dashboard-container">
                <Sidebar />
                <main className="dashboard-main">
                  <div className="dashboard-content">
                    <h1>Reset Password</h1>
                  </div>
                  <DoctorSchedule/>
                </main>
              </div>
    )
}