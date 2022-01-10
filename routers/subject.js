const express = require("express");
const router = express.Router();
const con = require("../index");

//? --Checked--
router.get("/:subjectID", (req, res) => {
  if (req.params.subjectID) {
    const sql = `SELECT * FROM Teachers WHERE t_id = ${req.params.subjectID}`;
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

module.exports = router;
