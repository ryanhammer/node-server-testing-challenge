const express = require('express');

const Students = require('./students-model');

const router = express.Router();

router.get("/students", (req, res) => {
  res.end();
  // Students.getAll()
  //   .then(students => {
  //     res.status(200).json(students);
  //   })
  //   .catch(error => {
  //     res.status(500).json(error);
  //   });
});

router.get("/students/id", (req, res) => {
  res.end();
});

router.post("/students", (req, res) => {
  res.end();
});

router.delete("/students/:id", (req, res) => {
  res.end();
});

router.put("/students/:id", (req, res) => {
  res.end();
});

router.use( (err, req, res ) => {
  res.status(err.status || 500).json({
    note: "Something went wrong in the students router",
    message: err.message,
    stack: err.stack
  });
});

module.exports = router;