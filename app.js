const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('./db/mongoose');

const { List } = require('./db/models/lists');
const { Task } = require('./db/models/task');

// cors header middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());

app.get('/ink', (req, res) => {
  res.send("<h2>The Ink is dry.</h2>");
});

/**
 * returns array of lists
 */
app.get('/lists', (req, res) => {
  // return array of lists from database
  List.find({}).then((lists) => {
    res.send(lists);
  });
});

/**
 * create and return new list
 */
app.post('/lists', (req, res) => {
  // create a new list and return new list to user with id
  let title = req.body.title;
  let newList = new List({
    title: title
  });
  newList.save().then((savedList) => {
    res.send(savedList).status(200);
  });
});

/**
 * update a specific list
 */
app.patch('/lists/:id', (req, res) => {
  // update list
  List.findOneAndUpdate(
    { 
      _id: req.params.id 
    },{
      $set: req.body
    }).then( () => {
      res.sendStatus(200);
      console.log("List is updated");
    }).catch( err => {
      console.log("-- List update error --");
      console.log(err);
    });
});

/**
 * deletes a specific list
 */
app.delete('/lists/:id', (req, res) => {
  // delete a list
  List.findOneAndDelete({
    _id: req.params.id
  }).then( (removedTist) => {
    console.log("List is deleted");
    res.status(200).send(removedTist);
  }).catch( err => {
    console.log("-- List Delete Error --");
    console.log(err);
  });
});

/**
 * returns tasks of list id
 */
app.get('/lists/:listId/tasks', (req, res) => {
  //
  Task.find({
    _listId: req.params.listId
  }).then( (tasks) => {
    console.log("retrieved tasks");
    res.status(200).send(tasks);
  }).catch( err => {
    console.log(err);
    res.status(500);
  });
});

/**
 * creates a task and returns it
 */
app.post('/lists/:listId/tasks', (req, res) => {
  // create new task under the listId
  let task = req.body.task;
  let newTask = new Task({
    title: task,
    _listId: req.params.listId
  });
  newTask.save().then( (savedTask) => {
    console.log("new task added");
    res.send(savedTask).status(200);
  }).catch( err => {
    console.log(err);
    res.send(err).status(400);
  });
});

/**
 * updates a task info and returns status
 */
app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
  //
  Task.findOneAndUpdate({
    _id: req.params.taskId,
    _listId: req.params.listId
  }, {
    $set: req.body
  }).then( () => {
    console.log("Task is updated");
    res.sendStatus(200);
  }).catch( err => {
    console.log("-- Task update error --");
    console.log(err);
    res.sendStatus(500);
  });
});

/**
 * deletes a task
 */
app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
  //
  Task.findOneAndDelete({
    _id: req.params.taskId,
    _listId: req.params.listId
  }).then( removedTask => {
    console.log("Task is deleted");
    res.send(removedTask).status(200);
  }).catch( err => {
    console.log("-- Task Delete Error --");
    console.error(err);
    res.sendStatus(500);
  });
});



app.listen(3000, ()=> {
  console.log("-- Server is running on port 3000 --")
});