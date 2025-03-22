import { Link } from "react-router";

export const MenuItem = ({ icon, label, active, badge, onClick, to }) => {
    return (
      <Link to={to} className={`menu-item ${active ? 'active' : ''}`} onClick={onClick}>
        <span className="menu-icon">{icon}</span>
        <span className="menu-label">{label}</span>
        {badge && <span className="menu-badge">{badge}</span>}
      </Link>
    );
  };