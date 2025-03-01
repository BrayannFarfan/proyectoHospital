
import { transporter } from '../utils/emailConfig.js';

export const sendForgotPasswordEmail = async (email, resetToken) => {
  const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Recuperación de Contraseña',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7; border-radius: 8px;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <h2 style="color: #333333; text-align: center; margin-bottom: 20px;">Restablece tu Contraseña</h2>
          <p style="color: #666666; line-height: 1.6; margin-bottom: 20px;">
            Hola, hemos recibido una solicitud para restablecer tu contraseña. Haz clic en el botón de abajo para continuar:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #33B3DA; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Restablecer Contraseña
            </a>
          </div>
          <p style="color: #666666; line-height: 1.6; margin-bottom: 20px;">
            Este enlace expirará en 1 hora por razones de seguridad. Si no solicitaste este cambio, ignora este correo.
          </p>
          <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;">
          <p style="color: #33B3DA; font-size: 12px; text-align: center;">
            &copy; 2025 Healthia. Todos los derechos reservados.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo de recuperación enviado a:', email);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw new Error('No se pudo enviar el correo de recuperación');
  }
};