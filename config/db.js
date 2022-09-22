const config = require('config');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
    host: config.get('host'),
    user: config.get('user'),
    password: process.env.DB_PASSWORD,
    database: config.get('database')
})

const connectDB = async () => {
    try {
        await db.connect();
        console.log("DB Connected Successfully");
        return db;
    } catch (error) {
        console.log("DB Connection Error");
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;