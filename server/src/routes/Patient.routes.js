import express from "express";
export const PatientRouterRegister = express.Router();
import { uploadUserProfilePic} from '../middleware/upload.js'
import { getOnePatient, updatePatient } from '../controllers/Patient.controllers.js'

PatientRouterRegister.get('/:id', getOnePatient)

PatientRouterRegister.put('/:id', uploadUserProfilePic ,updatePatient )