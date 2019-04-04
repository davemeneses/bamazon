// this tells the code what NPM packages to use
var inquirer = require("inquirer");
var mysql = require("mysql");

// this creates the MySQUL connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon"
});

// this check if you're connecting to your database
// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId + "\n");
// });

// this is a function to display the data from MySQUL database
function displayStock() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("\n");
    console.table(res);
    console.log("-----------------------------------------------------");
    var choiceArr = [];
    // Loop thru products and add to array
    for (var j = 0; j < res.length; j++) {
      // Push products to choice array
      choiceArr.push(res[j].product_name);
    }
  });
}

displayStock();

// // this function makes sure the customer is entering a positing number
// function validation(value) {
//   // Number.isInteger() is cool because it make's sure the customer is entering an integer. parseFloat make a string a number, or in this case an integer
//   var integer = Number.isInteger(parseFloat(value));
//   // Math.sign() is cool because it tells you if the number entered by a user is positive, negative, or zero.
//   var signCheck = Math.sign(value);
//   //   this if/else checks to make sure the user's input is what we want, otherwise it asks the user to enter a positive number.
//   if (integer && signCheck === 1) {
//     return true;
//   } else {
//     return "Please enter a positive number.";
//   }
// }
// // this is the function that uses inquirer to help the user make purchases
// function purchase() {
//     // this first question asks the user to selection what item they wish to purchase by it's ID number
//   inquirer.prompt([
//     {
//       type: "input",
//       name: "item_id",
//       message: "Select the item you wish to purchase by the ID number."
//       validate: validation,
//       filter: Number

//     },
//     {
//         type: 'input',
//         name: 'stock_quantity',
//         message: 'How many would you like to purchase?',
//         validate: validation,
//         filter: Number
//     }
//   ]);
// };
