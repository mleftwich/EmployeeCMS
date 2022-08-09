// IMPORT INQUIERER NPM
const inquirer = require("inquirer");
const { getDept, addDept, getDeptId } = require("./modules/department");
const { addRole, getRoles } = require("./modules/roles");


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
        message: 'What is the department name?',
        type: 'input',
        name: 'deptname',
        when: (res) => res.action === 'Add a department',
      },
      // PROMPT USER FOR ROLE INFO
      {
        message: 'What is the Role?',
        type: 'input',
        name: 'rolename',
        when: (res) => res.action === 'Add a role',
      },
      {
        message: 'What is the salary for this Role?',
        type: 'input',
        name: 'rolesal',
        when: (res) => res.action === 'Add a role',
      },
      {
        message: 'What department does this Role belong to?',
        type: 'list',
        name: 'roledept',
        choices: async function listDepts() {
          const depts = await getDept(); return depts },
        when: (res) => res.action === 'Add a role',
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
          let depts = await getDeptId(roledept)
          console.log(depts.length)
          await addRole(roletitle, rolesal, depts);
        break;
      
    // if user chooses, add employee
        case "Add an employee":
          break;
      
   // if user chooses, update employee role
        case "Update an employee role":
          break;
      
    // exit the application
        case 'Exit':
          process.exit(0);
          break;
      }

      // UNLESS USER SELECTS EXIT RUN PROMPT AGAIN
      await start();
    });
}


// INITIALIZE FUNCTION

start();