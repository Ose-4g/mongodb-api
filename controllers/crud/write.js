const AppError = require("../../error/appError");
const {connectToMongo} = require('../../utils/connectToMongo')


exports.insertOne = async(req,res,next)=>{

    const db = await connectToMongo()

    const collection = req.params.collection
    const data = req.body

    if(!collection)
    {
        return next(new AppError("Collection name is required",400))
    }

    if(typeof(data)!=="object" || Array.isArray(data))
    {
        return next(new AppError("data should be an object",400))
    }

    const doc = await db.collection(collection).insertOne(data)

    return res.status(200).json(doc)
}



exports.insertMany = async(req,res,next)=>{
    const db = await connectToMongo()

    const collection = req.params.collection
    const data = req.body

    if(!collection)
    {
        return next(new AppError("Collection name is required",400))
    }

    //an array is expected. If its not an array then return an error.
    if(!Array.isArray(data))
    {
        return next(new AppError("Array is expected. Array not found",400))
    }


    const options = { ordered: true }

    const docs = await db.collection(collection).insertMany(data,options)

    return res.status(200).json(docs)
}