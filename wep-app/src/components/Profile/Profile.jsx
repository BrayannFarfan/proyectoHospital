import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { FaUser, FaCog, FaBell, FaExchangeAlt, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import './profile.css';



export const Profile = () => {

    const [ isOpen , setIsOpen ] = useState(false)
    const { user , logout } = useAuth()
    
    let navigate = useNavigate();
    
    const profilePicUrl = user.profilePic
    ? `http://localhost:3000/${user.profilePic}`
    : 'http://localhost:3000/uploads/placeholder/placeholder.jpg';
    function   handleToggleDropdown () {
        setIsOpen(!isOpen)
    }

    function handlelogout(){
      logout()
      navigate('/')
    }

    
    return(
        <>
            <div className="profile-container">
      <div className="profile-button" onClick={handleToggleDropdown}>
        <img src={profilePicUrl} className="profile-image" />
        <div className="profile-info">
          <span className="profile-name">{user.name} {user.lastName}</span>
          <span className="profile-email">{user.email}</span>
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