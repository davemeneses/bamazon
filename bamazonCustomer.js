// this tells the code what NPM packages to use
var inquirer = require("inquirer");
var mysql = require("mysql");

// this creates the MySQUL connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "",
  database: "bamazon"
});

// this check if you're connecting to your database
// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId + "\n");
// });

//these are the variable I used to track how much stock there was an any given item
var stock;
var updatedStock;

// this function makes sure the customer is entering a positing number I couldn't get it to fully work so I just commented it out.
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

// Customer shopping function
function userShop() {
  connection.query(
    //this tells the computer which table to generate data from the database
    "SELECT * FROM products",
    // This displays the table of products the user can choose from.
    function(err, res) {
      if (err) throw err;
      console.log("\n");
      console.table(res);
      //   console.log(
      //     "----------------------------------------------------------------"
      //   );
      // This is where I store the user's answers from inquirer.

      var userSelections = [];
      // Loop thru products and add to array
      for (var j = 0; j < res.length; j++) {
        // Push products to choice array
        userSelections.push(res[j].product_name);
      }
      // now we actually start asking the user questions with Inquirer
      inquirer
        .prompt([
          {
            // this question asks the user to choose an item by it's ID number
            type: "list",
            message: "Please select an item to purchase.",
            name: "itemChoice",
            choices: userSelections
          },
          {
            // this question asks the user how many of the item they wish to purchase
            type: "input",
            message: "Please enter how many you would like to purchase?",
            name: "itemNum"
          }
        ])
        .then(function(answer) {
          // this sets the stock number to how many are in the database
          stock = res[userSelections.indexOf(answer.itemChoice)].stock_quantity;
          // and this updatedStock is how many are left less the amount the user purchased
          updatedStock = stock - answer.itemNum;
          // this if/else stops the user from buying more of the item than there are
          if (answer.itemNum <= stock) {
            connection.query(
              // this updates the number of items in stock based on the user's answers
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: updatedStock
                },
                {
                  product_name: answer.itemChoice
                }
              ],
              function(err) {
                if (err) throw err;
                console.log("Thank you for your purchase!");
                continueShopping();
              }
            );
            // If there are not enough items left in stock this lets the user know and prompts them to make different selections
          } else if (answer.itemNum > stock) {
            console.log("Insufficient stock, please make another selection.");
            // calls my function that asks the user if they want to keep shopping
            continueShopping();
          }
        });
    }
  );
}

// this calls the userShop().
userShop();

function continueShopping() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Continue shopping?",
        name: "continueShopping",
        choices: ["yes", "no"]
      }
    ])
    .then(function(answer) {
      if (answer.continueShopping === "yes") {
        // if the user selects yes the userShop function is called again
        userShop();
        // if not it ends the connection and leaves the following message
      } else {
        console.log("Thanks, have a great day!");
        // End the connection
        connection.end();
      }
    });
}
