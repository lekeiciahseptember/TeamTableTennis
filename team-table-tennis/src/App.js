import React from "react";
import Table from "react-bootstrap/Table";
import "./App.css";

export default function App() {
  return (
    <div className="App" id="main">
      <h1>Table Tennis Rankings</h1>
      <div>
        <div className="table">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}

function Leaderboard() {
  return (
    <Table striped="columns" border="5px" align="center" hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Winner Name</th>
          <th>Score</th>
          <th>Wins</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Liam</td>
          <td>11</td>
          <td>1</td>
        </tr>
      </tbody>
    </Table>
  );
}
