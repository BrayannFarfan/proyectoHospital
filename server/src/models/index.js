import { Patient } from "./Patient.js";
import { Specialties } from './Specialties.js';
import { Medic } from './Medic.js';
import {  Appointment } from "./Appointment.js";
import { Availability } from './Availability.js'


//RELACIONES
Specialties.hasMany(Medic , {
    as: "medics",
    foreignKey: "specialtyId"
})
Medic.belongsTo(Specialties , {
    as: "specialty",
    foreignKey: "specialtyId",
}) 

Specialties.hasMany(Appointment, { foreignKey: 'specialtyId' });
Appointment.belongsTo(Specialties, { foreignKey: 'specialtyId' });

Patient.hasMany(Appointment, { foreignKey: 'PatientId' });
Appointment.belongsTo(Patient, { foreignKey: 'PatientId' });

Medic.hasMany(Appointment, { foreignKey: 'MedicId' });
Appointment.belongsTo(Medic, { foreignKey: 'MedicId' });

Medic.hasMany(Availability, { foreignKey: 'MedicId' });
Availability.belongsTo(Medic, { foreignKey: 'MedicId' });


// INICIALIZACIONES
Medic.sync();
Availability.sync();
Specialties.sync();
Appointment.sync();
Patient.sync();


