const {MongoClient} = require('mongodb')

const MONGO_URL = process.env.MONGO_URL

const client = new MongoClient(MONGO_URL);

module.exports = async()=>{
    try 
    {
        // Connect the client to the server
        await client.connect();

        // Establish and verify connection
        await client.db("admin").command({ ping: 1 });
        console.log("Connected successfully to server");
    }

    catch(err)
    {
        console.log(err)
    }
      
    finally 
    {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}