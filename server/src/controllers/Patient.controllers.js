import { Appointment } from "../models/Appointment.js";
import { Medic } from "../models/Medic.js";
import { Patient } from "../models/Patient.js";
import { Specialties } from "../models/Specialties.js";





export const getOnePatient =  async  (req, res ) =>{
    const { id } = req.params

    try {
        const patient = await Patient.findByPk(id, {
            include:[
                {
                    model: Appointment,
                    as: 'appointments',
                    include: [
                      { model: Medic, as: 'medic', include: [{ model: Specialties, as: 'specialty' }] },
                      { model: Specialties, as: 'specialty' },
                    ],
                },
            ]
        })

        if (!patient) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
          }

        res.status(200).json({data:patient});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}