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

// FUNCTION TO RETURN ALL EMPLOYEES
async function getEmployees() {
  const db = await connect();
  const [employees] = await db.query("SELECT * FROM employee");
  return employees;
}

// EXPORT BOTH GET/ADD EMPLOYEES FUNCTIONS
module.exports = {
  addEmployee,
  getEmployees,
};
