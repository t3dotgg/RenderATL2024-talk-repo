import { Db, MongoClient } from "mongodb";

const mongoLocal =
  "mongodb://condescending_pasteur.orb.local:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.6";

const MG = new MongoClient(mongoLocal);

let mongo_database: Db;

export async function getMongo() {
  if (mongo_database) {
    return mongo_database;
  }
  const client = await MG.connect();

  console.log("Connected");

  return client.db("test2");
}
