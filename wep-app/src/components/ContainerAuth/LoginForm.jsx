import { useState } from "react";
import { InputContent } from "../ContainerInput/InputContent";
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../../context/AuthProvider'



export const LoginForm = () => {

    const [ email , setEmail] = useState('')
    const [ password , setPassword] = useState('')
    const { login, loading, error } = useAuth()
    let navigate = useNavigate();


    const handleSubmit =  async (e) =>{
        e.preventDefault();
        const success = await login({ email , password })
        if (success) {
            navigate('/dashboard-patient');
        } else {
            console.log("Error al iniciar sesión");
            TODO:'MOSTRAR AL USUARIO ALGO'
        }
    }



    return (

        <>
        <form 
            onSubmit={handleSubmit}
         >
            <div>
                <label> Email Adress</label>
                <InputContent type={'text'} placeholder={'Email'} value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
                <label> Password</label>
                <InputContent type={'password'} placeholder={'Password'} value={password} onChange={(e) =>setPassword(e.target.value)}/>
            </div>
            <button type="submit" disabled={loading}>
                {
                    loading ? 'Cargando....' : 'Sign in'
                }                    
            </button>
            <p>
                 Don't have an account? <Link to={'/register-user'}>Sign up</Link>
            </p>
        </form>
        </>
    )
}