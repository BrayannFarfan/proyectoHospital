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

export const getAllAppointment = async ( req , res ) =>{

try {
    const getAllAppointment  = await Appointment.findAll();
    return res.status( 200 ).json({ data : getAllAppointment })
} catch ( error ) {
    return res.status( 500 ).json({ message: error })
}
}

export const CreateAppointment = async ( req , res ) =>{
    const  { date, time, specialtyId, PatientId , MedicId} = req.body
    console.log(req.body);
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