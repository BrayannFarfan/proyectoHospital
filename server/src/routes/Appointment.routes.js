import express from "express";
export const AppointmentRouterRegister = express.Router();
import { CreateAppointment, deleteAppointment, getAllAppointment, getOneAppointment, updateAppointment, rejectAppointment, corfirmAppointment } from "../controllers/Appointment.controllers.js";
import { verifyToken } from "../middleware/verifyToken.js";

//GET ONE DATE
AppointmentRouterRegister.get('/:id', getOneAppointment);

//GET ALL DATE
AppointmentRouterRegister.get('/', getAllAppointment);

//CREATE DATE
AppointmentRouterRegister.post('/' ,CreateAppointment);

//UPDATE DATE
AppointmentRouterRegister.put('/:id' ,updateAppointment);

//DELETE DATE
AppointmentRouterRegister.delete('/:id' ,deleteAppointment);

//CONFIRM
AppointmentRouterRegister.put("/:id/confirm" ,corfirmAppointment);
//REJECT
AppointmentRouterRegister.put("/:id/reject" ,rejectAppointment)