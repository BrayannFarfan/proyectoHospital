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

export const updatePatient = async ( req, res ) =>{

    const { id } = req.params;
    console.log("Solicitud recibida en el backend:", req.body);
  if (req.file) {
    console.log("Imagen recibida:", req.file);
  }

  try {
    const patient = await Patient.findByPk(id);
    console.log(`Paciente con ID ${id} no encontrado`);
    if (!patient) {
      return res.status(404).json({ message: `The patient with ID ${id} does not exist` });
    }

    const updatedData = {
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      greenCard: req.body.greenCard,
      address: req.body.address,
      profilePic: req.file ? `/uploads/users/${req.file.filename}` : patient.profilePic,
    };
    console.log("Datos a actualizar:", updatedData);
    await patient.update(updatedData);
    await patient.save();
    console.log("Paciente actualizado:", patient);
    return res.status(200).json({ data: patient });
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    return res.status(500).json({ message: "Error al actualizar el perfil" });
  }
}


