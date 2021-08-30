const AppError = require("../../error/appError");
const {connectToMongo} = require('../../utils/connectToMongo')





exports.getAllCollections = async(req,res,next)=>{
    const db = await connectToMongo()
    const collections = await db.listCollections().toArray()
    return res.status(200).json({collections})
}   


exports.find = async(req,res,next)=>{
    const db = await connectToMongo()

    const collection = req.params.collection
   
    if(!collection)
    {
        return next(new AppError("Collection name is required"))
    }


    const docs = await db.collection(collection).find({}).toArray()


    return res.status(200).json({docs})
}