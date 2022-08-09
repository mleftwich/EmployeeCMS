// IMPORT THE CONNECTION FUNCTION TO GET INFO FROM DATABASE
const { connect } = require("../db/mysql")


// FUNCTION TO ADD ROLE TO DATABASE
async function addRole(name, salary, dept) {
     const db = await connect();
     let info = [[name, salary, dept]]
     await db.query('INSERT INTO `employees_db`.`role` (`title`, `salary`, `department_id`) VALUES (?)', info);
}

// FUNCTION TO RETURN ALL ROLES
async function getRoles() {
 const db = await connect();
 const [roles] = await db.query('SELECT * FROM role')
 return roles;
}

// EXPORT BOTH GET/ADD ROLE FUNCTIONS
module.exports = {
    addRole,
    getRoles
}