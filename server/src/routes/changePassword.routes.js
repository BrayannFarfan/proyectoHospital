
import express from "express";
import { changePassworDash } from '../controllers/changePassword.controllers.js'
export const changePassworDashboard = express.Router();


changePassworDashboard.put('/', changePassworDash);