import "./doctorDetail.css";
import { DoctorDetailAppointment } from "./DoctorDetailAppointment.jsx";
import { DoctorDetailCard } from "./DoctorDetailCard.jsx";
import DoctorResumeDetail from "./DoctorResumeDetail.jsx";

const DoctorDetail = () => {
  return (
    <div className="detail_container">
      <DoctorDetailCard />
      <DoctorResumeDetail />
      <DoctorDetailAppointment />
    </div>
  );
};

export default DoctorDetail;
