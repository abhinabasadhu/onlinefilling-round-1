import { MongoClient } from "mongodb";
import express from "express";
import bodyParser = require("body-parser");
import router from "../src/routes";

const app = express();

app.use(bodyParser.json());
app.use(router);

async function main(Promise:any){

     const uri = "mongodb+srv://abhinaba:NasusSadhu342@cluster0.56yem.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
            console.log("Server listening on port 3000");
        });
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main(Promise).catch(console.error);
