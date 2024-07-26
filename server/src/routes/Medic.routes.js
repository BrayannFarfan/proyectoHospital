import express from "express";
export const MedicRouterRegister = express.Router();
import { getOneMedic, getAllMedic, CreateMedic, updateMedic, deleteMedic  } from "../controllers/Medic.controllers.js";




//GETONE Medic
MedicRouterRegister.get('/:id', getOneMedic)

//GETALL Medic
MedicRouterRegister.get('/', getAllMedic)

//CREATE Medic
MedicRouterRegister.post('/', CreateMedic)

//UPDATE Medic
MedicRouterRegister.put('/:id', updateMedic)

//DELETE Medic
MedicRouterRegister.delete('/:id', deleteMedic)