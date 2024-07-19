import { db } from '../config/config.js';
import { DataTypes } from 'sequelize';

export const Specialties = db.define('specialties', {
    name:{
        type: DataTypes.STRING
    }
})