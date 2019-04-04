# Bamazon

## Description

This project is a light, Amazon shopping clone. Included right now is only the customer side where the customer is able to:

- See the name, price and quantity of items in stock
- Select an item to purchase
- Select how many of the item to purchase
- See the updated inventory numbers,
- Choose to exit or shop again.

## Technologies Used

- Node
- MAMP & MySQL
- Inquirer & MySQL NPM Packages

## Setting Up A Server

To be able to run the app the user must first have a database set up. I chose MySQL. Inside of MySQL you would first run the commands in the schema.sql file to create the database, then populate the inventory with the data in the seeds.sql.

## Running The App

After the database is set-up the user then runs "node bamazonCustomer.js" in their terminal to begin shopping.
