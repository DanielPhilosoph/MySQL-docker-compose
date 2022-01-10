const express = require("express");
const router = express.Router();
const con = require("../index");

//? --Checked--
router.get("/:classID", (req, res) => {
  if (req.params.classID) {
    const sql = `SELECT * FROM Teachers WHERE t_id = ${req.params.classID}`;
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
router.put("/update/class/:classID", (req, res) => {
  if (req.body) {
    if (req.params.classID && req.body.class_name) {
      const sql = `UPDATE Classes SET class_name = "${req.body.class_name}" WHERE c_id = ${req.params.classID}`;
      con.con.query(sql, function (err, result) {
        if (err) {
          res.status(404).send(err);
        } else {
          // Worked
          res.send("Updated class");
        }
      });
    } else {
      res
        .status(404)
        .send("Missing query param classID / body param class_name");
    }
  } else {
    res.status(404).send("Missing body or some properties of body");
  }
});

module.exports = router;
