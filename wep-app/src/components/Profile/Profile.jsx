import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { FaUser, FaCog, FaBell, FaExchangeAlt, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import './profile.css';



export const Profile = () => {

    const [ isOpen , setIsOpen ] = useState(false)
    const { user , logout } = useAuth()
    let navigate = useNavigate();


    function   handleToggleDropdown () {
        setIsOpen(!isOpen)
    }

    function handlelogout(){
      logout()
      navigate('/login-user')
    }

    
    return(
        <>
            <div className="profile-container">
      <div className="profile-button" onClick={handleToggleDropdown}>
        <img src="https://placeholder.co/40" className="profile-image" />
        <div className="profile-info">
          <span className="profile-name">{user.data.name} {user.data.lastName}</span>
          <span className="profile-email">{user.data.email}</span>
        </div>
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="menu-item">
            <FaUser className="icon" /> View Profile
          </div>
          <div className="menu-item">
            <FaCog className="icon" /> Account Settings
          </div>
          <div className="menu-item">
            <FaBell className="icon" /> Notifications
          </div>
          <div className="menu-item">
            <FaExchangeAlt className="icon" /> Switch Account
          </div>
          <div className="menu-item">
            <FaQuestionCircle className="icon" /> Help Center
          </div>
          <div className="menu-item logout" onClick={handlelogout}>
            <FaSignOutAlt className="icon" /> Logout
          </div>
        </div>
      )}
    </div>
        </>
    )
}