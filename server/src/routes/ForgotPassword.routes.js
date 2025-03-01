import express from "express";
import { forgotPassword} from '../controllers/ForgotPassword.controllers.js'
export const forgotPasswordSend = express.Router();


forgotPasswordSend.post('/', forgotPassword);

