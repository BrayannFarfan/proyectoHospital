import express from "express";
import { AuthenticateRouterLogin } from './routes/AuthLogin.routes.js';
import { AuthenticateRouterRegister } from './routes/AuthRegister.routes.js';
import { SpecialtiesRouterRegister } from './routes/Specialties.routes.js';
import { MedicRouterRegister } from './routes/Medic.routes.js';
import  './config/config.js';
import './models/index.js';
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json())
app.use('/auth/login', AuthenticateRouterLogin)
app.use('/auth/register', AuthenticateRouterRegister)
app.use('/specialties', SpecialtiesRouterRegister)
app.use('/medic', MedicRouterRegister)

app.listen(PORT , ()=>{
    console.log(`server run in port : http://localhost:${PORT}`);
})