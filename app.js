const express = require("express");
const app = express();
const fs = require("fs");
const data = require("./player_data.json");
const cors = require("cors");

app.use(express.json());
app.use(cors());
//this will display the data in the json format
app.get("/api", function (req, res) {
  res.json(data);
});
//this grabs the array and turns it into js so we can manipulate it
function array() {
  const parse = fs.readFileSync("player_data.json");
  return JSON.parse(parse.toString());
}
//function to create a new obj, takes in all the necessary properties as parameters
function addItem(id, name, points, wins, loses) {
  let arr = array();
  arr.push({ id, name, points, wins, loses });
  fs.writeFileSync("player_data.json", JSON.stringify(arr, null, 2));
}
//app.post allows for the creating of the new obj and adds it to the json file
app.post("/post", (req, res) => {
  //takes in all the information via the body
  const id = req.body.id;
  const name = req.body.name;
  const points = req.body.points;
  const wins = req.body.wins;
  const loses = req.body.loses;
  const arr = array();
  //error handling, if the id is already in existence then that means the item is already there
  if (arr.indexOf(id) > -1) {
    res.send("This item already exists");
  } else {
    //if id is not found, then the function to add a new obj is run
    addItem(id, name, points, wins, loses);
    res.send("This item has been added to the list");
  }
});

//function to remove an item from array
function rem(id) {
  const arr = array();
  const i = arr.indexOf(id);
  arr.splice(i, 1);
  fs.writeFileSync("player_data.json", JSON.stringify(arr, null, 2));
}
//app.delete is created to delete an item from the web list
app.delete("/delete/:id", (req, res) => {
  //it is accessed not as a string but params, and is converted to a number
  const id = Number(req.params.id);
  const arr = array();
  const index = arr.findIndex((item) => item.id === id);
  //if item is found it is deleted with the previously created function
  if (index !== -1) {
    rem(id);
    res.send("Item has been deleted");
  } else {
    res.send("This item does not exist");
  }
});

//put which is used to update either the name or points
app.put("/put", (req, res) => {
  //the changes are done via accessing the body
  const name = req.body.name;
  const newPoints = req.body.newPoints;
  const arr = array();
  const i = arr.findIndex((item) => item.name === name);
  //if index of current name is found, then it is replaced with the updated one
  if (i > -1) {
    //access the title property directly
    arr[i].points = newPoints;
    fs.writeFileSync("player_data.json", JSON.stringify(arr, null, 2));
    res.send("Player updated");
  }
});

app.listen(5000, function () {
  "running on port 5000";
});
