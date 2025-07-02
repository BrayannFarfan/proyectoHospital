import { Appointment } from '../models/Appointment.js';
import { Patient } from '../models/Patient.js';
import { Specialties } from '../models/Specialties.js';
import { Medic }from '../models/Medic.js';


export const getOneAppointment = async ( req , res ) =>{
    const { id } = req.params;

    try {
        
        const getOneDate = await Appointment.findByPk(id,{
            include:[
                {
                    model: Patient
                },
                {
                    model: Specialties
                }
            ]
        })

        if(!getOneDate){
            return res.status( 402 ).json({ message: `La Cita no existe` })
        }else{
            res.status( 200 ).json({ data : getOneDate })
        }


    } catch (error) {
        return res.status( 500 ).json({ message: error })
    }
}

export const getAllAppointment = async ( req , res ) => {

try {
    const getAllAppointment  = await Appointment.findAll({
        include: [
            {
                model: Patient,
                as: 'patient',
                attributes: ['id', 'name', 'lastName']
            },
            {
                model: Medic,
                as: 'medic',
                attributes: ['id', 'name', 'lastName']
            },
            {
                model: Specialties,
                as: 'specialty',
                attributes: ['id', 'name']
            }
        ]
    });
    return res.status( 200 ).json({ data : getAllAppointment })
} catch ( error ) {
    return res.status( 500 ).json({ message: error.message })
}
}

export const CreateAppointment = async ( req , res ) =>{
    const  { date, time, specialtyId, PatientId , MedicId} = req.body
    try {
        
        const patient =  await Patient.findByPk(PatientId)
         if(!patient) {return res.status(400).json({message: `El paciente no existe`})}

        const medic = await Medic.findByPk(MedicId)
        if(!medic){ return res.status( 400 ).json({ message : `El medico no existe`})}

        const specialty = await Specialties.findByPk(specialtyId)
        if(!specialty) return res.status( 400 ).json({ message: `La especialidad no existe`})

        const existingAppointment = await Appointment.findOne({
            where:{
                MedicId : medic.id,
                date: new Date(date),
                time: time
            }
        })

        if ( existingAppointment ) {
                return res.status(409).json({ message: "The doctor already has an appointment at this time." });
            }else{
                const createAppointment = await Appointment.create({
                    date,
                    time,
                    specialtyId : specialty.id,
                    PatientId:patient.id,
                    MedicId: medic.id
                })
    
                return res.status( 200 ).json({ data : createAppointment})
            }
    } catch ( error ) {
        return res.status( 500 ).json({ message: error.message })
    }
}

export const updateAppointment = async ( req, res ) =>{
const {  id } = req.params;


try {
    const updateAppointment = await Appointment.findByPk(id);

    if(!updateAppointment) return res.status( 400 ).json({ message: `El medico no existe` });
    updateAppointment.update(req.body);
    updateAppointment.save()
    return res.status( 200 ).json({ data: updateAppointment})

} catch (error) {
    return res.status( 500 ).json({ message: error })
}
}

export const deleteAppointment = async ( req, res ) =>{
    const { id } = req.params;
    try {
        const deleteAppointment = await Appointment.destroy({ where: { id } })
        return res.status( 200 ).json({ data: deleteAppointment})
    } catch (error) {
        return res.status( 500 ).json({ message: error.message })
    }
}

export const corfirmAppointment =  async (req, res) => {
    const { id } = req.params;
    const { userId }   = req.body
    
    try {
  
      const appointment = await Appointment.findOne({
        where: { id },
        include: [{ model: Patient, as: "patient" }],
      });
  
      if (!appointment) {
        return res.status(404).json({ message: "Cita no encontrada" });
      }

      if (appointment.PatientId !== userId) {
        return res.status(403).json({ message: "No tienes permiso para modificar esta cita" });
      }
  
      if (appointment.status !== "pending") {
        return res.status(400).json({ message: "La cita ya ha sido confirmada o rechazada" });
      }
  
      appointment.status = "confirmed";
      await appointment.save();
  
      req.io.emit("appointmentUpdated", {
        appointmentId: appointment.id,
        status: appointment.status,
        patientId: appointment.PatientId,
      });
  
      res.status(200).json({ message: "Cita confirmada con éxito" });
    } catch (error) {
      console.error("Error al confirmar la cita:", error);
      res.status(500).json({ message: "Error al confirmar la cita" });
    }
}

export const rejectAppointment = async (req, res) => {

    const { id } = req.params;
    const { userId }   = req.body

    try {
  
      const appointment = await Appointment.findOne({
        where: { id },
        include: [{ model: Patient, as: "patient" }],
      });
  
      if (!appointment) {
        return res.status(404).json({ message: "Cita no encontrada" });
      }
  
      if (appointment.PatientId !== userId) {
        return res.status(403).json({ message: "No tienes permiso para modificar esta cita" });
      }
  
      if (appointment.status !== "pending") {
        return res.status(400).json({ message: "La cita ya ha sido confirmada o rechazada" });
      }
  
      appointment.status = "rejected";
      await appointment.save();
  
      // Emitir un evento WebSocket a todos los clientes conectados
      req.io.emit("appointmentUpdated", {
        appointmentId: appointment.id,
        status: appointment.status,
        patientId: appointment.PatientId,
      });
  
      res.status(200).json({ message: "Cita rechazada con éxito" });
    } catch (error) {
      console.error("Error al rechazar la cita:", error);
      res.status(500).json({ message: "Error al rechazar la cita" });
    }
  }