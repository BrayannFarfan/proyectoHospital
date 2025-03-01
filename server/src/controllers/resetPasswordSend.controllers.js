import{ Patient } from '../models/Patient.js'
import bcrypt from 'bcryptjs';


export const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    
    
    try {
        const user = await Patient.findOne({
            where: {
                email
            },
        });
          
      if (!user) {
        return res.status(400).json({ message: 'user no encontrado' });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      await user.update({
        password: hashedPassword
      });
  
      res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };