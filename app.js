const express = require("express");
const app = express();
const fs = require("fs");
const data = require("./player_data.json");
const stats = require('./match_stats.json')
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

app.get("/stats", function (req, res) {
  res.json(data);
});
//this grabs the array and turns it into js so we can manipulate it
function array2() {
  const parse = fs.readFileSync("match_stats.json");
  return JSON.parse(parse.toString());
}

function addItem(id, name, points, wins, loses) {
  let arr = array();
  arr.push({ id, name, points, wins, loses });
  fs.writeFileSync("player_data.json", JSON.stringify(arr, null, 2));
}

//app.post allows for the creating of the new obj and adds it to the json file
app.post("/post", (req, res) => {
  //takes in all the information via the body
  const id = req.body.id;
  const points = req.body.points;
  const wins = req.body.wins;
  const loses = req.body.loses;
  const winPoints = req.body.winPoints;
  const lossPoints = req.body.lossPoints;
  const date = req.body.date;
  const name = [req.body.name, winPoints, lossPoints, date];
  const arr = array();
  //error handling, if the id is already in existence then that means the item is already there
  if (arr.indexOf(id) > -1) {
    res.send("This item already exists");
  } else {
    //if id is not found, then the function to add a new obj is run
    addItem(id, name , points, wins, loses);
    res.send("This item has been added to the list");
  }
});

function addMatch(winner, loser, winScore, loseScore, date) {
  let arr = array2();
  arr.push({ winner, loser, winScore, loseScore, date});
  fs.writeFileSync("match_stats.json", JSON.stringify(arr, null, 2));
}

app.post('/recordMatch', (req, res) => {
  const { winner, loser, winnerScore, loserScore, date } = req.body;
    addMatch(winner, loser, winnerScore, loserScore, date)
  res.send('Match recorded');
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
  const wName = req.body.wName;
  const lName = req.body.lName;
  const newPoints = req.body.newPoints;
  const losesOvr = req.body.newLoses;
  const winsOvr = req.body.newWins;
  const arr = array();
  const i = arr.findIndex((item) => item.name === wName);
  // const ii = arr.findIndex((item) => item.name === wName);
  const iiii = arr.findIndex((item) => item.name === lName);
  //if index of current name is found, then it is replaced with the updated one
  if (i > -1) {
    //access the point property directly
    arr[i].points = newPoints;
    arr[i].wins = winsOvr;
    fs.writeFileSync("player_data.json", JSON.stringify(arr, null, 2));
    res.send("Points updated");
  }

  if (iiii > -1) {
    //access the point property directly
    arr[iiii].loses = losesOvr;
    fs.writeFileSync("player_data.json", JSON.stringify(arr, null, 2));
    res.send("Losses updated");
  }

  // if (ii > -1) {
  //   arr[ii].wins = winsOvr;
  //   fs.writeFileSync("player_data.json", JSON.stringify(arr, null, 2));
  //   res.send("Wins updated");
  // }

});

app.listen(5000, function () {
  "running on port 5000";
});
