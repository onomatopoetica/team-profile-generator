const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "teamMembers.html");

const render = require("./lib/htmlRenderer");
// const Employee = require("./lib/Employee");

const teamMembers = [];

console.log("Hi! Let's create your team profile!");

function teamQuestions() {

    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter the name of the team member would like to add:"
        },
        {
            type: "input",
            name: "id",
            message: "Enter the team member's ID number:"
        },
        {
            type: "input",
            name: "email",
            message: "Enter the team member's email address:"
        },
        {
            type: "list",
            name: "answerRole",
            message: "Select the team member's role:",
            choices: ["Manager",
                "Engineer",
                "Intern"]
        },
    ]).then(function (answers) {
        if (answers.answerRole === "Manager") {
            managerQuestions(answers);
        } else if (answers.answerRole === "Engineer") {
            engineerQuestions(answers);
        } else if (answers.answerRole === "Intern") {
            internQuestions(answers);
        }
    })
}

function managerQuestions(managerAnswers) {
    inquirer.prompt([
        {
            type: "input",
            name: "officeNumber",
            message: "Enter the manager's office number:"
        },
        {
            type: "confirm",
            name: "answerAddTeamMember",
            message: "Would you like to add another team member?"
        },
    ]).then(function (answers) {
        const newManager = new Manager(managerAnswers.name, managerAnswers.id, managerAnswers.email, answers.officeNumber);
        teamMembers.push(newManager);
        if (answers.answerAddTeamMember === true) {
            teamQuestions();
        } else {
            generateTeam();
            console.log("Yay! Your team profile has been created!");
        }
    })
}

function engineerQuestions(engineerAnswers) {
    inquirer.prompt([
        {
            type: "input",
            name: "github",
            message: "Enter the engineer's GitHub profile name:"
        },
        {
            type: "confirm",
            name: "answerAddTeamMember",
            message: "Would you like to add another team member?"
        },
    ]).then(function (answers) {
        const newEngineer = new Engineer(engineerAnswers.name, engineerAnswers.id, engineerAnswers.email, answers.github);
        teamMembers.push(newEngineer);
        if (answers.answerAddTeamMember === true) {
            teamQuestions();
        } else {
            generateTeam();
            console.log("Yay! Your team profile has been created!");
        }
    })
}

function internQuestions(internAnswers) {
    inquirer.prompt([
        {
            type: "input",
            name: "school",
            message: "Enter where the intern attends school:"
        },
        {
            type: "confirm",
            name: "answerAddTeamMember",
            message: "Would you like to add another team member?"
        },
    ]).then(function (answers) {
        const newIntern = new Intern(internAnswers.name, internAnswers.id, internAnswers.email, answers.school);
        teamMembers.push(newIntern);
        if (answers.answerAddTeamMember === true) {
            teamQuestions();
        } else {
            generateTeam();
            console.log("Yay! Your team profile has been created!");
        }
    })
}

function generateTeam() {
    const html = render(teamMembers);
    fs.writeFile(outputPath, html, function(error) {
        if (error) {
            console.log("Ooops, an error has occurred");
        } else {
            console.log("Go get your team profile!");
        }     
    }) 
}

teamQuestions();
