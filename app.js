// IMPORT INQUIERER NPM
const inquirer = require("inquirer");
const { getDept, addDept, getDeptId } = require("./modules/department");
const {
  addEmployee,
  getEmployees,
  getManagerId,
getEmployeeNames,
updateRole,
} = require("./modules/employees");
const {
  addRole,
  getRoles,
  getRoleTitle,
  getRoleId,
} = require("./modules/roles");

// FUNCTION TO PROMPT USER ON ACTION
function start() {
  return inquirer
    .prompt([
      {
        message: "What would you like to do?",
        type: "list",
        name: "action",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
     
     
      // PROMPT USER FOR DEPARTMENT INFO
      {
        message: "What is the department name?",
        type: "input",
        name: "deptname",
        when: (res) => res.action === "Add a department",
      },
      
      
      // PROMPT USER FOR ROLE INFO
      {
        message: "What is the Role?",
        type: "input",
        name: "rolename",
        when: (res) => res.action === "Add a role",
      },
      {
        message: "What is the salary for this Role?",
        type: "input",
        name: "rolesal",
        when: (res) => res.action === "Add a role",
      },
      {
        message: "What department does this Role belong to?",
        type: "list",
        name: "roledept",
        choices: async function listDepts() {
          const depts = await getDept();
          return depts;
        },
        when: (res) => res.action === "Add a role",
      },
      
      
      //PROMPT USER FOR EMPLOYEE INFO
      {
        message: "Employees first name??",
        type: "input",
        name: "firstname",
        when: (res) => res.action === "Add an employee",
      },
      {
        message: "Employees last name?",
        type: "input",
        name: "lastname",
        when: (res) => res.action === "Add an employee",
      },

      {
        message: "What is the employees role?",
        type: "list",
        name: "emprole",
        choices: async function listRole() {
          const role = await getRoleTitle();
          let roles = [];
          for (let index = 0; index < role.length; index++) {
            let list = role[index].title;
            roles.push(list);
          }
          return roles;
        },
        when: (res) => res.action === "Add an employee",
      },
      {
        message: "Does this employee have a manager?",
        type: "confirm",
        name: "ismanaged",
        when: (res) => res.action === "Add an employee",
      },
      {
        message: "Who is the employees manager?",
        type: "list",
        name: "manager",
        choices: async function listManagers() {
          const manager = await getEmployeeNames();
          let managers = [];
          for (let index = 0; index < manager.length; index++) {
            let list = manager[index].first_name;
            managers.push(list);
          }
          return managers;
        },
        when: (res) => res.ismanaged,
      },
      
      
      // PROMPTS FOR UPDATING EMPLOYEE
      {
        message: "Which employee?",
        type: "list",
        name: "update",
        choices: async function listEmployees() {
          const employee = await getEmployeeNames();
          let employees = [];
          for (let index = 0; index < employee.length; index++) {
            let list = employee[index].first_name;
            employees.push(list);
          }
          return employees;
        },
        when: (res) => res.action === "Update an employee role",
      },
      {
        message: "What is the new role?",
        type: "list",
        name: "newrole",
        choices: async function listRole() {
          const role = await getRoleTitle();
          let roles = [];
          for (let index = 0; index < role.length; index++) {
            let list = role[index].title;
            roles.push(list);
          }
          return roles;
        },
        when: (res) => res.action === "Update an employee role",
      },
    ])
    .then(async (res) => {
      
      // DEFINE ACTION FROM USER INPUT AND PERFORM TASK
      switch (res.action) {
        // if user chooses view all departments display departments
        case "View all departments":
          const departments = await getDept();
          console.table(departments);
          break;

        // if user chooses view all roles display roles
        case "View all roles":
          const roles = await getRoles();
          console.table(roles);
          break;

        // if user chooses view all employees display employees
        case "View all employees":
          const allDepts = await getEmployees();
          console.table(allDepts);

          break;

        // if users chooses, add dept
        case "Add a department":
          const deptname = res.deptname;
          await addDept(deptname);
          break;

        // if user chooses, add role
        case "Add a role":
          const roletitle = res.rolename;
          const rolesal = res.rolesal;
          const roledept = res.roledept;
          const depts = await getDeptId(roledept);
          await addRole(roletitle, rolesal, depts[0]);

          break;

        // if user chooses, add employee
        case "Add an employee":
          const first = res.firstname;
          const last = res.lastname;
          const role = await getRoleId(res.emprole);
          const manager = await getManagerId(res.manager);
          let iRole = role[0];

          if (manager === 0) {
            await addEmployee(first, last, iRole[0].id);
          } else {
            let iManager = manager[0].id;
            await addEmployee(first, last, iRole[0].id, iManager);
            console.log(iManager)
          }
          break;

        // if user chooses, update employee role
        case "Update an employee role":
          const emp = res.update;
          const newrole = res.newrole
          const roleArray = await getRoleId(newrole);
          const iNewRole = roleArray[0]
          await updateRole(emp, iNewRole)
          
          break;

        // exit the application
        case "Exit":
          process.exit(0);
          break;
      }

      // UNLESS USER SELECTS EXIT RUN PROMPT AGAIN
      await start();
    });
}

// INITIALIZE FUNCTION

start();
