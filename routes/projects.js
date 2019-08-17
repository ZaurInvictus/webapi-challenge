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


module.exports = router