
module.exports = (db) => {
  return {
   
    myorder: (req, res) => { 

      let value = [
        req.body.Product_Id,
        req.user.Id,
        req.body.Price


      ];
      // INSERT INTO `sales`.`order` (`Product_Id`, `User_Id`, `Price`, `True`) VALUES ('2', '2', '50', '1');
           
      //   `SELECT  o.order_id ,o.item,o.amount,f.Fruits_Description,o.customer_id FROM orders o
      // LEFT JOIN fruits f on o.order_id=f.fruit_Id where customer_id=${req.user.Id}`
      db.query(`insert into \`order\` (Product_Id, User_Id,Price, Activestatus) VALUES (?, ?, ?,1)`,value,(err, data) => {
        if (err) {
          console.log(err), res.status(400).send(err);
        } else {
          console.log(data), res.status(200).send(data);
        }
      }
      )
    },


















  };
};
