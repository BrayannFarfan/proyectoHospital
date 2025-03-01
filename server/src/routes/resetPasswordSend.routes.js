

import express from "express";
import { resetPassword } from '../controllers/resetPasswordSend.controllers.js'
export const resetPasswordSend = express.Router();


resetPasswordSend.post('/', resetPassword);