
var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

function start(){
connection.query('SELECT * FROM products', function(err, res){
  if(err) throw err;


  for(var i = 0; i<res.length;i++){
    console.log("ID: " + res[i].id + " | " + "product_name: " + res[i].product_name + " | " + "department_name: " + res[i].department_name + " | " + "price: " + res[i].price + " | " + "stock_quanity: " + res[i].stock_quanity);
    console.log('--------------------------------------------------------------------------------------------------')
  }

  console.log(' ');
  inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "What is the name of the item you are looking for?",
      validate: function(value){
        if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
          return true;
        } else{
          return false;
        }
      }
    },
    {
      type: "input",
      name: "qty",
      message: "How much would you like to buy?",
      validate: function(value){
        if(isNaN(value)){
          return false;
        } else{
          return true;
        }
      }
    }
    ]).then(function(ans){
      var whatToBuy = (ans.id)-1;
      var howMuchToBuy = parseInt(ans.qty);
      var grandTotal = parseFloat(((res[whatToBuy].Price)*howMuchToBuy).toFixed(2));

      if(res[whatToBuy].StockQuantity >= howMuchToBuy){
        connection.query("UPDATE products SET ? WHERE ?", 
        [
        {
            StockQuantity: (res[whatToBuy].StockQuantity - howMuchToBuy)
        },
        {
            ItemID: ans.id
        }
        ], function(err, result){
            if(err) throw err;
            console.log("Success! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped to you in 364 business days.");
        });

        connection.query("SELECT * FROM department_name", function(err, deptRes){
          if(err) throw err;
          var index;
          for(var i = 0; i < deptRes.length; i++){
            if(deptRes[i].department_name === res[whatToBuy].department_name){
              index = i;
            }
          }
          
          connection.query("UPDATE Departments SET ? WHERE ?", [
          {TotalSales: deptRes[index].TotalSales + grandTotal},
          {DepartmentName: res[whatToBuy].DepartmentName}
          ], function(err, deptRes){
              if(err) throw err;
             
          });
        });

      } else{
        console.log("Sorry, item unavailable");
      }

      reprompt();
    });
})
}

function reprompt(){
  inquirer.prompt([{
    type: "confirm",
    name: "reply",
    message: "Would you like to purchase another item?"
  }]).then(function(ans){
    if(ans.reply){
      start();
    } else{
      console.log("Buh Bye");
    }
  });
}

start();