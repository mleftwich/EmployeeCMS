// IMPORT THE CONNECTION FUNCTION TO GET INFO FROM DATABASE
const { connect } = require("../db/mysql")


// FUNCTION TO ADD DEPARTMENT TO DATABASE
async function addDept(name) {
    const db = await connect();
    await db.query('INSERT INTO `employees_db`.`department` (`name`) VALUES (?)', name);
}

// FUNCTION TO RETURN ALL DEPARTMENTS
async function getDept() {
 const db = await connect();
 const [departments] = await db.query('SELECT * FROM department')
 return departments;
}

async function getDeptId(id) {
    const db = await connect();
    const name =  id
    console.log(name)
    const deptId = await db.query('SELECT department.id FROM department INNER JOIN role ON title = department.(?)', name);
    
    return deptId;

   }


// EXPORT BOTH GET/ADD DEPARTMENT FUNCTIONS
module.exports = {
    addDept,
    getDept,
    getDeptId,
}