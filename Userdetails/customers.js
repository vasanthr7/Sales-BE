const bcrypt = require("bcryptjs");
module.exports = (db) => {
  return {
    CreateCustomer: (req, res) => {
      let value = [
        req.body.FirstName,
        req.body.LastName,
        req.body.MobileNumber,
        req.body.Email,
        req.body.Password
      
      ];
      bcrypt.genSalt(10, function (err, Salt) {
        // The bcrypt is used for encrypting password.
        bcrypt.hash(req.body.Password, Salt, function (err1, hash) {
          if (err1) {
            console.log("Cannot encrypt")
            return res.status(400).send("Cannot encrypt");
           
          }

          if (hash) {
            value[4] = hash;
            console.log(hash);
            db.query(
              `call createtUser(?,?,?,?,?)`,
              //  ` INSERT INTO customers (first_name,last_name,mobile_number,email,password,country) values(?,?,?,?,?,?)`,
              value,
              (err, data) => {
                if (err) {
                  console.log(err), res.status(400).send(err);
                } else {
                  var Result1;
                  if (data[0][0].fail == ["user  already Exists"]) {
                    Result1 = data[0][0].fail;
                  } else {
                    Result1 = data[0][0].sucess;
                  }
                  let resp = {
                    Result: Result1,
                  };
                  res.status(200).send(resp);
                  console.log(resp);
                }
              }
            );
          }
          else{

          }
        });
      });
    },
    CustomerList: (req, res) => {
      // console.log(req.user.Id)
      db.query(
        `SELECT UserId,FirstName,LastName,MobileNumber,Email FROM user where UserId=${req.user.Id}`,
        (err, data) => {
          if (err) {
            console.log(err), res.status(400).send(err);
          } else {
            console.log(data), res.status(200).send(data);
          }
        }
      );
    },
    UpdateCustomer: (req, res) => {
      let qry = `
      UPDATE user SET `;
      let updateParams = [];

      // Object.keys(req.body).forEach(x => {
      //   updateParams.push(x + " = " + `'${req.body[x]}'`)
      // })

      if (req.body.first_name)
        updateParams.push(`FirstName = '${req.body.first_name}'`);
      if (req.body.last_name)
        updateParams.push(`LastName = '${req.body.last_name}'`);
      if (req.body.country)
        updateParams.push(`MobileNumber = '${req.body.country}'`);

      qry += updateParams.join(", ");
      qry += ` WHERE Email = '${req.body.email}'`;

      if (updateParams.length) {
        console.log(qry);
        db.query(qry, (err, data) => {
          if (err) {
            console.log(err), res.status(400).send(err);
          } else {
            console.log(data), res.status(200).send("User Update successfully");
          }
        });
      }
    },
    ResetPassword: (req, res) => {   
      bcrypt.genSalt(10, function (err, Salt) {
        // The bcrypt is used for encrypting password.
        bcrypt.hash(req.body.password, Salt, function (err1, hash) {
          if (err1) {
            return console.log("Cannot encrypt");
          }

          if (hash) {
            req.body.password = hash;
            console.log(hash);
            db.query(`UPDATE customers SET password = '${req.body.password}' WHERE email = '${req.body.email}'`, (err, data) => {
              if (err) {
                console.log(err), res.status(400).send(err);
              } else {
                console.log(data), res.status(200).send("User Update successfully");
              }
            })
          }})})

          ;
      
    },
    ResetPassword: (req, res) => {   
    
            db.query(`UPDATE customers SET password = '${req.body.password}' WHERE email = '${req.body.email}'`, (err, data) => {
              if (err) {
                console.log(err), res.status(400).send(err);
              } else {
                console.log(data), res.status(200).send("User Update successfully");
              }
            })
          

          ;
      
    }, 
    RemoveCustomer: (req, res) => {   
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
                db.query(`DELETE FROM customers WHERE email = '${req.body.email}'`, (err, data) => {
                    if (err) {
                      console.log(err), res.status(400).send(err);
                    } else {
                      console.log(data), res.status(200).send("Remove customer successfully");
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


















  };
};
