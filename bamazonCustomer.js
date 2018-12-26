var inquirer = require("inquirer");
require("dotenv").config();
var mysql = require("mysql");

//global variables:

var input = { };
var updatedInventory;
var orderCost;

//database set up
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
      //start function show the table of products avalible to buy
      function start(){
        connection.query("SELECT * FROM products", function(err, results) {
          if (err) throw err;
          layout(results);
          Idbuy();
        })
      }
      
      //Idbuy is function that customers buy items by id index
      function Idbuy() {
        inquirer.prompt([
            {
              type: "input",
              name: "Index",
              message: " What's index(first column) of the product you want to buy?"
            },
            {
                type: "input",
                name: "number",
                message: "How many units you want to buy?"   
            }
            ]).then(function(user){
                input.units = user.number;
                input.index = user.Index;
                var qury = "select * from products where ?";
                connection.query(qury,{item_id:user.Index},function(err,data){
                  if (err) throw err;
                  if (user.number <= data[0].stock_qulity){
                    orderCost = user.number * data[0].price
                    updatedInventory = data[0].stock_qulity - user.number;
                    console.log("You have oredered "+user.number+" "+data[0].product_name+"s")
                    console.log("Totally cost will be: $"+orderCost)
                    inquirer.prompt([
                      {
                        type: "confirm",
                        name: "confirm",
                        message: " Are you sure ?",
                        default: true
                      }
                    ]).then(function(user){
                      if(user.confirm){
                        console.log("Your order has been placed!\n");
                        console.log("Thank you for shopping with us!\n");

                        connection.query('UPDATE products SET stock_qulity = ? WHERE item_id = ?', [updatedInventory,input.index]);
                        //updates product_sales for the department
                        //connection.query('UPDATE departments INNER JOIN products ON products.department_name=departments.department_name SET product_sales  = product_sales + ? WHERE item_id= ?', [orderCost,input.index])
                        connection.query('UPDATE products SET product_sales  = product_sales + ? WHERE item_id= ?', [orderCost,input.index])
                        start();
                      }else{
                        console.log("Here's the table of products on sale!")
                        start();
                      }
                    })
                  }else{
                    console.log("Insufficeint quantity!")
                    console.log("Do you want some thing else ?")
                    start();
                  }
                }) 
            })
      }

      function layout(object){
         var n = object.length;
         var tableHolder = [];
          for (i = 0; i< n; i++){ 
              var tablerow = {
                ID_number : object[i].item_id,
                Product : object[i].product_name,
                Price : '$'+object[i].price
              }
            tableHolder.push(tablerow)
         }
        const transformed = tableHolder.reduce((acc, {ID_number, ...x}) => { acc[ID_number] = x; return acc}, {})
        console.table(transformed)
      }

  