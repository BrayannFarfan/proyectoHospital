import React, { useState, useEffect } from 'react';
import { InputContent } from '../ContainerInput/InputContent';
import { useDoctor } from '../../context/DoctorProvider';
import { useAppointment } from '../../context/Appointment';
import { LoginFailedModal } from '../LoginFailedModal/LoginFailedModal';
import { useNavigate } from 'react-router';
import './AppointmentForm.css';

export const AppointmentForm = () => {
  const { specialties, selectedSpecialty, setSelectedSpecialty, getDoctorsBySpecialty } = useDoctor();
  const { patientId, createAppointment } = useAppointment();
  const [isErrorModalOpen, setIsErrorModal] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [availabilityByDate, setAvailabilityByDate] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user')) || {};
  const userData = user || {};

  const [formData, setFormData] = useState({
    name: userData.name || '',
    email: userData.email || '',
    mobile: userData.phone || '',
    doctorId: '',
    date: null,
    time: null,
  });



  useEffect(() => {
    const fetchAvailableTimes = async () => {
      if (!formData.doctorId) {
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/medic/${formData.doctorId}/availability`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch available times');
        }
        const data = await response.json();

        if (data.message && data.message.includes('No schedules or dates available')) {
          setAvailabilityByDate({ message: data.message });
          setSelectedDate(null);
          setFormData((prev) => ({ ...prev, date: null, time: null }));
        } else {
          setAvailabilityByDate(data);
        }
      } catch (error) {
        setErrorMessage(`Error fetching availability: ${error.message}`);
        setIsErrorModal(true);
      }
    };

    fetchAvailableTimes();
  }, [formData.doctorId]);

  useEffect(() => {
  }, [availabilityByDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecialtyChange = (e) => {
  const specialtyId = parseInt(e.target.value);
  const newSpecialty = specialties.find((s) => s.id === specialtyId);
  
  setSelectedSpecialty(newSpecialty);

  const firstDoctor = newSpecialty?.medics?.[0];
  const doctorId = firstDoctor?.id || '';
  const doctorFullName = firstDoctor ? `${firstDoctor.name} ${firstDoctor.lastName}` : '';

  setFormData((prev) => ({
    ...prev,
    doctorId:'',
    doctor: '',
    date: null,
    time: null
  }));

  setSelectedDate(null);
  setAvailabilityByDate({});
};

  const handleDoctorChange = (e) => {
    const doctorFullName = e.target.value;
    const selectedDoctor = selectedSpecialty?.medics?.find(
      (doc) => `${doc.name} ${doc.lastName}` === doctorFullName
    );
    const doctorId = selectedDoctor?.id || '';
    setFormData((prev) => ({ ...prev, doctorId, doctor: doctorFullName, date: null, time: null }));
    setSelectedDate(null);
    setAvailabilityByDate({});
  };

      const formatDate = (date) => {
      return new Date(date).toLocaleDateString('es-AR', {
          day: '2-digit',
          month: 'short',
        }).replace(/ de /g, ' ');
      };

  const handleDateSelect = (date) => {
        const formattedDate = formatDate(date);
    
    if (!availabilityByDate.message && Object.keys(availabilityByDate).length > 0) {
      setSelectedDate(date);
      setFormData((prev) => ({ ...prev, date: new Date(date), time: null }));
    }
  };

  const handleTimeSelect = (time) => {
    if (!availabilityByDate.message) {
      setFormData((prev) => ({ ...prev, time }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientId) {
      setErrorMessage('Error: Patient ID not found. Please make sure you are logged in.');
      setIsErrorModal(true);
      return;
    }

    if (!formData.doctorId) {
      setErrorMessage('Doctor ID not found. Please select a doctor.');
      setIsErrorModal(true);
      return;
    }

    const specialtyId = selectedSpecialty?.id || null;
    if (!specialtyId) {
      setErrorMessage('Specialty ID not found. Please select a specialty.');
      setIsErrorModal(true);
      return;
    }

    if (!formData.date) {
      setErrorMessage('Please select a date.');
      setIsErrorModal(true);
      return;
    }

    if (!formData.time) {
      setErrorMessage('Please select a time.');
      setIsErrorModal(true);
      return;
    }

    const appointmentData = {
      date: formData.date.toISOString().split('T')[0], // Formato YYYY-MM-DD
      time: convertTo24Hour(formData.time),
      specialtyId,
      PatientId: patientId,
      MedicId: formData.doctorId,
    };

    try {
      await createAppointment(appointmentData);
      const response = await fetch(
        `http://localhost:3000/medic/${formData.doctorId}/availability`
      );
      if (response.ok) {
        const data = await response.json();
        setAvailabilityByDate(data.message ? { message: data.message } : data);
        setSelectedDate(null);
        setFormData((prev) => ({ ...prev, date: null, time: null }));
      }
      setIsSuccessModal(true);
    } catch (error) {
      setErrorMessage(` ${error.message}`);
      setIsErrorModal(true);
    }
  };

  const convertTo24Hour = (time) => {
    let hours = time.hour;
    if (time.period === 'PM' && hours !== 12) hours += 12;
    if (time.period === 'AM' && hours === 12) hours = 0;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = time.minute < 10 ? `0${time.minute}` : time.minute;
    return `${formattedHours}:${formattedMinutes}`;
  };

  const formatTime = (time) => {
    return `${time.hour < 10 ? `0${time.hour}` : time.hour}:${time.minute < 10 ? `0${time.minute}` : time.minute} ${time.period}`;
  };

  function onCloseError() {
    setIsErrorModal(false);
  }

  function onCloseSuccess() {
    setIsSuccessModal(false);
    navigate('/dashboard-user');
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-row">
          <InputContent
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <InputContent
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <InputContent
            type="tel"
            name="mobile"
            placeholder="Your Mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          <select
            name="specialty"
            value={selectedSpecialty?.id || ''}
            onChange={handleSpecialtyChange}
            required
          >
            <option value="" disabled>Choose Specialty</option>
            {specialties.map((specialty) => (
              <option key={specialty.id} value={specialty.id}>
                {specialty.name}
              </option>
            ))}
          </select>
        </div>
        {selectedSpecialty && (
          <div className="doctor-list">
            <h4>Doctors in {selectedSpecialty.name}</h4>
            <select
              name="doctor"
              value={formData.doctor || ''}
              onChange={handleDoctorChange}
              required
              className="doctor-choose"
            >
              <option value="" disabled>Choose Doctor</option>
              {selectedSpecialty.medics.map((doc) => (
                <option key={doc.id} value={`${doc.name} ${doc.lastName}`}>
                  {doc.name} {doc.lastName}
                </option>
              ))}
            </select>
          </div>
        )}
        {availabilityByDate.message && (
          <div className="availability-section">
            <p className="no-availability-message">{availabilityByDate.message}</p>
          </div>
        )}
        {!availabilityByDate.message && Object.keys(availabilityByDate).length > 0 && (
          <div className="availability-section">
            <h4>Available Dates</h4>
            <div className="date-buttons">
              {Object.keys(availabilityByDate).map((date) => (
                <button
                  type="button"
                  key={date}
                  onClick={() => handleDateSelect(date)}
                  className={`date-button ${selectedDate === date ? 'selected' : ''}`}
                >
                  {formatDate(date)}
                </button>
              ))}
            </div>
          </div>
        )}
        {selectedDate && !availabilityByDate.message && availabilityByDate[selectedDate] && (
          <div className="availability-section">
            <h4>Available Times</h4>
            <div className="time-buttons">
              {availabilityByDate[selectedDate].map((time, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => handleTimeSelect(time)}
                  className={`time-button ${
                    formData.time &&
                    formData.time.hour === time.hour &&
                    formData.time.minute === time.minute &&
                    formData.time.period === time.period
                      ? 'selected'
                      : ''
                  }`}
                >
                  {formatTime(time)}
                </button>
              ))}
            </div>
          </div>
        )}
        <button type="submit" className="book-btn">Book Appointment</button>
      </form>
      <LoginFailedModal
        isOpen={isErrorModalOpen}
        onClose={onCloseError}
        title="Error booking appointment"
        message={errorMessage}
        primaryButtonText="Try Again"
      />
      <LoginFailedModal
        isOpen={isSuccessModalOpen}
        onClose={onCloseSuccess}
        title="Success Appointment"
        message="Login to your control panel to confirm your appointment"
        primaryButtonText="Close"
      />
    </>
  );
};