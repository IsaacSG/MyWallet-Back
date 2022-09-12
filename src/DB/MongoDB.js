import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let db = null;
const mongo_url = process.env.MONGO_URL;

const mongoClient = new MongoClient(mongo_url);

try {
    await mongoClient.connect();
    db = mongoClient.db(process.env.MONGO_DB);
    console.log("Banco conectado");
}

catch(error) {
    console.log(error);
}

export default db;