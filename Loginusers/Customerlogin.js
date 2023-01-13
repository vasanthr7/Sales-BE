const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config=require("../config")
// const { JsonWebTokenError } = require("jsonwebtoken");
module.exports = (db) => {
    return {
        LoginCustomer: (req, res) => {   
            db.query(`select Password FROM user WHERE Email = '${req.body.email}'`, (err, pwd) => {
              if (err) {
                console.log(err), res.status(400).send(err);
              } else {   
                bcrypt.compare(
                  req.body.password,
                  pwd[0].Password,
                  function (err, result) {
                    if (err) {
                      console.log(err), res.status(400).send(err);
                    }
                    if (result) {
                      console.log("compare", result);
                      db.query(`SELECT UserId,FirstName,LastName,MobileNumber FROM user WHERE Email = '${req.body.email}'`, (err, data) => {
                          if (err) {
                            console.log(err), res.status(400).send(err);
                          } else {
                            // console.log(data.customer_id+"yes");
                            
                            let token=  jwt.sign({
                                 date : new Date,   
                                 Id:data[0].UserId
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