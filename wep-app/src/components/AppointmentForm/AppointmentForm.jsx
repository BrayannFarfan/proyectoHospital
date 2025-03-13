// src/components/AppointmentForm.jsx
import React, { useState, useRef } from 'react';
import { InputContent } from '../ContainerInput/InputContent';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TimePickerContainer } from '../TimePicker/TimePickerContainer';
import { useDoctor } from '../../context/DoctorProvider';
import { useAppointment } from '../../context/Appointment';
import { LoginFailedModal } from '../LoginFailedModal/LoginFailedModal';
import { useNavigate } from 'react-router';

export const AppointmentForm = () => {
  const { specialties, selectedSpecialty, setSelectedSpecialty, getDoctorsBySpecialty } = useDoctor();
  const { patientId, createAppointment } = useAppointment();
  const [isErrorModalOpen, setIsErrorModal] = useState(false); 
  const [isSuccessModalOpen, setIsSuccessModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const timeInputRef = useRef(null);
  const timePickerRef = useRef(null);

  const user = JSON.parse(localStorage.getItem('user')) || {};
  const userData = user.data || {};

  const [formData, setFormData] = useState({
    name: '' || userData.name,
    email:'' || userData.email,
    mobile: '' || userData.phone,
    date: new Date('2025-03-10'),
    time: { hour: 9, minute: 25, period: 'PM' }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecialtyChange = (e) => {
    const specialtyId = parseInt(e.target.value);
    setSelectedSpecialty(specialties.find((s) => s.id === specialtyId));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, date }));
  };

  const handleTimeChange = (time) => {
    setFormData((prev) => ({ ...prev, time }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientId) {
      setErrorMessage('Error: Patient ID not found. Please make sure you are logged in.');
      setIsErrorModal(true)
      return;
    }

    const selectedDoctor = selectedSpecialty?.medics?.find(
      (doc) => `${doc.name} ${doc.lastName}` === formData.doctor
    );
    const medicId = selectedDoctor?.id || null;

    if (!medicId) {
      setErrorMessage('Doctor ID not found. Please select a doctor.');
      setIsErrorModal(true)
      return;
    }

    const specialtyId = selectedSpecialty?.id || null;

    if (!specialtyId) {
      setErrorMessage('Specialty ID not found. Please select a specialty.');
      setIsErrorModal(true)
      return;
    }

    const appointmentData = {
        date: formData.date.toISOString().split('T')[0], 
        time: convertTo24Hour(formData.time), 
        specialtyId: specialtyId,
        PatientId: patientId,
        MedicId: medicId,
      };

    try {
      const response = await createAppointment(appointmentData);
      setIsSuccessModal(true);
      return;
    } catch (error) {
      setErrorMessage(` ${error.message}`);
      setIsErrorModal(true)
    }
  };

  const convertTo24Hour = (time) => {
    let hours = time.hour;
    if (time.period === 'PM' && hours !== 12) hours += 12;
    if (time.period === 'AM' && hours === 12) hours = 0;
    return `${hours < 10 ? `0${hours}` : hours}:${time.minute < 10 ? `0${time.minute}` : time.minute}`;
  };

  
  function onCloseError (){
    setIsErrorModal(false)
}
function onCloseSuccess(){
    setIsSuccessModal(false);
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
              value={formData.doctor}
              onChange={handleChange}
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
        <div className="form-row">
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="date-picker"
            placeholderText="Select Date"
            minDate={new Date('2025-03-01')}
            maxDate={new Date('2025-03-31')}
            showMonthYearPicker={false}
            showYearDropdown={false}
            dropdownMode="select"
          />
          <TimePickerContainer
            time={formData.time}
            onTimeChange={handleTimeChange}
            inputRef={timeInputRef}
            pickerRef={timePickerRef}
          />
        </div>
        <button type="submit" className="book-btn">Book Appointment</button>
      </form>
      <LoginFailedModal
        isOpen={ isErrorModalOpen} 
        onClose={onCloseError} 
        title="Error booking appointment"
        message={errorMessage}
        primaryButtonText="Try Again" 
      />
      <LoginFailedModal 
        isOpen={ isSuccessModalOpen} 
        onClose={onCloseSuccess} 
        title="Succeses Appointment"
        message="Appointment booked successfully!"
        primaryButtonText="Close"   
      />
    </>
  );
};