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

Specialties.hasMany(Appointment, { as: 'appointments', foreignKey: 'specialtyId' });
Appointment.belongsTo(Specialties, { as: 'specialty', foreignKey: 'specialtyId' });

Patient.hasMany(Appointment, { as: 'appointments', foreignKey: 'PatientId' });
Appointment.belongsTo(Patient, { as: 'patient', foreignKey: 'PatientId' });

Medic.hasMany(Appointment, { as: 'appointments', foreignKey: 'MedicId' });
Appointment.belongsTo(Medic, { as: 'medic', foreignKey: 'MedicId' });

Medic.hasMany(Availability, { as: 'availabilities', foreignKey: 'MedicId' });
Availability.belongsTo(Medic, { as: 'medic', foreignKey: 'MedicId' });


// INICIALIZACIONES
Medic.sync();
Availability.sync();
Specialties.sync();
Appointment.sync();
Patient.sync();


