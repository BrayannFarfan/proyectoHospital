import React from 'react';
import { useDoctor } from '../../context/DoctorProvider';

const Experience = () => {
  const { oneDoctor } = useDoctor();
  
  const specialty = oneDoctor?.data.specialty.name || 'Medicine';
  const doctorName = oneDoctor?.data.name || 'Doctor';
  
  // Generate experience based on specialty
  const getExperienceData = () => {
    const baseExperience = [
      {
        title: `Senior ${specialty} Specialist`,
        period: "2018 - Present",
        location: "General Hospital Medical Center",
        description: `Leading a specialized team in ${specialty.toLowerCase()}, performing advanced procedures, and developing innovative treatment protocols for patients with complex ${specialty.toLowerCase()} conditions.`
      },
      {
        title: `${specialty} Consultant`,
        period: "2015 - 2018",
        location: "St. Mary's Medical Center",
        description: `Specialized in advanced ${specialty.toLowerCase()} procedures and patient care, maintaining excellent treatment outcomes and patient satisfaction rates.`
      },
      {
        title: `${specialty} Fellow`,
        period: "2012 - 2015",
        location: "Mayo Clinic",
        description: `Advanced training in ${specialty.toLowerCase()}, working under world-renowned specialists to develop expertise in cutting-edge treatment methods and patient care.`
      }
    ];
    
    return baseExperience;
  };
  
  const getAchievements = () => {
    return [
      `Over 2,000+ successful ${specialty.toLowerCase()} procedures and treatments`,
      `Published 25+ research papers in ${specialty.toLowerCase()} journals`,
      `Recipient of Excellence in ${specialty} Award 2020`,
      `Board certified by American Board of ${specialty}`,
      `Active member of International ${specialty} Association`
    ];
  };
  
  const experienceData = getExperienceData();
  const achievements = getAchievements();

  return (
    <div className="tab-content">
      <h3>Professional Experience</h3>
      <div className="overview-section">
        {experienceData.map((exp, index) => (
          <div key={index} className="info-card">
            <div className="experience-header">
              <h4>{exp.title}</h4>
              <span className="experience-period">{exp.period}</span>
            </div>
            <p className="experience-location">{exp.location}</p>
            <p className="experience-description">{exp.description}</p>
          </div>
        ))}

        <h3>Key Achievements</h3>
        <div className="info-card">
          <ul>
            {achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Experience;
