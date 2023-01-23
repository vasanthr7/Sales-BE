module.exports = (db) => {
  return {
    CreateProduct: (req, res) => {
      let value = [
        req.body.ProductName,
        req.body.CategoryId,
        req.body.quantity,
        req.body.Price,
        req.body.DiscountId,
        req.body.Description
      ];
            db.query(
               ` INSERT INTO product (ProductName,CategoryId,quantity,Price,DiscountId,Description) values(?,?,?,?,?,?)`,
              value,
              (err, data) => {
                if (err) {
                  console.log(err), res.status(400).send(err);
                } else {                  
                  let resp = {
                    Result: "Producted added successfully",
                  };
                  res.status(200).send(resp);
                }
              }
            );
          
        
    },
    getProduct: (req, res) => {
                 db.query(
               ` SELECT ProductName,Price,quantity,Description FROM product`,
              (err, data) => {
                if (err) {
                  console.log(err), res.status(400).send(err);
                } else {                  
                  let resp = {
                    Result: data,
                    msg:"Get producet successfully"
                  };
                  
                  res.status(200).send(resp);
                }
              }
            );
          
        
    },
   


















  };
};
