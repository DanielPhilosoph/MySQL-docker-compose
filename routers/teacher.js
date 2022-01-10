const express = require("express");
const router = express.Router();
const con = require("../index");

//? --Checked--
router.get("/:teacherID", (req, res) => {
  if (req.params.teacherID) {
    const sql = `SELECT * FROM Teachers WHERE t_id = ${req.params.teacherID}`;
    con.con.query(sql, function (err, result) {
      if (err) {
        res.status(404).send(err);
      } else {
        // Worked
        res.json(result);
      }
    });
  } else {
    res.status(404).send("Missing query param");
  }
});

//? --Checked--
router.post("/new/teacher", (req, res) => {
  if (req.body && req.body.first_name && req.body.last_name && req.body.t_id) {
    const sql = `INSERT INTO Teachers (t_id, first_name, last_name) VALUES (${req.body.t_id},"${req.body.first_name}","${req.body.last_name}")`;
    con.con.query(sql, function (err, result) {
      if (err) {
        res.status(404).send(err);
      } else {
        // Worked
        res.send("Added teacher");
      }
    });
  } else {
    res.status(404).send("Missing body or some properties of body");
  }
});

//? --Checked--
router.delete("/remove/teacher/:teacherID", (req, res) => {
  if (req.params.teacherID) {
    const sql = `DELETE FROM Teachers WHERE t_id = ${req.params.teacherID}`;
    con.con.query(sql, function (err, result) {
      if (err) {
        res.status(404).send(err);
      } else {
        // Worked
        res.send("Deleted pupil");
      }
    });
  } else {
    res.status(404).send("Missing query param teacherID");
  }
});

module.exports = router;
