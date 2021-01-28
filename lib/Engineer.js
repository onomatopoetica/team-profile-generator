// TODO: Write code to define and export the Engineer class. Engineer class inherits from Employee with the extends keyword.
// In addition to `Employee`'s properties and methods, `Engineer` will also have:
//   * github  // GitHub username
//   * getGithub()
//   * getRole() // Overridden to return 'Engineer'


const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }

    getGithub() {
        return this.github;
    }
    getRole() {
        return "Engineer";
    }
}

module.exports = Engineer;