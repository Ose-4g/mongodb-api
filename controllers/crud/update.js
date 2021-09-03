const AppError = require("../../error/appError");
const {connectToMongo} = require('../../utils/connectToMongo')
const  ObjectId= require('mongodb').ObjectId


exports.findManyAndUpdate = async (req,res,next)=>{
    const db = await connectToMongo()

    const collection = req.params.collection

    if(!collection)
    {
        return next(new AppError("Collection name is required",400))
    }

    let {filter,update} = req.body

    filter = filter ? filter : {}

    if(!update || !Object.keys(update))
    {
        return next(new AppError("Update object cannot be empty"))
    }

    const data = await db.collection(collection).updateMany(filter,update)

    return res.status(200).json({
        status:"success",
        data
    }) 
}





exports.findOneAndUpdate = async(req,res,next)=>{
    const db = await connectToMongo()

    const collection = req.params.collection

    if(!collection)
    {
        return next(new AppError("Collection name is required",400))
    }

    let {filter,update} = req.body

    if (filter && filter._id)
    {
        const oid = new ObjectId(filter._id)
        delete filter._id
        filter = {_id: oid, ... filter}
        console.log(filter)
    }

    filter = filter ? filter : {}
    
    if(!update || !Object.keys(update))
    {
        return next(new AppError("Update object cannot be empty"))
    }

    const data = await db.collection(collection).updateOne(filter,update)

    return res.status(200).json({
        status:"success",
        data
    })
}






exports.findByIdAndUpdate = async(req,res,next)=>{
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

    let {update} = req.body

    if(!update || !Object.keys(update))
    {
        return next(new AppError("Update object cannot be empty"))
    }


    const data = await db.collection(collection).updateOne({_id:ObjectId(id)},update)

    return res.status(200).json({
        status:"success",
        data
    }) 

}