import "./doctorDetail.css";
import { DoctorDetailAppointment } from "./DoctorDetailAppointment.jsx";
import { DoctorDetailCard } from "./DoctorDetailCard.jsx";

const DoctorDetail = () => {
   
  return (
    <div className="detail_container">

        <DoctorDetailCard/>

       <div className="detail_doctor-resume">
         <div className="tabs">
          <button>Overview</button>
          <button>Experience</button>
          <button>Location</button>
          <button>Reviews</button>
        </div>
      </div>

      <DoctorDetailAppointment/>
    </div>
    
  );
};

export default DoctorDetail;
