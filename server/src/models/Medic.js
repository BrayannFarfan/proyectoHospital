import { db } from '../config/config.js';
import { DataTypes } from 'sequelize';

export const Medic = db.define('Medic', {
    name:{
        type: DataTypes.STRING
    },
    lastName:{
        type: DataTypes.STRING
    },
    cardMedic:{
        type: DataTypes.INTEGER
    }
})