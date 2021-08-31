const AppError = require("../../error/appError");
const {connectToMongo} = require('../../utils/connectToMongo')
const  ObjectId= require('mongodb').ObjectId

exports.deleteOne = async(req,res,next)=>{
    const db = await connectToMongo()

    const collection = req.params.collection

    let {filter} = req.body

    filter = filter ? filter : {}


    if(!collection)
    {
        return next(new AppError("Collection name is required",400))
    }

    const data = await db.collection(collection).deleteOne(filter)

    return res.status(200).json({
        status:"success",
        data
    }) 

}

exports.findByIdAndDelete = async(req,res,next)=>{
    const db = await connectToMongo()

    const collection = req.params.collection
    const id = req.params.id

    if(!collection)
    {
        return next(new AppError("Collection name is required",400))
    }

    if(!id)
    {
        return next(new AppError("object id is required",400))
    }

    const data = await db.collection(collection).deleteOne({_id:ObjectId(id)})

    return res.status(200).json({
        status:"success",
        data
    }) 
}

exports.deleteMany = async(req,res,next)=>{
    const db = await connectToMongo()

    const collection = req.params.collection

    let {filter} = req.body

    filter = filter ? filter : {}


    if(!collection)
    {
        return next(new AppError("Collection name is required",400))
    }

    const data = await db.collection(collection).deleteMany(filter)

    return res.status(200).json({
        status:"success",
        data
    }) 
}