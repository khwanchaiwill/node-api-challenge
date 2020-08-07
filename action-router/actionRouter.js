const express = require('express');

const router = express.Router();

const ProjectsDB = require('../data/helpers/projectModel');
const ActionsDB = require('../data/helpers/actionModel');


router.get('/', (req, res) => {
  // do your magic!

  ActionsDB.get()
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500)
      .json({
        message: "Error while you are in process can not get data"
      })
    })

});

router.get('/:id', validateActionId, (req, res) => {
  // do your magic!
  ActionsDB.get(req.act.id)
  .then(actId => {
    res.status(200).json(actId)
  })
  .catch(err => {
    console.log(err)
    res.status(500)
    .json({
      message: "Error while you are in process can not get data"
    })
  })
});

router.post('/', validateProjectsId, ( req, res) => {
   
    const id = req.params.id; 
      console.log(req.params.id)
      const actions = req.body;
      actions.project_id = Number(id);
  ActionsDB.insert(actions)
      .then(act => {
        res.status(201).json(act)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({message: "Error while you are in process can not save data"})
      })
   
  });

router.delete('/:id', validateActionId, (req, res) => {
  // do your magic!
  ActionsDB.remove(req.act.id)
  .then(move => {
    if(move > 0){
      res.status(200).json({
        message: " action successful deleted"
      })
    }else{
      res.status(404)
      .json({
        message: "Can not found user"
      })
    }
   
  })
  .catch(err =>{
     res.status(500)
     .json({
    message: " Error while processing to remove the user"
  }, err)
  })
 

});

router.put('/:id', validateActionId, (req, res) => {
  // do your magic!
  const newUpdate = req.body;
  ActionsDB.update(req.act.id, newUpdate)
      .then(actionUpdate => {
          res.status(200).json(actionUpdate)
      })
      .catch(err => {
          res.status(500).json({ error: "The post information could not be modified." }, err)
      })
});

// custom middleware

function validateActionId(req, res, next) {
  // do your magic!
  ActionsDB.get(req.params.id)
  .then(act => {
    if(act){
      req.act = act;
      next();
    }else if (!pro){
      res.status(400).json({ message: "invalid user id" })
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message: "Err while get Id"
    })
  })
}

function validateProjectsId(req, res, next) {
  
    ProjectsDB.get(req.params.id)
      .then(pro => {
        if(pro){
          req.pro = pro;
          next();
        }else if (!pro){
          res.status(400).json({ message: "invalid user id" })
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message: "Err while get Id"
        })
      })
  }
  
module.exports = router;
