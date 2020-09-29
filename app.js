const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('./db/mongoose');

const { List } = require('./db/models/lists');
const { Task } = require('./db/models/task');

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
  newList.save().then((list) => {
    res.send(list);
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
  }).then( (list) => {
    console.log("List is deleted");
    res.status(200).send(list);
  }).catch( err => {
    console.log("-- List Delete Error --");
    console.log(err);
  });
});


/**
 * returns tasks of list id
 */
app.get('/lists/:listId/tasks', (req, res) => {

});


app.listen(3000, ()=> {
  console.log("-- Server is running on port 3000 --")
})