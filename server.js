const express =  require('express')
const projects = require('./routes/projects')

const server = express()
server.use(express.json())


server.use("/projects", projects)


module.exports = server