const app = require('./app')
const http = require('http')
const {connectToMongo} = require('./utils/connectToMongo')



const PORT = process.env.PORT || 8080;

const server = http.createServer(app);


const startServer = async()=>{
    await connectToMongo()
    //console.log(db)
    //console.log(exports.db)
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