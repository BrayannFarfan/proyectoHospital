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
    },
    specialtyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'specialties',
            key: 'id'
        }
    }
})