const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://localhost:27017/todoApi");

const todoSchema = new Schema({
  id: Number,
  title: String,
  order: Number,
  completed: Boolean
});

const todos = mongoose.model('todos', todoSchema);

router.get('/api/todos/', function(req, res){
  todos.find({}).then(function(allTodos){
    if(allTodos) {
      res.setHeader('Content-Type', 'application/json');
        res.status(200).json(allTodos);
    } else {
      res.send("No todos found")
    }
  }).catch(function(err) {
      res.status(400).send("Bad request. Please try again.");
    });
});

router.post('/api/todos/', function(req, res){
  let todo = new todos({
    id: req.body.id,
    title: req.body.title,
    order: req.body.order,
    completed: req.body.completed
  });
  todos.create(todo).then(function(newTodo){
    if (newTodo) {
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json(newTodo);
      } else {
        res.status(403).send("No Todo found...");
      }
  }).catch(function(err) {
      res.status(400).send("Bad request. Please try again.");
    })
});

router.get('/api/todos/:id', function(req, res){
  todos.findOne({id: req.params.id}).then(function(todos){
    if (todos) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(todos);
      } else {
        res.status(404).send("Todo not found.")
      }
  }).catch(function(err) {
      res.status(400).send("Bad request. Please try again.");
    });
});

router.put('/api/todos/:id', function(req, res){
  todos.updateOne({
    id: req.params.id
  },

  {

    title: req.body.title,
    order: req.body.order,
    completed: req.body.completed
  }).then(function(todo){
    if(todo){
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(todo);
    } else {
      res.status(403).send("No Todo found...");
    }
  }).catch(function(err) {
    res.status(400).send("Bad request. Please try again.");
  });
});

router.patch('/api/todos/:id', function(req, res){
  todos.updateOne({
    id: req.params.id
  },

  {

    title: req.body.title,
    order: req.body.order,
    completed: req.body.completed
  }).then(function(todo){
    if(todo){
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(todo);
    } else {
      res.status(403).send("No Todo found...");
    }
  }).catch(function(err) {
    res.status(400).send("Bad request. Please try again.");
  });
});

router.delete('/api/todos/:id', function(req, res){
  todos.deleteOne({
    id: req.params.id
  }).then(function(todo){
    if(todo){
      res.status(200).send("Successfully removed todo.");
    } else {
      res.status(404).send("Todo not found.");
    }
  }).catch(function(err) {
    res.status(400).send("Bad request. Please try again.");
  })
});



module.exports = router;
