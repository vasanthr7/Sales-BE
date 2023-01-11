const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config=require("../config")
// const { JsonWebTokenError } = require("jsonwebtoken");
module.exports = (db) => {
    return {
        LoginCustomer: (req, res) => {   
            db.query(`select password FROM customers WHERE email = '${req.body.email}'`, (err, pwd) => {
              if (err) {
                console.log(err), res.status(400).send(err);
              } else {   
                bcrypt.compare(
                  req.body.password,
                  pwd[0].password,
                  function (err, result) {
                    if (err) {
                      console.log(err), res.status(400).send(err);
                    }
                    if (result) {
                      console.log("compare", result);
                      db.query(`SELECT customer_id,first_name,last_name,mobile_number FROM customers WHERE email = '${req.body.email}'`, (err, data) => {
                          if (err) {
                            console.log(err), res.status(400).send(err);
                          } else {
                            // console.log(data.customer_id+"yes");
                            
                            let token=  jwt.sign({
                                 date : new Date,   
                                 Id:data[0].customer_id
                          },config.secretkey)
                          
                          console.log(token);

                          let resu={
                            access_token : token,
                            Data :data[0]
                          }
                            console.log(data), res.status(200).send(resu);
                          }
                        }
                      );
                    } else {
                      console.log(result), res.status(401).send("Enter valid Password");
                    }
                  }
                )
                
              }
            })
          },








    }
};