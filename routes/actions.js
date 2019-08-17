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


// POST ACTION
router.post("/:id", validateProjectId, (req, res) => {
  const { id }  = req.params
  const { description, notes } = req.body

  if(!notes || !description) {
    res.status(400).json({
      message: "Please provide notes and description!"
    })
    return
  }

  if(!req.project) {
    res.status(400).json({
      message: "Invalid project ID!"
    })
    return
  }

  Actions.insert({description, notes, project_id: id})
  .then(action => {
      res.status(201).json(action)
  })
   .catch(() => {
     res.status(500).json({
       error: 'Internal server error'
     })
   })
})



// CUSTOM MIDDLEWARE

// VALIDATE PROJECT ID
function validateProjectId(req, res, next) {
  
  Projects.get(req.params.id)

  .then(project => {
    if(project) {
      req.project = project // we are storing project on req object
      next()
    } else {
      res.status(400).json({
        message: "invalid project id" 
      })
    }
  })
  .catch(() => {
    res.status(500).json({
      error: 'Internal server error'
    })
  })
};

module.exports = router