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

insert into products (product_name, department_name, price, stock_quantity)
  values ('Nic Cage Pillow Case', 'Furniture', '5.99', 20),
  ('Grass Flip Flops', 'Apparel', '19.99', 30),
  ('Nic Cage Pillow Case', 'Furniture', '5.99', 20),
  ('Madagascar Hissing Cockroaches', 'Pets', '15.50', 10),
  ('Nic Cage Pillow Case', 'Furniture', '5.99', 20),
  ('Giant Gummy Python', 'Grocery', '127.99', 15),
  ('Mullet Headband', 'Apparel', '9.99', 100),
  ('Sushi Bazooka', 'Grocery', '14.99', 5),
  ('Cat Butt Tissue Box', 'Furniture', '34.94', 8),
  ('Chambong', 'Grocery', '35.00', 25);

