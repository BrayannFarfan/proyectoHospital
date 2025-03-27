import { Sidebar } from "../../components/DasboardPatient/Sidebar"
import { ResetPasswordDash } from "../../components/ResetPasswordChange/ResetPasswordChange"




export const ResetPasswordChange = ( ) =>{



    return(
         <div className="dashboard-container">
                <Sidebar />
                <main className="dashboard-main">
                  <div className="dashboard-content">
                    <h1>Reset Password</h1>
                  </div>
                  <ResetPasswordDash/>
                </main>
              </div>
    )
}