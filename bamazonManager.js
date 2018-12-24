var inquirer = require("inquirer");
require("dotenv").config();
var mysql = require("mysql");
var selection = [];

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
        choices: ['View Products for Sale','View Low Inventory','Add to Inventory','Add New Product'],
        name: "task",
        message: " please select operations from the menu"
      }
      ]).then(function(user){
          switch (user.task){
             case 'View Products for Sale':
             viewProducts();
             break;
             case 'View Low Inventory':
             viewLowInventory();
             break;
             case 'Add to Inventory':
             addInventory();
             break;
             case 'Add New Product':
             addProduct();
             break;
          }
    })
  }

// If a manager selects View Products for Sale, 
//the app should list every available item: the item IDs, names, prices, and quantities.
function viewProducts(){
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        layout(results);
    })
}
// If a manager selects View Low Inventory, 
//then it should list all items with an inventory count lower than five.
function viewLowInventory(){
  connection.query("SELECT item_id, product_name, stock_qulity FROM products WHERE stock_qulity < 50", function(err, results) {
    if (err) throw err;
    console.table(results)
   })
}
// If a manager selects Add to Inventory,
// your app should display a prompt that will let the manager "add more" of any item currently in the store.
function AddtoInventory(){
   var item = {};
   connection.query("SELECT item_id, product_name, stock_qulity FROM products WHERE stock_qulity < 50", function(err, data) {
    if (err) throw err;
    var items = [];
    var n = data.length;
    for(i=0;i<n;i++){
      item.item_id = data[i].item_id;
      item.product_name = data[i].product_name;
      selection.push(data[i].product_name)
      item.inventory = data[i].stock_qulity;
      items.push(item)
    }
   });

   inquirer.prompt([
    {
      type: "list",
      choices: selection,
      name: "selection",
      message: " Which item do you want to add inventory?"
    },
    {
      type: "input",
      name: "unit",
      message: " How many unit you to add inventory?"
    }
  ]).then(function(user){
    connection.query('UPDATE products SET stock_qulity = ? WHERE  product_name = ?', [parseInt(user.unit) ,user.selection])
  });
   
}
// If a manager selects Add New Product, 
//it should allow the manager to add a completely new product to the store.


//print the table of IDs, names, prices, and quantities.
function layout(object){
    var n = object.length;
    var tableHolder = [];
     for (i = 0; i< n; i++){ 
         var tablerow = {
           ID_number : object[i].item_id,
           product_name : object[i].product_name,
           Price : '$'+object[i].price,
           quantity:object[i].stock_qulity
         }
       tableHolder.push(tablerow)
    }
   const transformed = tableHolder.reduce((acc, {ID_number, ...x}) => { acc[ID_number] = x; return acc}, {})
   console.table(transformed)
 }

