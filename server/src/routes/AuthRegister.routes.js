import express from "express";
import { AuthRegister } from "../controllers/AuthRegister.controllers.js";
export const AuthenticateRouterRegister = express.Router()

// REGISTER
AuthenticateRouterRegister.post('/', AuthRegister)