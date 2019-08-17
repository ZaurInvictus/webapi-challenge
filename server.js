const express =  require('express')
const projects = require('./routes/projects')
const actions =  require('./routes/actions')

const server = express()
server.use(express.json())

server.use("/projects", projects)
server.use("/actions", actions)




module.exports = server