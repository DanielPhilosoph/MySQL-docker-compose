const express = require("express");
const router = express.Router();
const con = require("../index");

//? --Checked--
router.get("/:pupilID", (req, res) => {
  if (req.params.pupilID) {
    const sql = `SELECT * FROM Teachers WHERE t_id = ${req.params.pupilID}`;
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
router.post("/new/pupil", (req, res) => {
  if (
    req.body &&
    req.body.pupilID &&
    req.body.first_name &&
    req.body.last_name &&
    req.body.teacherID &&
    req.body.classID
  ) {
    const sql = `INSERT INTO Pupils (p_id, first_name, last_name, t_id, c_id) VALUES (${req.body.pupilID},"${req.body.first_name}","${req.body.last_name}","${req.body.teacherID}","${req.body.classID}")`;
    con.con.query(sql, function (err, result) {
      if (err) {
        res.status(404).send(err);
      } else {
        // Worked
        res.send("Added student " + result.insertId);
      }
    });
  } else {
    res.status(404).send("Missing body or some properties of body");
  }
});

//? --Checked--
router.put("/update/pupil/:pupilID", (req, res) => {
  if (req.body) {
    if (req.params.pupilID) {
      const first_name = req.body.first_name
        ? `first_name = "${req.body.first_name}",`
        : "";
      const last_name = req.body.last_name
        ? `last_name = "${req.body.last_name}",`
        : "";
      const t_id = req.body.teacherID ? `t_id = ${req.body.teacherID},` : "";
      const c_id = req.body.classID ? `c_id = ${req.body.classID},` : "";
      let updateStatement = `${first_name} ${last_name} ${t_id} ${c_id}`;
      // Slice the last ","
      for (let i = updateStatement.length; 0 < i; i--) {
        if (updateStatement[i] === ",") {
          updateStatement = updateStatement.slice(0, i);
          break;
        }
      }
      const sql = `UPDATE Pupils SET ${updateStatement} WHERE p_id = ${req.params.pupilID}`;
      con.con.query(sql, function (err, result) {
        if (err) {
          res.status(404).send(err);
        } else {
          // Worked
          res.send("Updated pupil");
        }
      });
    } else {
      res.status(404).send("Missing query param pupilID");
    }
  } else {
    res.status(404).send("Missing body or some properties of body");
  }
});

//? --Checked--
router.delete("/remove/pupil/:pupilID", (req, res) => {
  if (req.params.pupilID) {
    const sql = `DELETE FROM Pupils WHERE p_id = ${req.params.pupilID}`;
    con.con.query(sql, function (err, result) {
      if (err) {
        res.status(404).send(err);
      } else {
        // Worked
        res.send("Deleted pupil");
      }
    });
  } else {
    res.status(404).send("Missing query param pupilID");
  }
});

module.exports = router;
