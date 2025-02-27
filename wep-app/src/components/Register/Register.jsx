import { useState } from "react";
import { LoginFailedModal } from '../LoginFailedModal/LoginFailedModal';
import { useAuth } from '../../context/AuthProvider';
import { Link, useNavigate } from 'react-router';
import { InputContent } from "../ContainerInput/InputContent";
import { WelcomeMessage } from "../WelcomeMessage/WelcomeMessage";






export const Register = () =>{

    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        greenCard: '', 
        phone: '', 
        address: '', 
      });

    const [ isModalOpen , setIsModal ] = useState(false);
    const { register, loading } = useAuth()
    let navigate = useNavigate();


    function onClose (){
        setIsModal(false)
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


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };


      const handleSubmitRegistration =  async (e) =>{
        e.preventDefault();
         const success = await register(formData)
        if (success) {
            navigate('/');
        } else {
            setIsModal(true);
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
            <LoginFailedModal isOpen={ isModalOpen} onClose={onClose} />
        </section>
        </>
    )
}