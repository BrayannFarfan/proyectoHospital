import express from "express";
import cors from 'cors';
import { createServer } from "http";
import { Server } from 'socket.io'
import { AuthenticateRouterLogin } from './routes/AuthLogin.routes.js';
import { AuthenticateRouterRegister } from './routes/AuthRegister.routes.js';
import { SpecialtiesRouterRegister } from './routes/Specialties.routes.js';
import { MedicRouterRegister } from './routes/Medic.routes.js';
import { AppointmentRouterRegister } from './routes/Appointment.routes.js';
import { forgotPasswordSend } from './routes/ForgotPassword.routes.js';
import { resetPasswordSend } from './routes/resetPasswordSend.routes.js';
import { changePassworDashboard } from './routes/changePassword.routes.js';
import { PatientRouterRegister } from './routes/Patient.routes.js';
import  './config/config.js';
import './models/index.js';
const PORT = process.env.PORT || 3000;
const app = express();
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors:{
        origin:'http://localhost:5173',
        methods: ["GET", "POST", "PUT"]
    }
})


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json())
// app.use(cors());



app.use(
    cors({
      origin: "http://localhost:5173", 
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true, 
    })
  );

app.use((req, res, next) => {
    req.io = io;
    next();
});



io.on("connection", (socket) => {
    console.log("Usuario conectado:", socket.id);
  
    socket.on("disconnect", () => {
      console.log("Usuario desconectado:", socket.id);
    });
});




app.use('/auth/login', AuthenticateRouterLogin)
app.use('/auth/register', AuthenticateRouterRegister)
app.use('/specialties', SpecialtiesRouterRegister)
app.use('/medic', MedicRouterRegister)
app.use('/appointment', AppointmentRouterRegister)
app.use('/forgot-password', forgotPasswordSend);
app.use('/reset-password', resetPasswordSend);
app.use('/change-password', changePassworDashboard);
app.use('/patient', PatientRouterRegister );



const starServer = async () =>{
    try {
        httpServer.listen(PORT , () =>{
            console.log(`server run in port : http://localhost:${PORT}`);
        })
    } catch (error) {
        process.exit(1)
    }
}

starServer()