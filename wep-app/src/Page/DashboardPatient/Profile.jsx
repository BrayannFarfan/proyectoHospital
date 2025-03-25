import { ProfileForm } from "../../components/DasboardPatient/ProfileForm"
import { Sidebar } from "../../components/DasboardPatient/Sidebar"
import { useAuth } from "../../context/AuthProvider"



export const Profile = ( ) =>{

    // const { user } = useAuth



    // if (!user) {
    //     return null;
    //   }
    


    return(
         <div className="dashboard-container">
                <Sidebar />
                <main className="dashboard-main">
                  <div className="dashboard-content">
                    <h1>My Profile</h1>
                  </div>
                  <ProfileForm />
                </main>
              </div>
    )
}