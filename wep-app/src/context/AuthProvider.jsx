import { createContext, useContext, useState, useEffect } from "react";


const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [ doctor , setDoctor ] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


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
        localStorage.removeItem('user');
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

    return (
        <AuthContext.Provider
            value={{login, user, logout, loading, error, register, forgotPassword, resetPassword }}
        >

            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(AuthContext);
  };