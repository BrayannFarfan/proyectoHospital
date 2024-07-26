import { Patient } from "./Patient.js";
import { Specialties } from './Specialties.js';
import { Medic } from './Medic.js'


//RELACIONES
Specialties.hasMany(Medic, { foreignKey: 'specialtyId' })
Medic.belongsTo(Specialties, { foreignKey: 'specialtyId' }) 



// INICIALIZACIONES
Patient.sync();
Medic.sync();
Specialties.sync();



