const AWS = require("@aws-sdk");

AWS.config.update({
  region: "us-east-1",
  endpoint: "http://localhost:8000",
});

const dynamoDB = new AWS.DynamoDB();

module.exports = dynamoDB;
