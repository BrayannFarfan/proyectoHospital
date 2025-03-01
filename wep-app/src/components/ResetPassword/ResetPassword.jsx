import { useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router'; 
import '../ForgotPass/forgotPassword.css'
import { InputContent } from '../ContainerInput/InputContent';
import { WelcomeMessage } from '../WelcomeMessage/WelcomeMessage';

export const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { resetPassword, error, loading } = useAuth();
  let navigate  = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      await resetPassword(email, newPassword);
      alert('Contraseña actualizada con éxito');
      navigate('/login-user');
    } catch (err) {
      console.error('Error al actualizar la contraseña:', err);
    }
  };

  return (
    <div className="form_password">
        <div className='form_heading'>
            <WelcomeMessage 
                title="Password Recovery" 
                description="Enter your email address and new password by Update your password."
            />
        </div>
        <form onSubmit={handleSubmit} className='form_content'>
          <div className="form_group">
            <label>Email:</label>
            <InputContent
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form_group">
            <label>New Password:</label>
            <InputContent
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form_group">
            <label>Confirm Password:</label>
            <InputContent
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
     
    </div>
  );
};
