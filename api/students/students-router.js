const express = require('express');

const Students = require('./students-model');

const router = express.Router();

router.get("/", (req, res, next) => {
  Students.getAll()
    .then(students => {
      res.status(200).json(students);
    })
    .catch(error => {
      next(error);
    });
});

router.get("/:id", (req, res) => {
  res.end();
});

router.post("/", (req, res) => {
  res.end();
});

router.delete("/:id", (req, res) => {
  res.end();
});

router.put("/:id", (req, res) => {
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