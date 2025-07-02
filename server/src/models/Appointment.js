import { db } from '../config/config.js';
import { DataTypes } from 'sequelize';


export const Appointment = db.define('appointment',{
    date:{
        type: DataTypes.DATEONLY // Solo fecha, sin hora
    },
    time:{
        type: DataTypes.TIME
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "rejected"),
      allowNull: false,
      defaultValue: "pending",
    }
}, {
    timestamps: true, // Incluir createdAt y updatedAt
    tableName: 'appointments'
})
