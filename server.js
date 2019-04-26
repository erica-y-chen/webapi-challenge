const express = require('express')
const server = express ();
const projectRouter = require('./projects-router')
const actionRouter = require ('./actions-router')


server.use(express.json());
server.use('/api/projects/', projectRouter);
server.use('/api/actions/', actionRouter)

server.get('/', (req, res) => {
    res.send("It's alive!")
})

module.exports = server 