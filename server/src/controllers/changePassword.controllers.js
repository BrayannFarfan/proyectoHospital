import { Patient } from "../models/Patient.js";
import bcrypt from 'bcryptjs';

export const changePassworDash = async (req, res) => {
    const { currentPassword, newPassword, userId } = req.body; 

    try {
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const patient = await Patient.findByPk(userId);
      if (!patient) {
        return res.status(404).json({ message: `User with ID ${userId} not found` });
      }
  
      const isMatch = await bcrypt.compare(currentPassword, patient.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }
  
      if (newPassword.length < 6) {
        return res.status(400).json({ message: "New password must be at least 6 characters long" });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      patient.password = hashedPassword;
      await patient.save();
  
      return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error changing password" });
    }
};