var express = require("express");
var router = express.Router();
const connector = require("../poolconnect");
router.get("/createtable", function (req, res) {
  const sql =
    "CREATE TABLE cars( id INT PRIMARY KEY AUTO_INCREMENT ,carname varchar(200) ,color ENUM('black','blue','grey') ,price int,instock boolean)";
  connector.query(sql, (err, results, fields) => {
    res.json({ err, results, fields });
  });
});
router.get("/", function (req, res) {
  const sql = `select * from cars`;
  connector.query(sql, (err, results) => {
    res.json({ err, results });
  });
});
router.get("/:id", (req, res) => {
  const sql = `select * from cars where id=?`;
  connector.query(sql, [Number(req.params.id)], (err, results) => {
    res.json({ err, results });
  });
});
router.post("/", (req, res) => {
  const { carname, color, price, instock } = req.body;
  sql = `insert into cars (carname,color,price,instock) values(?,?,?,?)`;
  connector.query(sql, [carname, color, price, instock], (err, results) => {
    res.json({ err, results });
  });
});
router.put("/update/:id", (req, res) => {
  const { carname, color, price, instock } = req.body;
  const sql = `update cars set carname=?,color=?,price=?,instock=? where id=?`;
  connector.query(
    sql,
    [carname, color, price, instock, Number(req.params.id)],
    (err, results, fields) => {
      if (err) {
        res.json(err);
      } else {
        res.json({ results });
      }
    }
  );
});
router.delete("/", (req, res) => {
  sql = `delete from cars`;
  connector.query(sql, (err, results) => {
    res.json({ err, results });
  });
});
router.delete("/:id", (req, res) => {
  sql = `delete from cars where id=?`;
  connector.query(sql, [Number(req.params.id)], (err, results) => {
    res.json({ err, results });
  });
});
module.exports = router;
