const AppError = require('../../error/appError')
const {connectToMongo} = require('../../utils/connectToMongo')
const {ObjectId} = require('mongodb')


exports.middleware = (req,res,next)=>{
    const {
        plugin_id,
        organization_id,
        collection_name,
    }  = req.body  

    if(!collection_name)
    {
        return next(new AppError("collection_name is required",400))
    }

    if(!plugin_id)
    {
        return next(new AppError("plugin_id is required",400))
    }

    if(!organization_id)
    {
        return next (new AppError("organization_id is required",400))
    }
}



exports.insert = async(req,res,next)=>{
    const {
        collection_name,
        bulk_write,
        payload,
    }  = req.body  
    
    try{
        const db = await connectToMongo()

        if(bulk_write==true)
        {
            //an array is expected. If its not an array then return an error.
            if(!Array.isArray(payload))
            {
                return next(new AppError("Array is expected. Array not found",400))
            }
    
            
            const options = { ordered: true }
            const response = await db.collection(collection_name).insertMany(payload,options)
            return res.status(200).json(response)
    
        }

        else{
            //we're inserting only one document
            if(typeof(payload)!=="object" || Array.isArray(payload))
            {
                return next(new AppError("payload should be an object",400))
            }

            const doc = await db.collection(collection_name).insertOne(payload)
    
            return res.status(200).json(doc)
        }
    }
    
    catch (error) {
        return next(error)
    }
    
}


exports.update = async(req,res,next)=>{
    let {collection_name, payload, filter, bulk_write, object_id} = req.body

    try{
        const db = await connectToMongo()

        //if object id is defined then ignore all other filters and use only objectId
        filter = (object_id!==null && object_id!==undefined && object_id !=="") ? {_id:ObjectId(object_id)} : filter

        //if filter is null set it to an empty object
        filter = filter ? filter : {}

        if(bulk_write==true)
        {    
            
            const response = await db.collection(collection_name).updateMany(filter,payload)
            return res.status(200).json(response)
    
        }

        else{

            const doc = await db.collection(collection_name).updateOne(filter,payload)
    
            return res.status(200).json(doc)
        }
    }
    
    catch (error) {
        return next(error)
    }
}

exports.deleteDoc = async(req,res,next)=>{
    let {collection_name, filter, bulk_write, object_id} = req.body

    try{
        const db = await connectToMongo()

        //if object id is defined then ignore all other filters and use only objectId
        filter = (object_id!==null && object_id!==undefined && object_id !=="") ? {_id:ObjectId(object_id)} : filter

        //if filter is null set it to an empty object
        filter = filter ? filter : {}

        if(bulk_write==true)
        {    
            
            const response = await db.collection(collection_name).deleteMany(filter)
            return res.status(200).json(response)
    
        }

        else{

            const doc = await db.collection(collection_name).deleteOne(filter)
    
            return res.status(200).json(doc)
        }
    }
    
    catch (error) {
        return next(error)
    }

}