import { Patient } from "./Patient.js";
import { Specialties } from './Specialties.js';
import { Medic } from './Medic.js'


//RELACIONES
Specialties.hasMany(Medic)
Medic.belongsTo(Specialties) 



// INICIALIZACIONES
Patient.sync();
Medic.sync();
Specialties.sync();



