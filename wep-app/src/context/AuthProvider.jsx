import { createContext, useContext, useState, useEffect, useCallback } from "react";
import io from "socket.io-client";

const AuthContext = createContext()

const socket = io('http://localhost:3000',{
  transports: ["websocket", "polling"],
})

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [ doctor , setDoctor ] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [message, setMessage] = useState("");


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const expiration = localStorage.getItem('expiration');

        if (storedUser && expiration) {
            const now = new Date().getTime();
            if (now > parseInt(expiration, 10)) {
                localStorage.removeItem('user');
                localStorage.removeItem('expiration');
                setUser(null);
            } else {
                setUser(JSON.parse(storedUser));
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        const loadUser = async () => {
          try {
            // Ejemplo: Cargar el usuario desde localStorage o una API
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
              setUser(storedUser);
            }
          } catch (error) {
            console.error('Error loading user:', error);
          } finally {
            setLoading(false); 
          }
        };
    
        loadUser();
      }, []);

    const login = async ( credentials ) =>{
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:3000/auth/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(credentials),
            })
            
            const userData = await response.json();
            if (!response.ok) throw new Error( 'Authentication error, try again.');
            
            const expirationTime = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
       
            localStorage.setItem('user', JSON.stringify(userData.data))
            localStorage.setItem ('token', userData.token)
            localStorage.setItem('expiration', expirationTime.toString()); 

            setUser(userData.data)
            return true; 
            
        } catch (error) {
            setError(error.message);
            return false;
        }finally {
            setLoading(false);
          }
    }

    const logout = async ( ) =>{
        setUser(null)
        setAppointments([])
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
    }

    const register = async ( registrations ) =>{
        setLoading(true);
        setError(null);

        try {
            const response  = await fetch('http://localhost:3000/auth/register', {
                method:'POST',
                body: registrations ,
            })
            
            if (!response.ok) throw new Error(userData.message || 'Error al registrarse');
            const userData = await response.json();
            const expirationTime = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
       
            localStorage.setItem('user', JSON.stringify(userData))
            localStorage.setItem('expiration', expirationTime.toString()); 

            setUser(userData)
            return true; 
            

        } catch (error) {
            setError(error.message);
            return false;
        }finally{
            setLoading(false);
        }
    }

    const forgotPassword = async ( email ) => {
        
        setLoading(true);
        setError(null);

        try {
            const response  = await fetch('http://localhost:3000/forgot-password', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify( { email } ),
            })
            if (!response.ok) throw new Error('Error al enviar');
            return true; 
        } catch (error) {
            setError(error.message);
            return false;
        }finally{
            setLoading(false);
        }
    }

    const resetPassword = async ( email, newPassword) => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch('http://localhost:3000/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newPassword, email }),
          });
          const data = await response.json();
          console.log(data);
          
          if (!response.ok) throw new Error(data.message || 'Reset password failed');
          return data;
        } catch (err) {
          setError(err.message);
          throw err;
        } finally {
          setLoading(false);
        }
    };

    const getAppointment = useCallback(async (patientId) => {
        try {
          setError(null);
          const result = await fetch(`http://localhost:3000/patient/${patientId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!result.ok) {
            throw new Error(`Error ${result.status}: ${result.statusText}`);
          }
      
          const appointmentPatient = await result.json();
          // console.log('Datos recibidos del backend:', appointmentPatient.data.appointments);
          setAppointments(appointmentPatient.data.appointments || []);
          return appointmentPatient;
        } catch (error) {
          console.error('Error al obtener las citas del paciente:', error);
          setError(error.message);
          throw error;
        }
      }, []);


    const updateProfile = async (formData, profilePic) => {
        if (!user?.id) {
          throw new Error("No se encontró el ID del usuario. Por favor, inicia sesión nuevamente.");
        }
    
        const formDataToSend = new FormData();
        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
        }
        if (profilePic) {
          formDataToSend.append("profilePic", profilePic);
        }
    
        try {
          const response = await fetch(`http://localhost:3000/patient/${user.id}`, {
            method: "PUT",
            body: formDataToSend,
          });
    
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al actualizar el perfil");
          }
    
          const data = await response.json();
    
          const updatedUser = {
            ...user,
            ...formData,
            profilePic: data.data.profilePic || user.profilePic,
          };
    
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
    
          return { success: true, message: "Perfil actualizado con éxito" };
        } catch (error) {
          throw new Error(error.message || "Error al actualizar el perfil");
        }
      };
    
    const changePasswordDash = async (data ,userId) =>{ 
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:3000/change-password', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
            userId: userId,
          }),
        });
        const result = await response.json();
        console.log(result);
        
        if (!response.ok) throw new Error(result.message || 'Reset password failed');
        return result;
      } catch (err) {
        setError(err.message);
        throw err;
      }finally {
        setLoading(false);
      }

    }

  const confirmAppointment = async (appointmentId) => {
    try {
      const response = await fetch(`http://localhost:3000/appointment/${appointmentId}/confirm`,{
        method:'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId:user.id })
      })
      const result = await response.json()
      console.log(result);
      
      setMessage(result.message);
    } catch (err) {
      setMessage(err.result || "Error al confirmar la cita");
    }
  };

  const rejectAppointment = async (appointmentId) => {
    try {
      const response = await fetch(`http://localhost:3000/appointment/${appointmentId}/reject`,{
        method:'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId:user.id })
      });
      const result = await response.json()
      console.log(result);
      
      setMessage(result.message);
    } catch (err) {
      console.error("Error al rechazar la cita:", err);
      setMessage(err.message || "Error al rechazar la cita");
    }
  };

  useEffect(() => {
    if (!user) return;

    socket.on("appointmentUpdated", (data) => {
      const { appointmentId, status, patientId } = data;

      if (patientId === user.id) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === appointmentId ? { ...appointment, status } : appointment
          )
        );
        setMessage(`Cita ${status === "confirmed" ? "confirmada" : "rechazada"} con éxito`);
      }
    });

    return () => {
      socket.off("appointmentUpdated");
    };
  }, [user]);




    return (
        <AuthContext.Provider
            value={{login, user, logout, loading, error, register, forgotPassword, resetPassword ,getAppointment,appointments,updateProfile , changePasswordDash, confirmAppointment, rejectAppointment, message, setMessage}}
        >

            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(AuthContext);
  };