import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaShareAlt, FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import { MdPhonelinkRing } from "react-icons/md";
import "./doctorDetail.css";
import { useParams } from "react-router";
import { useDoctor } from "../../context/DoctorProvider";




export const DoctorDetailCard = () => {
    const [isFavorite, setIsFavorite] = useState(false);
    const { id } = useParams();
    const { oneDoctor, getDoctorById, loading, error } = useDoctor();
    
    const handleFavoriteToggle = () => {
        let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

        const token = localStorage.getItem("token");
        if (!token) {
        alert("You must log in first to add favorites.");
        return;
        }

        if (isFavorite) {
        favorites = favorites.filter((fav) => fav.id !== doctor.id);
        } else {
        favorites.push(doctor);
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
        setIsFavorite(!isFavorite);
    };

    useEffect(() => {
        getDoctorById(id)
    }, [id])
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!oneDoctor) return <p>No doctor found.</p>;
  
   
  return (
    <>
      <div className="detail_doctor-card">
        <div className="detail_doctor-info">
          <img
            src={`http://localhost:3000/${oneDoctor.data.profilePic}`}
            alt="Doctor"
            className="detail_doctor-photo"
          />
          <div>
            <div className="detail_doctor-header">
              <div>
                <h2 className="detail_doctor-name">Dr. {oneDoctor.data.name} {oneDoctor.data.lastName}</h2>
                <p className="detail_doctor-specialty">
                  Specialist in {oneDoctor.data.specialty.name}
                </p>
              </div>
              <div className="detail_doctor-icons">
                <FaShareAlt className="detail_doctor_share" />
                <span
                  className="detail_doctor_heart"
                  onClick={(e) => {
                    e.preventDefault();
                    handleFavoriteToggle();
                  }}
                >
                  <FaHeart color={isFavorite ? "#ff0000" : "#ccc"} />
                </span>
              </div>
            </div>
            <div>
              <p className="detail_doctor-description">
                {
                    oneDoctor.data.description || "No description available"
                }
              </p>
              <p className="detail_doctor-location">
                <FaMapMarkerAlt className="detail_map" /> 
                    {oneDoctor.data.address || "No address available " }
                | {" "}
                <Link className="detail_link" href="#">
                  View Map
                </Link>
              </p>
              <p className="detail_doctor-phone">
                <MdPhonelinkRing className="detail_phone" /> {oneDoctor.data.phone || "No phone number available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
