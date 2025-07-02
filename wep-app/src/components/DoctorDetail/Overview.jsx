import React, { useState } from 'react';
import { useDoctor } from '../../context/DoctorProvider';

const Overview = () => {
  const { oneDoctor } = useDoctor();
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const services = [
    {
      title: "General Consultation",
      description: "Comprehensive medical examination and health assessment for diagnosis and treatment planning.",
      details: "Includes physical examination, medical history review, and personalized treatment recommendations.",
      price: "$75"
    },
    {
      title: "Preventive Care",
      description: "Regular health screenings and preventive measures to maintain optimal health.",
      details: "Health screenings, vaccinations, lifestyle counseling, and early disease detection.",
      price: "$50"
    },
    {
      title: "Specialist Treatment",
      description: `Specialized medical care in ${oneDoctor?.data.specialty.name || 'various medical areas'}.`,
      details: "Advanced treatment options, specialized procedures, and expert medical care tailored to your specific needs.",
      price: "$120"
    },
    {
      title: "Follow-up Care",
      description: "Ongoing monitoring and adjustment of treatment plans for optimal health outcomes.",
      details: "Regular check-ups, treatment progress monitoring, and medication adjustments as needed.",
      price: "$45"
    }
  ];
  
  return (
    <div className="tab-content">
    <h3>About Dr. {oneDoctor?.data.name} {oneDoctor?.data.lastName}</h3>
    <div className="overview-section">
        <div className="info-card">
          {oneDoctor?.data.description ? (
            <p>{oneDoctor.description}</p>
          ) : (
            <p>No description available.</p>
          )}
        </div>
        <h3>Specialty</h3>
        <div className="info-card">
          <p>As a specialist in {oneDoctor?.data.specialty.name || 'medicine'}, Dr. {oneDoctor?.data.name} {oneDoctor?.data.lastName} has years of experience and specialized training to provide the best medical care to patients. Their dedication and knowledge in this area make them an excellent choice for your medical attention.</p>
        </div>
        <h3>Educational Background</h3>
        <div className="info-card">
          <p>Dr. {oneDoctor?.data.name} {oneDoctor?.data.lastName} has completed extensive medical education and training to provide exceptional healthcare services.</p>
          <ul>
            <li>Medical Degree from prestigious medical university</li>
            <li>Specialized residency training in {oneDoctor?.data.specialty.name || 'internal medicine'}</li>
            <li>Board certification in {oneDoctor?.data.specialty.name || 'medicine'}</li>
            <li>Continuing medical education and professional development</li>
            <li>Active member of professional medical associations</li>
          </ul>
        </div>
        <h3>Offered Services</h3>
        <div className="info-card">
          <p>Dr. {oneDoctor?.data.name} {oneDoctor?.data.lastName} offers a comprehensive range of medical services to ensure the best possible care for all patients.</p>
          <div className="accordion-container">
            {services.map((service, index) => (
              <div key={index} className="accordion-item">
                <div 
                  className="accordion-header" 
                  onClick={() => toggleAccordion(index)}
                >
                  <h4>{service.title}</h4>
                  <div className="accordion-right">
                    <span className="service-price">{service.price}</span>
                    <span className={`accordion-icon ${openAccordion === index ? 'open' : ''}`}>+</span>
                  </div>
                </div>
                <div className={`accordion-content ${openAccordion === index ? 'open' : ''}`}>
                  <p>{service.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
