import React from "react";
import Table from "react-bootstrap/Table";
import "./App.css";
import * as AWS from "aws-sdk";

AWS.config.update({
  endpoint: "http://localhost:8000",
});

this.dynamodb = new AWS.DynamoDB();
this.docClient = new AWS.DynamoDB.DocumentClient();

onRead = () => {
  let that = this;
  let params = {
    TableName: "leaderboard-data",
  };

  this.docClient.scan(params, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      that.setState({
        gridData: data,
      });
    }
  });
};
<Grid data={this.state.gridData}>
  <GridColumn title="Name" field="name" />
  <GridColumn title="Score" field="score" />
</Grid>;

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
          <th>Name</th>
          <th>Score</th>
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
