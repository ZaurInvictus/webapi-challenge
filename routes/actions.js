const express = require('express')
const router = express.Router()

const Actions = require('../data/helpers/actionModel')
const Projects = require('../data/helpers/projectModel')


// GET ALL ACTIONS
router.get('/', (req, res) => {
  Actions.get(req.params.id)
  .then(actions => {
    res.status(200).json(actions)
  })
  .catch(error => {
    res.status(500).json({
      error: 'Internal server error'
    })
  })
})


module.exports = router