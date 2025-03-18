import { Patient } from '../models/Patient.js';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

export const AuthRegister = async (req, res) => {


  const { name, lastName, greenCard, phone, address, email, password } = req.body;

  try {
    const findGreenCard = await Patient.findOne({ where: { greenCard: greenCard } });
    if (findGreenCard) {
      return res.status(400).json({ message: `La Green Card ${greenCard} ya está registrada. Por favor intente con otra.` });
    }

    const findEmail = await Patient.findOne({ where: { email: email } });
    if (findEmail) {
      return res.status(400).json({ message: `Ya hay un usuario con el email ${email}, intente con otro email` });
    }

    const passHash = await bcrypt.hash(password, 10);

    const patient = await Patient.create({
      name,
      lastName,
      greenCard,
      phone,
      address,
      email,
      password: passHash,
    });

    if (req.file) {
      const tempPath = req.file.path;
      console.log('Temporary file path:', tempPath);
      const newFileName = `user-${patient.id}-${Date.now()}${path.extname(req.file.originalname)}`;
      const newPath = path.join(rootDir, 'uploads/users', newFileName);
      console.log('New file path:', newPath);

      try {
        await fs.rename(tempPath, newPath);
      } catch (fileError) {
        console.error('Error renaming file:', fileError.stack);
        throw new Error('Failed to save profile picture');
      }

      patient.profilePic = `uploads/users/${newFileName}`;
      await patient.save();
    } else {
      patient.profilePic = 'uploads/placeholder/placeholder.jpg'; // Fallback correcto
      await patient.save();
    }

    return res.status(200).json({ status: 200, data: patient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};