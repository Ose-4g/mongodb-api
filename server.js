const app = require('./app')
const http = require('http')
const {connectToMongo} = require('./utils/connectToMongo')
const seed = require('./seed')



const PORT = process.env.PORT || 8080;

const server = http.createServer(app);


const startServer = async()=>{
    await connectToMongo()
    await seed()
    server.listen(PORT, () => {
        console.log(`
        ################################################
        🛡️  Server listening on port: ${PORT} 🛡️
        ################################################
        SERVER IN ${process.env.NODE_ENV} MODE
        `);
    })


}

startServer()

exports.app = app