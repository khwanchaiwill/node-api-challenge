const express = require("express");

const router = express.Router();

const ProjectsDB = require('../data/helpers/projectModel');
const actionDB = require('../data/helpers/actionModel');


router.post('/', validateProjects, ( req, res) => {
   
    const body = req.body;
    ProjectsDB.insert(body)
      .then(proj => {
        res.status(201).json(proj)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({message: "Error while you are in process can not save data"})
      })
  });
  
  router.post('/:id/actions', validateProjectsId, validateAction, (req, res) => {

    const id = req.params.id; 
    console.log(req.params.id)
    const actions = req.body;
    actions.project_id = Number(id);
  actionDB.insert(actions)
    .then(postAct => {
      res.status(201).json(postAct)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "Error while you are in process can not save data"})
    })
   
  
  });
  
  router.get('/', (req, res) => {
   
    
    ProjectsDB.get()
      .then(project => {
        res.status(200).json(project)
      })
      .catch(err => {
        console.log(err)
        res.status(500)
        .json({
          message: "Error while you are in process can not get data"
        })
      })
  });
  
  router.get('/:id', validateProjectsId, (req, res) => {
   
    ProjectsDB.get(req.pro.id)
      .then(proId => {
        res.status(200).json(proId)
      })
      .catch(err => {
        console.log(err)
        res.status(500)
        .json({
          message: "Error while you are in process can not get data"
        })
      })
  });
  
  router.get('/:id/actions', validateProjectsId, (req, res) => {
  
    ProjectsDB.getProjectActions(req.pro.id)
      .then(proData => {
        res.status(200).json(proData)
      })
      .catch(err => {
        console.log(err)
        res.status(500)
        .json({
          message: "Error while you are in process can not get user's post"
        })
      })
  });
  
  router.delete('/:id',validateProjectsId, (req, res) => {
 
    ProjectsDB.remove(req.pro.id)
      .then(move => {
        if(move > 0){
          res.status(200).json({
            message: "project successful deleted"
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
        message: " Error while processing to remove the project"
      },err)
      })
     
  
  });
  
  router.put('/:id', validateProjectsId, (req, res) => {
  
    const newUpdate = req.body;
    ProjectsDB.update(req.pro.id, newUpdate)
        .then(pro => {
            res.status(200).json(pro)
        })
        .catch(err => {
            res.status(500).json({ error: "The project information could not be modified." }, err)
        })
  });

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
  
  function validateProjects (req, res, next) {
 
    const query = req.query;
    if (query) {
      next();
    } else if (!query.name) {
      res.status(400).json({ message: "missing required name field" });
    } else {
      res.status(400).json({ message: "missing user data" });
    }
   
  }
  
  function validateAction (req, res, next) {

  const action = req.body;
      if(action){
          next();
        }
      else if(!action.description || !action.notes) {
        res
          .status(400)
          .json({ message: "missing required text field" });
      }
        else if(!action){
          res.status(400).json({ message: "missing post data" })
        }
  
  }
  
module.exports = router;