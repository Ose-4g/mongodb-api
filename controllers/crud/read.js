const AppError = require("../../error/appError");
const {connectToMongo} = require('../../utils/connectToMongo')





exports.getAllCollections = async(req,res,next)=>{
    const db = await connectToMongo()
    const collections = await db.listCollections()
    return res.status(200).send(collections)
}   


exports.find = async(req,res,next)=>{
    const db = await connectToMongo()

    const collection = req.params.collection


    const docs = await db.collection(collection).find({}).toArray()


    return res.status(200).json({docs})
}