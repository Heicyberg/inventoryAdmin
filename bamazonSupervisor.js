var inquirer = require("inquirer");
require("dotenv").config();
var mysql = require("mysql");

//set up connections
var connection = mysql.createConnection({
    host: "localhost",    
    // Your port; if not 3306
    port: 3306,     
    // Your username
    user: "root",
    // Your password
    password: process.env.MYSQL_PASSWORD,
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    start();
  });

  function start(){
      inquirer.prompt([  
      {
        type: "list",
        choices: ['View Products Sale by Department','Add New Department'],
        name: "task",
        message: " please select supervisor operations from the menu"
      }
      ]).then(function(user){
          switch (user.task){
             case 'View Products Sale by Department':
             viewDepartmentSale();
             break;
             case 'Add New Department':
             addProduct();
             break;
          }
    })
  }