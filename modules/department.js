// IMPORT THE CONNECTION FUNCTION TO GET INFO FROM DATABASE
const { connect } = require("../db/mysql")


// FUNCTION TO ADD DEPARTMENT TO DATABASE
function addDept() {

}

// FUNCTION TO RETURN ALL DEPARTMENTS
async function getDept() {
 const db = await connect();
 const [departments] = await db.query('SELECT * FROM department')
 return departments;
}

// EXPORT BOTH GET/ADD DEPARTMENT FUNCTIONS
module.exports = {
    addDept,
    getDept
}