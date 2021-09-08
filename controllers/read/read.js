const AppError = require('../../error/appError')
const {connectToMongo} = require('../../utils/connectToMongo')
const {ObjectId} = require('mongodb')

module.exports = async(req,res,next)=>{
    const {collection_name,plugin_id,organization_id} = req.params
    console.log(collection_name)

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

    try{
        const db = await connectToMongo()

        let filter = {...req.query}

        if (filter && filter._id)
        {
            const oid = new ObjectId(filter._id)
            delete filter._id
            filter = {_id: oid, ... filter}
            console.log(filter)
        }
    
        filter = filter ? filter : {}
        
        const data = await db.collection(collection_name).find(filter).toArray()

        return res.status(200).json({
            status:"success",
            data
        })
    }
    catch(err)
    {
        return next(err)
    }


}