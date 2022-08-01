// IMPORT MYSQL2
const mysql = require('mysql2/promise')

// FUNCTION TO CONNECT TO MYSQL DATABASE
function connect() {
   return mysql.createConnection({
        host: 'localhost',
        password: 'root',
        user: 'root',
        database: 'employees_db'
        
    })
}

// EXPORT CONNECT FUNCTION
module.exports = {connect};