var inquirer = require("inquirer");
require("dotenv").config();
var mysql = require("mysql");
const cTable = require('console.table')

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

function viewDepartmentSale(){
  connection.query("SELECT departments.department_id,departments.department_name, departments.over_head_cost, t1.product_sales, t1.product_sales - departments.over_head_cost as total_profit FROM (SELECT products.department_name,sum(product_sales) as product_sales FROM products GROUP BY products.department_name ) as t1 join departments on t1.department_name=departments.department_name", function(err, results) {
    if (err) throw err;
    console.table(results);
    start();
})
}