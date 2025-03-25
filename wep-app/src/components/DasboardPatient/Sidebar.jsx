// src/components/Dashboard/Sidebar.jsx
import { ProfileCard } from './ProfileCard';
import { MenuItem } from './MenuItem';
import { FaUser, FaHeart, FaCalendar, FaEnvelope, FaUserCircle, FaKey, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router';

export const Sidebar = () => {
  const { user, logout } = useAuth();
  
  const navigate = useNavigate();
  const favoritesDoctor = JSON.parse(localStorage.getItem('favorites'))

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if(!favoritesDoctor){
    return null
  }

  if (!user) {
    return null;
  }

  return (
    <aside className="sidebar">
      <ProfileCard user={user} />
      <nav className="sidebar-menu">
        <MenuItem icon={<FaUser />} label="Dashboard" active to='/dashboard-user'/>
        <MenuItem icon={<FaHeart />} label="Favourite Doctors" badge={favoritesDoctor.length} to='/favorites'/>
        <MenuItem icon={<FaCalendar />} label="Schedule Timing" to='/schedule-timing'/>
        <MenuItem icon={<FaEnvelope />} label="Messages" badge={20} to='/messages'/>
        <MenuItem icon={<FaUserCircle />} label="My Profile" to='/my-profile'/>
        <MenuItem icon={<FaKey />} label="Change Password" to='/change-password'/>
        <MenuItem icon={<FaKey />} label="Landing Page" to='/'/>
        <MenuItem icon={<FaSignOutAlt />} label="Logout" onClick={handleLogout} to={'/'}/>
      </nav>
    </aside>
  );
};