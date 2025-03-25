import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { FaUser, FaCog, FaBell, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router';
import './profile.css';



export const Profile = () => {

    const [ isOpen , setIsOpen ] = useState(false)
    const { user , logout } = useAuth()
    
    let navigate = useNavigate();
    
    const profilePicUrl = user.profilePic
    ? `http://localhost:3000${user.profilePic}`
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
          <div >
            <Link to={'/my-profile'} className="menu-item">
              <FaUser className="icon" /> View Profile
            </Link>
          </div>
          <div >
            <Link to={'/dashboard-user'} className="menu-item">
              <FaCog className="icon" /> Account Settings
            </Link>
          </div>
          <div>
            <Link to={'/notifications'} className="menu-item">
              <FaBell className="icon" /> Notifications
            </Link>
          </div>
          <div >
            <Link to={'/help-center'} className="menu-item">
              <FaQuestionCircle className="icon" /> Help Center
            </Link>
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