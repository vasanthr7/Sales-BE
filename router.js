
module.exports = (app,db) => {
    
    const customers = require('./Userdetails/customers')(db);
    const Login = require('./Loginusers/Customerlogin')(db);
    const myorders = require('./OrdersItems/Order')(db);
    const verifyToken = require("./middleware/auth");

    app.post('/Createuser', customers.CreateCustomer);
    app.get('/userlist',verifyToken, customers.CustomerList);
    app.patch('/updateuser',verifyToken, customers.UpdateCustomer);
    app.post('/forgetpassword', customers.ResetPassword);
    app.delete('/deleteuser',verifyToken, customers.RemoveCustomer);
    app.post('/loginuser', Login.LoginCustomer);


    app.post('/order',verifyToken, myorders.myorder);



    const myproduct = require('./ProductDetails/product')(db);

    app.post('/CreateProduct', myproduct.CreateProduct);
    app.get('/getProduct', myproduct.getProduct);
}