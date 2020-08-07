const express = require('express');
const cors = require("cors")

const projectRouter = require('./project-router/projectRouter');
const actionRouter = require('./action-router/actionRouter');

const server = express();

server.use(express.json());
server.use(cors());

server.use(logger)

server.use("/api/project", projectRouter)
server.use("/api/actions", actionRouter)

server.get('/', (req, res) => {
    res.send(`<h1>Wellcome to our page</h1>`)
})



function logger (req, res, next){
    console.log(`${req.method} request the ${req.url}`, new Date())
  next();
}

module.exports = server;