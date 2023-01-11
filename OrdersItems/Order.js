
module.exports = (db) => {
  return {
   
    myorder: (req, res) => {   
      db.query(`SELECT  o.order_id ,o.item,o.amount,f.Fruits_Description,o.customer_id FROM orders o
      LEFT JOIN fruits f on o.order_id=f.fruit_Id where customer_id=${req.user.Id}`,  (err, data) => {
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
