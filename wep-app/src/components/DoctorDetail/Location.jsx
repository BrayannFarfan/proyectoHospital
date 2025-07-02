import React from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import { FiPhone } from 'react-icons/fi';
import { MdEmail } from 'react-icons/md';

const Location = () => {
  return (
    <div className="tab-content">
      <h3>Location</h3>
      <div className="location-section-simple">
        {/* Map Section */}
        <div className="map-container-simple">
          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af15a23467%3A0x775c739c5b26e675!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1672854758456!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: '8px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NEW Apollo Hospital Location"
            ></iframe>
          </div>
        </div>

        <div className="clinic-info-simple">
          <h4>NEW Apollo Hospital</h4>
          <div className="clinic-details">
            <p className="clinic-detail-item">
              <IoLocationSharp className="detail-icon" />
              456 Apollo Medical Drive, Suite 789, New York, NY 10015
            </p>
            <p className="clinic-detail-item">
              <FiPhone className="detail-icon" />
              (555) 247-APOLLO
            </p>
            <p className="clinic-detail-item">
              <MdEmail className="detail-icon" />
              appointments@apollohospital.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
