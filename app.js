const express = require('express');
const app = express();


app.get('/ink', (req, res) => {
  res.send("<h2>The Ink is dry.</h2>");
});

/**
 * returns array of lists
 */
app.get('/lists', (req, res) => {
  // return array of lists from database
});

/**
 * create and return new list
 */
app.post('/lists', (req, res) => {
  // create a new list and return new list to user with id
});

/**
 * update a specific list
 */
app.patch('/lists/:id', (req, res) => {
  // update list
});

/**
 * deletes a specific list
 */
app.delete('/lists/:id', (req, res) => {
  // delete a list
});


app.listen(3000, ()=> {
  console.log("-- Server is running on port 3000 --")
})