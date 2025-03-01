
import { useState } from 'react';
import { InputContent } from '../ContainerInput/InputContent';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthProvider';
import { WelcomeMessage } from '../WelcomeMessage/WelcomeMessage'
import './forgotPassword.css'

export const ForgotPass = () =>{

    const [ email , setEmail ] = useState('')
    const { forgotPassword, loading } = useAuth()
    let navigate = useNavigate();


    const handlePassword = async (e) => {
        e.preventDefault();

        await forgotPassword(email) 
        navigate('/login-user')
    }

    return(

        <>
           <div className='form_password'>
                <div className='form_heading'>
                    <WelcomeMessage 
                            title="Password Recovery" 
                            description="Enter your email address below to receive a link to reset your password."
                    />
                </div>
                <form onSubmit={handlePassword} className='form_content'>
                    <div className="form_group">
                        <InputContent 
                            type={'email'}
                            name='email'
                            placeholder={'Email'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className='form_btn' type="submit" disabled={loading}>
                            {
                                loading ? 'Loading....' : 'Send'
                            }                    
                        </button>
                    </div>
                </form>
           </div>
        </>
    )
}