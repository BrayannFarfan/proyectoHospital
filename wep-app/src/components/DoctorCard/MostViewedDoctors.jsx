import React from 'react';
import './MostViewedDoctors.css';
import {  useDoctor } from '../../context/DoctorProvider'; 
import DoctorData from './DoctorData';
import { Link } from 'react-router';

export const MostViewedDoctors = ({ limit = 6 }) => {
  const { loading, error } = useDoctor();

  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="most-viewed-doctors">
      <h2>Most Viewed Doctors</h2>
      <p>
        Usu habeo equidem no sanctus. Suus sumo id sed, erat erant apporteat cu pri.
      </p>
      <DoctorData limit={limit} />
      <Link
        className="view-all-btn"
        to={'/all-doctor'}
      >
        View all Doctors
      </Link>
    </section>
  );
};
