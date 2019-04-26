const express = require('express')
const router = express.Router();
const db = require('./data/helpers/projectModel.js');

router.get('/', (req, res) => {
    db.get()
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err=>{
        res.status(500).json({error: 'error retrieving project information'})
    })
})


router.get('/:id', (req, res) => {
    const projectId = req.params.id;
    db.get(projectId)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err=>{
        res.status(500).json({error: 'no project with that ID exists'})
    })
})

router.get('/:id/actions', (req, res) => {
    const projectId = req.params.id;
    db.getProjectActions(projectId)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        res.status(500).json({error: 'no project with that ID exists'})
    })
})


router.post('/', (req, res) => {
    let newProject = {
        name: req.body.name, 
        description: req.body.description, 
        completed: false, 
    }

    db.insert(newProject)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(err=>{
        res.status(404).json({error: 'error adding project'})
    })
})

router.delete('/:id', (req, res) => {
    let projectId = req.params.id;

    db.remove(projectId)
    .then(project=> {
        res.status(201).json(project)
    })
    .catch(err=>{
        res.status(404).json({error: "project with that id doesn't exist"})
    })
})


router.put('/:id', (req, res) => {
    let projectId = req.params.id;
    let changes = {
        name: req.body.name,
        description: req.body.description,
        completed: req.body.completed,
    }

    db.update(projectId, changes)
        .then(project=> {
            res.status(200).json(project);
        })
        .catch(err => {
            res.status(404).json({error: 'project with that id not found'})
        })
})

module.exports = router;



