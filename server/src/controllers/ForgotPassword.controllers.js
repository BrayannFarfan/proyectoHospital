


import { Patient } from '../models/Patient.js';
import crypto from 'crypto';
import { sendForgotPasswordEmail } from '../services/emailService.js';

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Patient.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    await user.update({
      resetToken,
      resetTokenExpiration: Date.now() + 3600000, 
    });

    await sendForgotPasswordEmail(email, resetToken);
    res.status(200).json({ message: 'Correo de recuperación enviado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
