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
    const { login, loading, error} = useAuth()
    let navigate = useNavigate();
    const [isErrorModalOpen, setIsErrorModal] = useState(false); 
    const [isSuccessModalOpen, setIsSuccessModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')


    const handleSubmit =  async (e) =>{
        e.preventDefault();
    if (!email || !password) {
        setErrorMessage('Please enter both email and password.');
        setIsErrorModal(true);
        return;
      }
  
      try {
        const success = await login({ email, password });
        if (success) {
          setIsSuccessModal(true);
        }else{
            setErrorMessage('Invalid email or password. Please try again.')
            setIsErrorModal(true)
        }
      } catch (error) {
        setIsErrorModal(true);
      }
    }

    function onCloseError (){
        setIsErrorModal(false)
        setEmail('')
        setPassword('')
    }

    const onCloseSuccess = () => {
        setIsSuccessModal(false);
        navigate('/'); 
      };

    return (

        <>
        <section className="login_container">
            <WelcomeMessage 
                    title="Welcome Back" 
                    description="Log in to your account and we'll get you in to see our doctors."
            />
            <form 
                className="form_login"
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
                <button className="btn_login" type="submit" disabled={loading}>
                    {
                        loading ? 'Cargando....' : 'Sign in'
                    }                    
                </button>
                <p className="signup_link">
                    Don't have an account? <Link to={'/register-user'}>Sign up</Link>
                </p>
            </form>
            <LoginFailedModal 
                isOpen={ isErrorModalOpen} 
                onClose={onCloseError} 
                title="Login Failed"
                message={errorMessage}
                primaryButtonText="Try Again"   
            />

            <LoginFailedModal 
                isOpen={ isSuccessModalOpen} 
                onClose={onCloseSuccess} 
                title="Login Succeses"
                message="Welcome"
                primaryButtonText="Close"   
            />


        </section>
        </>
    )
}