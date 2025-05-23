import { db } from '../config/config.js';
import { DataTypes } from 'sequelize';


export const Appointment = db.define('appointment',{
    date:{
        type: DataTypes.DATE
    },
    time:{
        type: DataTypes.TIME
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "rejected"),
      allowNull: false,
      defaultValue: "pending",
    }
})