import { useEffect, useState } from "react";
import { useAppointment } from "../../context/Appointment"
import { useParams } from "react-router"
import "./doctorDetail.css";


export const DoctorDetailAppointment = () => {

    
    const { id } = useParams();
    const { availabilityAppointment, getaVailableAppointments } = useAppointment(); 
    const [selectedDate, setSelectedDate] = useState("");  
    const [ availableDates, setAvailableDates ] = useState([]); 
    const [ availableTimes , setAvailableTimes ] = useState([]);

    useEffect(() => {
     const fetchAvailableAppointments = async () => {
        try {
            const data = await getaVailableAppointments(id);
            
            const dates = Object.keys(data);
            setAvailableDates(dates); 

        } catch (error) {   
            console.error("Error fetching available appointments:", error);
        }
        };
    fetchAvailableAppointments()
    }, [id])
    
    
    useEffect(() => {
    if (selectedDate && availabilityAppointment[selectedDate]) {
        setAvailableTimes(availabilityAppointment[selectedDate]);
        } else {
        setAvailableTimes([]);
        }
    }, [selectedDate, availabilityAppointment]);


    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };



    return (
        <>
            <div className="appointment-card">
                <div className="appointment-header">
                    <h3>Book Appointment</h3>
                    <p>Monday to Friday: 09:00AM–05:00PM</p>
                    </div>
                    <div className="appointment-form">
                        <label>
                             
                                <select
                                className={`appointment-form-date ${selectedDate === "" ? "placeholder" : ""}`}
                                value={selectedDate}
                                onChange={handleDateChange}>
                                <option className="appointement-option" value="" >-- Select a date --</option>
                                {availableDates.map((date) => (
                                    <option key={date} value={date}>
                                        {
                                            new Date(date).toLocaleDateString('es-AR', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                            }).replace(/ de /g, ' ')
                                        }
                                    </option>
                                ))}
                            </select>
                            
                        </label>

                         <label>
                        <select className="appointment-form-time">
                            <option  value="">-- Select time --</option>
                            {availableTimes.map((time, idx) => {
                            const label = `${time.hour}:${time.minute
                                .toString()
                                .padStart(2, "0")} ${time.period}`;
                            return (
                                <option key={idx} value={label}>
                                {label}
                                </option>
                            );
                            })}
                        </select>
                        </label>

                    <div className="services">
                        <p>Choose Service</p>
                        <label>
                        <div>
                            <input type="checkbox" name="service" /> 
                            <span>New Patient Visit{" "}</span>
                        </div>
                        <span>$40</span>
                        </label>
                        <label>
                        <div>
                            <input type="checkbox" name="service" /> 
                            <span>General Consultation{" "}</span>
                        </div>
                        <span>$50</span>
                        </label>
                        <label>
                        <div>
                            <input type="checkbox" name="service" /> <span>Back Pain{" "}</span>
                        </div>
                        <span>$60</span>
                        </label>
                        <label>
                        <div>
                            <input type="checkbox" name="service" /><span> Diabetes Consultation{" "}</span>
                        </div>
                        <span>$35</span>
                        </label>
                    </div>

                    <button className="book-btn">Book Appointment</button>
                </div>
            </div>
        </>
    )
}