const AppError = require("../../error/appError");
const {connectToMongo} = require('../../utils/connectToMongo')
const paginateData = require('../../utils/paginateData')





exports.getAllCollections = async(req,res,next)=>{
    const db = await connectToMongo()
    const collections = await db.listCollections().toArray()
    return res.status(200).json({collections})
}   


exports.find = async(req,res,next)=>{
    const db = await connectToMongo()

    const collection = req.params.collection

    let {page,limit} = req.query
    let {sort,filter} = req.body

    filter = filter ? filter : {}
    sort = sort ? sort : {}

    page = parseInt(page) || 1
    limit = parseInt(limit) || 15

    limit = Math.max(limit,1)
    page = Math.max(page,1)

    if(!collection)
    {
        return next(new AppError("Collection name is required"))
    }

    const query = db.collection(collection)
    const response = await paginateData(query,filter,page,limit,sort)


    return res.status(200).json({
        status:"success",
        data:response
    })
}

exports.findOne = async(req,res,next)=>{
    const db = await connectToMongo()

    const collection = req.params.collection

    let {filter} = req.body

    filter = filter ? filter : {}

    if(!collection)
    {
        return next(new AppError("Collection name is required"))
    }

    const data = await db.collection(collection).findOne(filter)

    return res.status(200).json({
        status:"success",
        data
    }) 

}