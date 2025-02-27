import { useState } from "react";
import { InputContent } from "../ContainerInput/InputContent";
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthProvider';
import { LoginFailedModal } from '../LoginFailedModal/LoginFailedModal';
import './loginForm.css';
import { WelcomeMessage } from "../WelcomeMessage/WelcomeMessage";



export const LoginForm = () => {

    const [ email , setEmail] = useState('')
    const [ password , setPassword] = useState('')
    const { login, loading, error } = useAuth()
    const [ isModalOpen , setIsModal ] = useState(false)
    let navigate = useNavigate();


    const handleSubmit =  async (e) =>{
        e.preventDefault();
        const success = await login({ email , password })
        if (success) {
            navigate('/');
        } else {
            setIsModal(true);
        }
    }

    function onClose (){
        setIsModal(false)
        setEmail('')
        setPassword('')
    }

    return (

        <>
        <section className="login_container">
            <WelcomeMessage 
                    title="Welcome Back" 
                    description="Log in to your account and we'll get you in to see our doctors."
            />
            <form 
                
                onSubmit={handleSubmit}
                >
                <div className="input_group">
                    <label> Email Adress</label>
                    <InputContent 
                        type={'text'}
                        placeholder={'Email'} 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="input_group">
                    <label> Password</label>
                    <InputContent type={'password'} placeholder={'Password'} value={password} onChange={(e) =>setPassword(e.target.value)}/>
                    <Link 
                    to={'/forgot-password'}
                    className="forgot_password"
                    >
                        Forgot Password?
                    </Link>
                </div>
                <button type="submit" disabled={loading}>
                    {
                        loading ? 'Cargando....' : 'Sign in'
                    }                    
                </button>
                <p className="signup_link">
                    Don't have an account? <Link to={'/register-user'}>Sign up</Link>
                </p>
            </form>
            <LoginFailedModal isOpen={ isModalOpen} onClose={onClose} />
        </section>
        </>
    )
}