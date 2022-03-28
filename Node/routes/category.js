var express = require("express");
var router = express.Router();
const connector = require("../poolconnect");
router.get("/createtable", function (req, res) {
  const sql =
    "CREATE TABLE categories(id INT, name VARCHAR(100), description text, PRIMARY KEY(id))";
  connector.query(sql, (err, results, fields) => {
    res.json({ err, results, fields });
  });
});
router.get("/", (req, res) => {
  const sql = "SELECT * from categories";
  connector.query(sql, (err, results, fields) => {
    if (err) {
      res.json(err);
    } else {
      res.json({ results });
    }
  });
});
router.post("/", (req, res) => {
  const { id, name, description } = req.body;
  const sql = `INSERT INTO categories VALUES(?,?,?)`;
  connector.query(sql, [id, name, description], (err, results, fields) => {
    if (err) {
      res.json(err);
    } else {
      res.json({ results });
    }
  });
});
router.put("/update/:id", (req, res) => {
  const { name, description } = req.body;
  const sql = `UPDATE categories SET name=?, description=? WHERE id=${req.params.id};`;
  connector.query(sql, [name, description], (err, results, fields) => {
    if (err) {
      res.json(err);
    } else {
      res.json({ results });
    }
  });
});
router.delete("/:id", (req, res) => {
  const sql = `DELETE FROM categories WHERE id="${req.params.id}";`;
  connector.query(sql, (err, results, fields) => {
    if (err) {
      res.json(err);
    } else {
      res.json({ results });
    }
  });
});
router.delete("/", (req, res) => {
  const sql = "DELETE FROM categories";
  connector.query(sql, (err, results, fields) => {
    if (err) {
      res.json(err);
    } else {
      res.json({ results });
    }
  });
});
module.exports = router;
