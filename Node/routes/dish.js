var express = require("express");
var router = express.Router();
const connector = require("../poolconnect");
router.get("/createtable", function (req, res) {
  const sql =
    "CREATE TABLE dishes(id INT PRIMARY KEY, name VARCHAR(100), description text,categoryid INT, price INT, FOREIGN KEY(categoryid) references categories(id))";
  connector.query(sql, (err, results, fields) => {
    res.json({ err, results, fields });
  });
});
router.get("/", (req, res) => {
  const sql = "SELECT * FROM dishes";
  connector.query(sql, (err, results, fields) => {
    res.json({ results });
  });
});
router.get("/byname/:name", (req, res) => {
  const sql = "SELECT * FROM dishes WHERE name=?";
  connector.query(sql, [req.params.name], (err, results, fields) => {
    if (err) {
      res.json(err);
    } else {
      res.json({ results });
    }
  });
});
router.post("/", (req, res) => {
  const { id, name, description, categoryid, price } = req.body;
  const sql = `INSERT INTO dishes VALUES(?,?,?,?,?)`;
  connector.query(
    sql,
    [id, name, description, categoryid, price],
    (err, results, fields) => {
      if (err) {
        res.json(err);
      } else {
        res.json({ results });
      }
    }
  );
});
router.put("/update/:id", (req, res) => {
  const { name, description, categoryid, price } = req.body;
  const sql = `UPDATE dishes SET name=?, description=?, categoryid=?, price=? WHERE id=${req.params.id};`;
  connector.query(
    sql,
    [name, description, categoryid, price],
    (err, results, fields) => {
      if (err) {
        res.json(err);
      } else {
        res.json({ results });
      }
    }
  );
});
router.delete("/:id", (req, res) => {
  const sql = `DELETE FROM dishes WHERE id="${req.params.id}";`;
  connector.query(sql, (err, results, fields) => {
    if (err) {
      res.json(err);
    } else {
      res.json({ results });
    }
  });
});
router.delete("/", (req, res) => {
  const sql = "DELETE FROM dishes";
  connector.query(sql, (err, results, fields) => {
    if (err) {
      res.json(err);
    } else {
      res.json({ results });
    }
  });
});
module.exports = router;
