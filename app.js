// IMPORT INQUIERER NPM
const inquirer = require("inquirer");
const { getDept } = require("./modules/department");

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
      {
        message: 'What is the department name?',
        type: 'input',
        name: 'dept-name',
        when: (res) => res.action === 'Add a department',
      }
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
          break;
      
    // if user chooses view all employees display employees
        case "View all employees":
          break;
      
    // if users chooses, add dept 
        case "Add a department":
            const department = await getDept(department);
          break;
      
    // if user chooses, add role
        case "Add a role":
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