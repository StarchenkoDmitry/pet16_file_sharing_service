import { MongoClient } from "mongodb";
import { NAME_DB, MONGODB_URL } from '../../config/Config.js';


const client = new MongoClient(MONGODB_URL);

let conn = await client.connect();
let db = conn.db(NAME_DB);

export default db;

