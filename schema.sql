-- this is the schema
create database bamazon
use bamazon
CREATE TABLE products (
  id integer(11) auto_increment NOT NULL,
  product_name varchar (30),
  department_name VARCHAR(30),
  price INTEGER(11),
  stock_quantity integer(11),
  primary key(id)
);
select * from products
