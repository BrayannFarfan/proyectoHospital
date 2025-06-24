import React, { useState } from 'react';
import './MostViewedDoctors.css';
import {  useDoctor } from '../../context/DoctorProvider'; 
import DoctorData from './DoctorData';

export const MostViewedDoctors = () => {
  const { loading, error , doctors} = useDoctor();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 4;

  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p>Error: {error}</p>;

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedDoctors = doctors.data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(doctors.data.length / limit);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="most-viewed-doctors">
      <h2>Most Viewed Doctors</h2>
      <p>
        Discover top doctors, book appointments, and access expert care effortlessly with us.
      </p>
      <DoctorData limit={limit} doctors={paginatedDoctors}/>
      <div className="pagination">
        <button
          className="view-all-btn"
          onClick={handlePreviousPage}
          disabled={currentPage <= 1}
        >
          Previous
        </button>
        <button
          className="view-all-btn"
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
        <div>
        </div>
      </div>
    </section>
  );
};
