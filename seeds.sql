
CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_qulity INT NULL,
  PRIMARY KEY (item_id)
);



INSERT INTO products (item_id,product_name,department_name,price,stock_qulity) VALUES (1,'Line retangular desk','Furniture',48.5,30);

INSERT INTO products (product_name,department_name,price,stock_qulity) VALUES ('Microwave','Appliance',59.99,300),('Big Debt Crises','Books',33.06,40),
('Dash Cam','Electronics',49.99,400);

INSERT INTO products (product_name,department_name,price,stock_qulity) VALUES ('Writing desk','Furniture',89.00,200), ('4K TVs','Electronics',348,80),
('Strawberry jam','Foods',3.99, 80),('Chilken meatablls','Foods',2.99,70),('Oven dish','Cooking',5.99,80),('Lamp','Furniture',26.99, 40);

