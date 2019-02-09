create database bamazon_db;

use bamazon_db;
create table products (
    id int NOT NULL auto_increment,
    product_name varchar (200) not null,
    department_name varchar (200) not null,
    price dec (10,2),
    stock_quantity int (255) not null,
    primary key (id)
	);
    

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("OPI MOD About you","Beauty",9.99,10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Red Hydro Flask","Outdoor",49.50,25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Yankee Candle","Home",19.95,15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Fortnite Tee Shirt","Clothing",19.95,10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("English Bulldog Sticker ","Atrs & Crafts",4.95,5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("You've Got Mail","Entertainment",15.00,5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lulu Lemon Pants","Clothing",120.00,15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Fart Machine","Toys",9.95,10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Keurig Coffee Machine","Home",120.00,50);
    
    
    
    
