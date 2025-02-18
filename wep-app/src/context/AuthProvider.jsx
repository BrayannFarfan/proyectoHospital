import { createContext, useContext, useState } from "react";


const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
            setUser(userData)
            localStorage.setItem('user', JSON.stringify(userData))
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
        localStorage.removeItem('user')
    }



    return (
        <AuthContext.Provider
            value={{login, user, logout, loading, error }}
        >

            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(AuthContext);
  };