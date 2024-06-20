import { db } from '../config/config.js';
import { DataTypes } from 'sequelize';

export const Patient = db.define('Patient', {
    name:{
        type: DataTypes.STRING
    },
    lastName:{
        type: DataTypes.STRING
    },
    greenCard:{
        type: DataTypes.INTEGER
    },
    phone:{
        type: DataTypes.INTEGER
    },
    address:{
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    }
})