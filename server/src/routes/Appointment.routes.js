import express from "express";
export const AppointmentRouterRegister = express.Router();
import { CreateAppointment, deleteAppointment, getAllAppointment, getOneAppointment, updateAppointment } from "../controllers/Appointment.controllers.js";

//GET ONE DATE
AppointmentRouterRegister.get('/:id', getOneAppointment);

//GET ALL DATE
AppointmentRouterRegister.get('/', getAllAppointment);

//CREATE DATE
AppointmentRouterRegister.post('/', CreateAppointment);

//UPDATE DATE
AppointmentRouterRegister.put('/:id', updateAppointment);

//DELETE DATE
AppointmentRouterRegister.delete('/:id', deleteAppointment);