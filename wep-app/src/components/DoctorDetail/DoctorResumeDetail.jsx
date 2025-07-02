import React, { useState } from 'react';
import './doctorDetail.css';
import TabNavigation from './TabNavigation';
import Overview from './Overview';
import Experience from './Experience';
import Location from './Location';
import Reviews from './Reviews';

const DoctorResumeDetail = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'experience':
        return <Experience />;
      case 'location':
        return <Location />;
      case 'reviews':
        return <Reviews />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="detail_doctor-resume">
      <TabNavigation activeTab={activeTab} onTabClick={handleTabClick} />
      <div className="tab-content-container">
        {renderContent()}
      </div>
    </div>
  );
};

export default DoctorResumeDetail;
