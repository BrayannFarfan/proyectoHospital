import { db } from '../config/config.js';
import { DataTypes } from 'sequelize';



export const Availability = db.define('Availability', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    MedicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Medic',
        key: 'id',
      },
    },
  });