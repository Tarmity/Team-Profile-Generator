const ManagerC = require("./lib/Manager");
const EngineerC = require("./lib/Engineer");
const InternC = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const employees = [];
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employmentType = [{

    type: "list",
    name: "role",
    choices: [
        "Manager",
        "Intern",
        "Engineer",
        "No more staff to add"
    ]
}];

const allStaffQuestions = [{
   
    type: "input",
    message: "What is your name?",
    name: "name"
},
{
    type: "input",
    message: "What is your id number?",
    name: "id"    
},
{
    type: "input",
    message: "What is you email address?",
    name: "email"
}];

const engineerQuestion = [{
   
    type: "input",
    message: "What is you GitHub username?",
    name: "github"
}];

const internQuestion = [{

    type: "input",
    message: "What School do you go to?",
    name: "school"
}];

const managerQuestion = [{

    type: "input",
    message: "What is your office number?",
    name: "officeNumber"
}];
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

function init(){
    inquirer
    .prompt([...employmentType]).then((data) => {
         if(data.role === "Manager"){
             addManager();
         }else if (data.role === "Intern"){
             addIntern();
         }else if (data.role === "Engineer"){
             addEngineer();
         }else {
             console.log("No more employee's")
             writeToFile("./output/team.html", render(employees))
         }
    })
}

function addManager () {
    inquirer
    .prompt ([ ...allStaffQuestions, ...managerQuestion])
    .then(({name, id, email, officeNumber}) => {
        let manager = new ManagerC (name, id, email, officeNumber);
        if (name === "" && id === "" && email === "" && officeNumber === "" && !isNaN(officeNumber) ) {
            console.log("please enter the correct information");
            addManager();
        }else {
            employees.push(manager);
            init();
        };

    });

};

function addIntern () {  
    inquirer
    .prompt ([ ...allStaffQuestions, ...internQuestion])
    .then(({name, id, email, school}) => {
        let intern = new InternC (name, id, email, school);
        if (name  === "" && id === "" && email === "" && school === "") {
            console.log("please enter the correct information");
            addIntern();  
        }else {
            employees.push(intern);
            init();
              
        };

    });
};


function addEngineer () { 
    inquirer
    .prompt ([ ...allStaffQuestions, ...engineerQuestion])
    .then(({name, id, email, github}) => {
        let engineer = new EngineerC (name, id, email, github);
        if (name === "" && id === "" && email === "" && github === "") {
            console.log("please enter the correct information");
            addEngineer();
        }else {
            employees.push(engineer);      
            init();
            
            
        };
    }) 
}

function writeToFile(filename, data) {
    fs.writeFile(filename, data, err => {
        if (err) {
            throw err;
        }
        console.log("Successful!");
    })
}

init()

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
