const dynamoDB = require("./dynamoDB");

//Puts data into table
const putItem = async (params) => {
  try {
    await dynamoDB.putItem(params).promise();
    console.log("Item added successfully.");
  } catch (error) {
    console.error("Error adding item:", error);
  }
};

//scans the table and retrieves data from the DB
const scanTable = async (params) => {
  try {
    const data = await dynamoDB.scan(params).promise();
    console.log("Scan succeeded.");
    return data.Items;
  } catch (error) {
    console.error("Error scanning table:", error);
    return [];
  }
};

module.exports = {
  putItem,
  scanTable,
};
