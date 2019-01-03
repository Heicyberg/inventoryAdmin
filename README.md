# inventoryAdmin
bamazonCustomer.js will bring the table of sale items to customer, including the ids(first column of table, labled as index), names, and prices of products.
 
![Alt text](./images/start_page.png?raw=true "Optional Title")

It take oder from customer, asking them the ID of the product they would like to buy. If the store has enough inventories, a summary of the order will be expressed to user such as total cost of their purchase waiting for comfirmation of oreder, after comfirmation order will be filled.

![Alt text](./images/order_info.png?raw=true "Optional Title")


After the oreder being fulfilled, the SQL database will be update to reflect the remaining quantity. Here are screenshots to demenstrate the difference of inventory of the purchased item, second row.

a.before the order

![Alt text](./images/database.png?raw=true "Optional Title")

b.after the order

![Alt text](./images/database_updated.png?raw=true "Optional Title")

If the store doesn't have enough inventory, user will be told "Insufficient quantity!" and back to start page of sales intems

![Alt text](./images/test_error.png?raw=true "Optional Title")

