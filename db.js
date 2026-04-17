const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/secondchance";
const client = new MongoClient(uri);

async function connectToDatabase() {
  await client.connect();
  return client.db();
}

module.exports = connectToDatabase;