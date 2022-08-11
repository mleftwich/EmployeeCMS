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
  const [employees] = await db.query("SELECT DISTINCT e.first_name, e.last_name, r.title as role, d.name as department, r.salary, e.manager_id FROM employee e JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id");
  return employees;
}

// FUNCTION TO GET LIST OF NAMES FOR MANAGER
async function getEmployeeNames() {
  const db = await connect();
  const employees = await db.query("SELECT first_name FROM employee");
  let employeeNames = employees[0];
  return employeeNames;
}

// FUNCTION TO GET MANAGER ID
async function getManagerId(id) {
  if (!id) {
    return "0";
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

// FUNCTION TO UPDATE ROLE
async function updateRole(id, role) {
  const db = await connect();
  const name = id;
  const empIdArray = await db.query(
    "SELECT id FROM employee WHERE first_name = ?",
    name
   
  );
  
  let empId1 = empIdArray[0];
  let empId = empId1[0].id;
  let roleId = role[0].id;
 
  console.log(empId)
  let sql = `UPDATE employee SET role_id = ? WHERE id =?`;
  const data = [roleId, empId]
  const update = await db.query(
   sql, data,
  );
  console.log(update)
  return update;
}

// EXPORT BOTH GET/ADD EMPLOYEES FUNCTIONS
module.exports = {
  addEmployee,
  getEmployees,
  getManagerId,
  getEmployeeNames,
  updateRole,
};
