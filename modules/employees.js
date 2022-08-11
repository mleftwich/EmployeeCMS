// IMPORT THE CONNECTION FUNCTION TO GET INFO FROM DATABASE
const { connect } = require("../db/mysql");

// FUNCTION TO ADD EMPLOYEE TO DATABASE
async function addEmployee(first, last, role, manager) {
  let info = [[first, last, role, manager]];
  const db = await connect();
  await db.query(
    "INSERT INTO `employees_db`.`employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES (?)",
    info
  );
}

//FUNCTION TO RETURN JUST EMPLOYEE NAMES
async function getEmployeeName() {
  const db = await connect();
  const [employee] = await db.query("SELECT first_name FROM employee");
  return employee;
}

// FUNCTION TO RETURN ALL EMPLOYEES
async function getEmployees() {
  const db = await connect();
  const [employees] = await db.query("SELECT * FROM employee");
  return employees;
}

// FUNCTION TO GET LIST OF NAMES FOR MANAGER
async function getManager() {
  const db = await connect();
  const managers = await db.query("SELECT first_name FROM employee");
  let managerName = managers[0]
  return managerName
 }

 // FUNCTION TO GET MANAGER ID
async function getManagerId(id) {
  if (!id) {
    return '0';
  } else {
  const db = await connect();
  const name = id;
  const managerId = await db.query(
    "SELECT id FROM employee WHERE first_name = ?",
    name
  );
  return managerId[0];
}
}


// EXPORT BOTH GET/ADD EMPLOYEES FUNCTIONS
module.exports = {
  addEmployee,
  getEmployees,
  getManagerId,
  getManager,
};
