import express from "express";
import { AuthRegister } from "../controllers/AuthRegister.controllers.js";
import { uploadUserProfilePic} from '../middleware/upload.js'
export const AuthenticateRouterRegister = express.Router()

// REGISTER
AuthenticateRouterRegister.post('/', uploadUserProfilePic ,AuthRegister)