const express =  require('express')
const projects = require('./routes/projects')
const actions =  require('./routes/actions')
const cors = require('cors');

const server = express()
server.use(express.json())
server.use(cors());

server.use("/projects", projects)
server.use("/actions", actions)




module.exports = server