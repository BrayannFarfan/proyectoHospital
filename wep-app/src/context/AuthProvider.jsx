import { createContext, useContext, useState, useEffect } from "react";


const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
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
            if (!response.ok) throw new Error('Error de autenticación');
            

            const userData = await response.json();
            const expirationTime = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
       
            localStorage.setItem('user', JSON.stringify(userData))
            localStorage.setItem('expiration', expirationTime.toString()); 

            setUser(userData)
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
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify( registrations ),
            })
            if (!response.ok) throw new Error('Error al registrarse');

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

    return (
        <AuthContext.Provider
            value={{login, user, logout, loading, error, register }}
        >

            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(AuthContext);
  };