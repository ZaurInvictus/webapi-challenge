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
router.post("/", validateProjectId, (req, res) => {
  const { description, notes, project_id } = req.body

  if(!notes || !description || !project_id) {
    res.status(400).json({
      message: "Data must include notes project_id, and description fields!"
    })
    return
  }

  Actions.insert({ description, notes, project_id })
  .then(action => {
      res.status(201).json(action)
  })
   .catch(() => {
     res.status(500).json({
       error: 'Internal server error'
     })
   })
})



// DELETE ACTION
router.delete("/:id", (req, res) => {
  Actions.remove(req.params.id)
  
  // remove - returns number of deleted items or 0 if 0 deleted
  .then(number => {
    if(number && number > 0) {
      res.status(200).json({
        message: 'Action was deleted'
      })
    } else {
      res.status(404).json({
        message: "The action with the specified ID doesn't exist"
      })
    }
  })
   .catch(() => {
     res.status(500).json({error: "Internal server error"})
   })
})



// UPDATE ACTIONS
router.put('/:id', (req, res) => {
  const { notes, description } = req.body
  //WITH NO DESTRUCTURING
  //const notes = req.body.name
  //const description = req.body.description
  if(!notes || !description) {
    res.status(400).json({ message: 'Please provide notes and description'})
  } else {
    Actions.update(req.params.id, req.body)
    //PASSING DATA WITH NO DESTRUCTURING VERSION
    //Projects.update(req.params.id, {notes, description})
    .then(user => {
      if(user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({message: "The action with the specified ID does not exist"})
      }
    })
    .catch(() => {
      res.status(500).json({message: 'Internal server error'})
    })
  }
})



// CUSTOM MIDDLEWARE

// VALIDATE PROJECT ID
function validateProjectId(req, res, next) {
  const id = req.body.project_id

  Projects.get(id)

  .then(project => {
    if(project) {
      req.project = project // we are storing project on req object
      next()
    } else {
      res.status(400).json({
        message: 'Project ID not found'
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