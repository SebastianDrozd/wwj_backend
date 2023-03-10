const mysql = require('mysql');
require('dotenv').config();
const pool = mysql.createPool({
    host: process.env.DB_URL || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : 'worldwidejobs'
})
module.exports = pool