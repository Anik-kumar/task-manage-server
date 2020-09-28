const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TaskManager", {useNewUrlParser: true})
  .then(() => {
    console.log("-- Connected to Database --"); 
  })
  .catch((error) => {
    console.log("-- Error connecting Database --", error);
    console.log(error);
  });