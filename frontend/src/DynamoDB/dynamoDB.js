const AWS = require("@aws-sdk");

AWS.config.update({
  region: "us-east-1",
  endpoint: "http://100.115.92.205:8001",
});

const dynamoDB = new AWS.DynamoDB();

module.exports = dynamoDB;
