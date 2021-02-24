var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "1234",
    database: "etDB"
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                //Add departments, roles, employees
                "Add department",
                "Add role",
                "Add employee",
                //View departments, roles, employees
                "View departments",
                "View roles",
                "View employees",
                //Update employee roles
                "Update employee role",
                //Delete departments, roles, and employees
                "Remove departments",
                "Remove roles",
                "Remove employees",
                "Quit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Add department":
                    addDepartment();
                    break;

                case "Add role":
                    addRole();
                    break;

                case "Add employee":
                    addEmployee();
                    break;

                case "View departments":
                    viewDepartment();
                    break;

                case "View roles":
                    viewRoles();
                    break;

                case "View employees":
                    viewEmployees();
                    break;

                case "Update employee role":
                    updateEmployeeRole();
                    break;

                case "Remove departments":
                    removeDepartments();
                    break;

                case "Remove roles":
                    removeRoles();
                    break;

                case "Remove employees":
                    removeEmployees();
                    break;

                case "Quit":
                    connection.end();
                    break;
            }
        });
};


function addDepartment() {
    inquirer.prompt([{
        name: "name",
        type: "input",
        message: "Please Enter Department Name"
    }])
    .then(function(answer){
        var query = `INSERT INTO department (name) VALUES (?)`;
        var values = [answer.name];
        connection.query(query, values, function(err, res){
            connection.query("SELECT * FROM department", function(err, res){
                console.table(res);
                runSearch();
            });
        });
    });
};

function addRole() {
    inquirer.prompt([{
        name: "title",
        type: "input",
        message: "Please Enter the Role Title"
    }, {
        name: "salary",
        type: "number",
        message: "Please Enter the Yearly Salary"
    }, {
        name: "department_id",
        type: "number",
        message: "What is the Department ID number"
    }])
    .then(function(answer){
        var query = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
        var values = [answer.title, answer.salary, answer.department_id];
        connection.query(query, values, function(err, res){
            connection.query("SELECT * FROM department", function(err, res){
                console.table(res);
                runSearch();
            });
        });
    });
};

function addEmployee() {
    inquirer.prompt([{
        name: "first_name",
        type: "input",
        message: "Please Enter the First Name"
    }, {
        name: "last_name",
        type: "input",
        message: "Please Enter the Last Name"
    }, {
        name: "role_id",
        type: "number",
        message: "Please Enter the Role ID Number"
    },{
        name: "manager_id",
        type: "input",
        message: "What is your Manager ID? Enter null if not konwn"
    }])
    .then(function(answer){
        var query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        var values = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];
        connection.query(query, values, function(err, res){
            connection.query("SELECT * FROM department", function(err, res){
                console.table(res);
                runSearch();
            });
        });
    });

};

function viewDepartment() {
    var query = "SELECT * FROM department";
    connection.query(query, function(err, res){
        if (err) throw err;
        console.table(res);
        runSearch();
    });
};

function viewRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res){
        if (err) throw err;
        console.table(res);
        runSearch();
    });
};

function viewEmployees() {
    var query = "SELECT * FROM employee";
    connection.query(query, function(err, res){
        if (err) throw err;
        console.table(res);
        runSearch();
    });
};

// function updateEmployeeRole() {

// };

// function removeDepartments() {

// };

// function removeRoles() {

// };

// function removeEmployees() {

// };

