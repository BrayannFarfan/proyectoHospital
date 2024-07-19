import express from "express";
import { AuthLogin } from '../controllers/AuthLogin.controllers.js'
export const AuthenticateRouterLogin = express.Router()

// LOGIN
AuthenticateRouterLogin.post('/', AuthLogin)
