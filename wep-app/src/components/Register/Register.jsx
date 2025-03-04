import { useState } from "react";
import { LoginFailedModal } from '../LoginFailedModal/LoginFailedModal';
import { useAuth } from '../../context/AuthProvider';
import { Link, useNavigate } from 'react-router';
import { InputContent } from "../ContainerInput/InputContent";
import { WelcomeMessage } from "../WelcomeMessage/WelcomeMessage";






export const Register = () =>{

    const [isErrorModalOpen, setIsErrorModal] = useState(false); 
    const [isSuccessModalOpen, setIsSuccessModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { register, loading } = useAuth()
    let navigate = useNavigate();


    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        greenCard: '', 
        phone: '', 
        address: '', 
      });




    function onCloseError (){
        setIsErrorModal(false)
        setFormData({
            name: '',
            lastName: '',
            email: '',
            password: '',
            greenCard: '', 
            phone: '', 
            address: '',
        })
    }

    const onCloseSuccess = () => {
        setIsSuccessModal(false);
        navigate('/'); 
      };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };


      const handleSubmitRegistration =  async (e) =>{
        e.preventDefault();
        if ( !formData.address || !formData.email || !formData.greenCard || !formData.lastName || !formData.name || !formData.password || !formData.phone ) {
            setErrorMessage('Please enter both email and password.');
            setIsErrorModal(true);
            return;
          }

          try {
            const success = await register(formData)
            if (success) {
                setIsSuccessModal(true); 
            }else{
                setErrorMessage('An error occurred during registration.')
                setIsErrorModal(true)
            }
          } catch (error) {
            setErrorMessage(error.message || 'An error occurred during registration.');
            setIsErrorModal(true);
          }
         
        
    }

    return(
        <>
         <section className="login_container">
            <WelcomeMessage 
                title="Register in Our Hospital" 
                description="Sign up for an account and start connecting with our doctors today."
            />
            <form    
                    onSubmit={handleSubmitRegistration}
                    className="register_form"
                    >
                    <div className="input_group">
                        <label> Name</label>
                        <InputContent 
                            type={'text'}
                            placeholder={'Name'}
                            value={formData.name}
                            onChange={handleChange}
                            name='name'
                        />
                    </div>
                    <div className="input_group">
                        <label> LastName</label>
                        <InputContent 
                            type={'text'}
                            placeholder={'LastName'}
                            value={formData.lastName}
                            onChange={handleChange}
                            name='lastName'
                        />
                    </div>
                    <div className="input_group">
                        <label> Email Adress</label>
                        <InputContent 
                            type={'email'}
                            placeholder={'Email'} 
                            value={formData.email}
                            onChange={handleChange}
                            name='email'
                        />
                    </div>
                    <div className="input_group">
                        <label> Password</label>
                        <InputContent 
                            type={'password'} 
                            placeholder={'Password'} 
                            value={formData.password}
                            onChange={handleChange}
                            name='password'
                        />
                    </div>
                    <div className="input_group">
                        <label> Green Card</label>
                        <InputContent 
                            type={'text'} 
                            placeholder={'GreenCard'} 
                            value={formData.greenCard}
                            onChange={handleChange}
                            name='greenCard'
                        />
                    </div>
                    <div className="input_group">
                        <label> Phone</label>
                        <InputContent 
                            type={'tel'} 
                            placeholder={'Phone'} 
                            value={formData.phone}
                            onChange={handleChange}
                            name='phone'
                        />
                    </div>
                    <div className="input_group">
                        <label> Adress </label>
                        <InputContent 
                            type={'text'} 
                            placeholder={'Address'} 
                            value={formData.address}
                            onChange={handleChange}
                            name='address'
                        />
                    </div>
                    <button type="submit" disabled={loading} className="register_btn">
                        {
                            loading ? 'Cargando....' : 'Sign up'
                        }                    
                    </button>
                    <p className="signup_link">
                        You have an account? <Link to={'/login-user'}>Sign in</Link>
                    </p>
                </form>
            <LoginFailedModal 
                isOpen={ isSuccessModalOpen} 
                onClose={onCloseSuccess} 
                title='Register Succeses'
                message={errorMessage}
                primaryButtonText="Close"  
            />
             <LoginFailedModal 
                isOpen={ isErrorModalOpen} 
                onClose={onCloseError} 
                title="Register Failed"
                message={errorMessage}
                primaryButtonText="Try Again"   
            />
        </section>
        </>
    )
}