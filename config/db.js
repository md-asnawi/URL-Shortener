const config = require('config');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db_config = {
    host: config.get('host'),
    ser: config.get('user'),
    password: process.env.DB_PASSWORD,
    database: config.get('database')
};

var connection;

var connectDB = function handleDisconnect() {
    connection = mysql.createConnection(db_config);

    connection.connect(function(err) {
        if (err) {
          console.log('error when connecting to db:', err);
          setTimeout(handleDisconnect, 2000);
        }
    });
    
    connection.on('error', function(err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          handleDisconnect();
        } 
        else {
          throw err;
        }
    });

    return connection;
}

// const db = mysql.createConnection({
//     host: config.get('host'),
//     user: config.get('user'),
//     password: process.env.DB_PASSWORD,
//     database: config.get('database')
// })

// const connectDB = async () => {
//     try {
//         await db.connect();
//         console.log("DB Connected Successfully");
//         return db;
//     } catch (error) {
//         console.log("DB Connection Error");
//         console.log(error.message);
//         process.exit(1);
//     }
// }

module.exports = connectDB;