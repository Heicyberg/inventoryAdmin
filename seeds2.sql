USE bamazon;
DROP TABLE IF EXISTS bamazon.departments;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NULL,
  over_head_cost INT NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_id,department_name,over_head_cost) VALUES (10001,'Appliance',300);
insert INTO departments (department_name,over_head_cost) VALUES ('books',200),('Cooking',60),('Electronics',1000),('Foods',200),('Furniture',800);

select * FROM departments