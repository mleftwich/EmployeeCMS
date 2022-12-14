// IMPORT THE CONNECTION FUNCTION TO GET INFO FROM DATABASE
const { connect } = require("../db/mysql");

// FUNCTION TO ADD ROLE TO DATABASE
async function addRole(name, salary, dept) {
  const db = await connect();
  const dept1 = dept[0].id;
  let info = [[name, salary, dept1]];
  await db.query(
    "INSERT INTO `employees_db`.`role` (`title`, `salary`, `department_id`) VALUES (?)",
    info
  );
}

// FUNCTION TO RETURN ALL ROLES
async function getRoles() {
  const db = await connect();
  const [roles] = await db.query(
    "SELECT r.title, d.name as department, r.salary FROM role r JOIN department d ON r.department_id = d.id"
  );
  return roles;
}

// FUNCTION TO RETURN ROLE TITLES
async function getRoleTitle() {
  const db = await connect();
  const roles = await db.query("SELECT * FROM employees_db.role");
  let newRole = roles[0];
  return newRole;
}

// FUNCTION TO RETURN ROLE ID
async function getRoleId(id) {
  const db = await connect();
  const name = id;
  const roleId = await db.query("SELECT id FROM role WHERE title = ?", name);
  return roleId;
}

// EXPORT BOTH GET/ADD ROLE FUNCTIONS
module.exports = {
  addRole,
  getRoles,
  getRoleTitle,
  getRoleId,
};
