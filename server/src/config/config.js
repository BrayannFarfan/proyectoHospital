import { Sequelize } from "sequelize";

export const db = new Sequelize('hospital', 'braya', '', {
    dialect: 'postgres',
    host: 'localhost'
})


try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.log('Unable to connect to the database', error.message);
}