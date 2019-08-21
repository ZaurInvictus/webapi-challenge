const express = require('express')
const router = express.Router()

const Projects = require('../data/helpers/projectModel')


// GET ALL PROJECTS
router.get('/', (req, res) => {
  Projects.get(req.params.id)
  .then(allProjects => {
    res.status(200).json(allProjects)
  })
  .catch(error => {
    res.status(500).json({
      error: 'Internal server error'
    })
  })
})


// GET PROJECT BY ID
router.get('/:id', (req, res) => {
  Projects.get(req.params.id)

  .then(project => {
    if(project) {
      res.status(200).json(project)
    } else {
      res.status(404).json({message: 'The project with specified ID does not exist'})
    }
  })
  .catch(() => {
    res.status(500).json({
      error: 'Internal server error'
    })
  })
})


// GET PROJECT ACTIONS
router.get('/:id/actions', (req, res) => {
  const { id } = req.params

  Projects.getProjectActions(id)
  .then(actions => {
    if(actions.length > 0) {
      res.status(200).json(actions)
    } else {
      res.status(404).json({
        message: 'The project with specified ID does not have actions'
      })
    }
  })
  .catch(() => {
    res.status(500),json({ error: 'Internal server error'})
  })
})



// POST PROJECT
router.post("/", (req, res) => {
  const { name, description } = req.body

  if(!name || !description) {
    res.status(400).json({
      message: "Please provide name and description!"
    })
    return
  }

  Projects.insert(req.body)
  .then(newProject => {
    res.status(201).json(newProject)
  })
   .catch(() => {
     res.status(500).json({
       error: 'Internal server error'
     })
   })
})



// DELETE PROJECT
router.delete("/:id", (req, res) => {
   Projects.remove(req.params.id)
   
   // remove - returns number of deleted items or 0 if 0 deleted
   .then(number => {
     if(number && number > 0) {
       res.status(200).json({
         message: 'Project was deleted'
       })
     } else {
       res.status(404).json({
         message: "The project with the specified ID doesn't exist"
       })
     }
   })
    .catch(() => {
      res.status(500).json({error: "Internal server error"})
    })
})



// UPDATE PROJECT
router.put('/:id', (req, res) => {
  const { name, description } = req.body
  //WITH NO DESTRUCTURING
  //const name = req.body.name
  //const description = req.body.description
  if(!name || !description) {
    res.status(400).json({ message: 'Please provide name and description'})
  } else {
    Projects.update(req.params.id, req.body)
    //PASSING DATA WITH NO DESTRUCTURING VERSION
    //Projects.update(req.params.id, {name, description})
    .then(user => {
      if(user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({message: "The project with the specified ID does not exist"})
      }
    })
    .catch(() => {
      res.status(500).json({message: 'Internal server error'})
    })
  }
})




module.exports = router