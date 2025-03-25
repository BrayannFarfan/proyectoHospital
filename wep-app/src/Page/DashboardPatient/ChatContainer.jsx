import { Sidebar } from "../../components/DasboardPatient/Sidebar"
import MessagesPage from "../Message/MessagesPage"




export const ChatContainer = ( ) =>{



    return(
         <div className="dashboard-container">
                <Sidebar />
                <main className="dashboard-main">
                  <div className="dashboard-content">
                    <h1>Meesage Chat</h1>
                  </div>
                  <MessagesPage />
                </main>
              </div>
    )
}