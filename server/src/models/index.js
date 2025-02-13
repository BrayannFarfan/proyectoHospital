import { Patient } from "./Patient.js";
import { Specialties } from './Specialties.js';
import { Medic } from './Medic.js';
import {  Appointment } from "./Appointment.js";


//RELACIONES
Specialties.hasMany(Medic , {
    as: "medics",
    foreignKey: "specialtyId"
})
Medic.belongsTo(Specialties , {
    as: "specialty",
    foreignKey: "specialtyId",
}) 

// Specialties.hasMany(Appointment)
// Appointment.belongsTo(Specialties)

// Patient.hasMany(Appointment)
// Appointment.belongsTo(Patient)

// Medic.hasMany(Appointment)
// Appointment.belongsTo(Medic)
Specialties.hasMany(Appointment, { foreignKey: 'specialtyId' });
Appointment.belongsTo(Specialties, { foreignKey: 'specialtyId' });

Patient.hasMany(Appointment, { foreignKey: 'PatientId' });
Appointment.belongsTo(Patient, { foreignKey: 'PatientId' });

Medic.hasMany(Appointment, { foreignKey: 'MedicId' });
Appointment.belongsTo(Medic, { foreignKey: 'MedicId' });


// INICIALIZACIONES
Specialties.sync();
Medic.sync();
Appointment.sync();
Patient.sync();


