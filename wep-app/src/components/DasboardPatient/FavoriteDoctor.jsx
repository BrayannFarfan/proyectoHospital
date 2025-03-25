import { FaHeart, FaMapMarkerAlt, FaTrophy } from "react-icons/fa";
import { Sidebar } from "./Sidebar"
import { Link } from "react-router";
import { useAuth } from "../../context/AuthProvider";
import { useEffect, useState } from "react";




export const FavoriteDoctor = () =>{

    const { user} = useAuth()
    
    const [favoritesDoctor , setFavoritesDoctor ] = useState([])

    useEffect(() => {
        const favoritesDoctor = JSON.parse(localStorage.getItem('favorites'))
        setFavoritesDoctor(favoritesDoctor)
    }, [])
    

    function handleFavoriteToggle( doctorId){
        const updatedFavorites = favoritesDoctor.filter((doctor) => doctor.id !== doctorId);
    

    setFavoritesDoctor(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    }
    
    if (!user) {
        return null;
      }

    return(
        <>
            <div className="dashboard-container">
                <Sidebar />
                <main className="dashboard-main">
                    <div className="dashboard-content">
                        <h1>Favorites Doctors</h1>
                    </div>
                    <div className="favorites-cards">
                        <div className="favorite-container-text">
                            {favoritesDoctor.length >0 && <p className="favorite-text">Favourite List</p>}
                        </div>
                    {
                        favoritesDoctor.length === 0 ?
                        <div className="favorite-container-text">
                            <p className="favorite-message">There are no doctors</p> 
                        </div>
                        :
                        favoritesDoctor.map((favorite,index ) =>{
                            return(
                                <div className="doctors-grid" key={index}>
                                    <div className="doctor-card" > 
                                    <Link to="/doctor-detail" className="container_doctor">
                                    <div className="doctor-image">
                                        <img src={`http://localhost:3000/${favorite.profilePic}`} alt={favorite.name} />
                                        <span className="heart-icon" onClick={(e) => { e.preventDefault(); handleFavoriteToggle(favorite.id); }}>
                                            <FaHeart color={'#ff0000'} /> 
                                        </span>
                                    </div>
                                    <div className="doctor-info">
                                        <h3>{favorite.title || 'DOCTOR'}</h3>
                                        <h4>{favorite.name} {favorite.lastName}</h4>
                                        <p>{(favorite.description || 'No description available').substring(0, 50)}...</p>
                                        <div className="rating">
                                        {'★'.repeat(Math.floor(favorite.rating || 4)) +
                                            '☆'.repeat(5 - Math.floor(favorite.rating || 4))}
                                        <span>({favorite.rating || 4})</span>
                                        <FaTrophy />
                                        </div>
                                        <div className="views">~ {favorite.views || 854} Views</div>
                                    </div>
                                    </Link>
                                    <div className="doctor_search">
                                    <Link to="/doctors-map" className="doctor_map"> 
                                        <FaMapMarkerAlt /> View on map
                                    </Link>
                                    <Link to="/appointment" className="book-btn">
                                        Book now
                                    </Link>
                                    </div>
                                    </div>
                                </div>
                            )}
                        )   
                    }
                    </div>
                </main>
            </div>
        </>
    )
}