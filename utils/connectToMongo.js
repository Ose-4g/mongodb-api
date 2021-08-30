const {MongoClient} = require('mongodb')

const MONGO_URL = process.env.MONGO_URL

const client = new MongoClient(MONGO_URL, {

    useNewUrlParser: true,
    
    useUnifiedTopology: true
    
    });

let connected = false
let db


const connectToMongo = async()=>{
    try
    {
        if(!connected)
        {
            // Connect the client to the server
            await client.connect();

            // Establish and verify connection
            db = await client.db('mongo-api')
            connected = true
            console.log("Connected successfully to server");
        }
        
        return db
    }

    catch(err)
    {
        console.log(err)
    }
}

module.exports = {
    connectToMongo
}
