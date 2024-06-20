import { Sequelize } from "sequelize";
import 'dotenv/config'

export const db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: process.env.BD_DIALECT,
    host: process.env.DB_HOST
})


try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.log('Unable to connect to the database', error.message);
}