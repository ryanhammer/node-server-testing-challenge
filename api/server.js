const express = require("express");

const server = express();

server.use(express.json());

const studentsRouter = require("./students/students-router.js");

server.use('/api/students', studentsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Express Backend Week Three - Don't Jest Me Bro</h2>`);
});

module.exports = server;