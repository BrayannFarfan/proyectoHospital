import express from "express";
export const PatientRouterRegister = express.Router();
import { getOnePatient } from '../controllers/Patient.controllers.js'

PatientRouterRegister.get('/:id', getOnePatient)