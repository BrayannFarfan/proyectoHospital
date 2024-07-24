import express from "express";
import { getOneSpecialties, getAllSpecialties, CreateSpecialties, updateSpecialties, deleteSpecialties } from "../controllers/Specialties.controllers.js";
export const SpecialtiesRouterRegister = express.Router();


//GETONE SPECIALTIES
SpecialtiesRouterRegister.get('/:id', getOneSpecialties)

//GETALL SPECIALTIES
SpecialtiesRouterRegister.get('/', getAllSpecialties)

//CREATE SPECIALTIES
SpecialtiesRouterRegister.post('/', CreateSpecialties)

//UPDATE SPECIALTIES
SpecialtiesRouterRegister.put('/:id', updateSpecialties)

//DELETE SPECUALTIES
SpecialtiesRouterRegister.delete('/:id', deleteSpecialties)