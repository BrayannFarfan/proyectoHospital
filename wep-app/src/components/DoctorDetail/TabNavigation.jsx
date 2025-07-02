import React from 'react';
import { Link } from 'react-router';

const TabNavigation = ({ activeTab, onTabClick }) => {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'experience', label: 'Experience' },
    { id: 'location', label: 'Location' },
    { id: 'reviews', label: 'Reviews' }
  ];

  return (
    <div className="tabs">
      {tabs.map(tab => (
        <Link 
          key={tab.id}
          to="#" 
          className={`tab-link ${activeTab === tab.id ? 'active' : ''}`}
          onClick={(e) => { 
            e.preventDefault(); 
            onTabClick(tab.id); 
          }}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
};

export default TabNavigation;
