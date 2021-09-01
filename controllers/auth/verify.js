const jwt = require('jsonwebtoken')
const AppError = require('../../error/appError')
const {connectToMongo} = require('../../utils/connectToMongo')
const ObjectId = require('mongodb').ObjectId


module.exports =  async(req,res,next)=>{
    
    const token = req.params.token

    if(!token)
    {
        return next(new AppError("Token is required",400))
    }


    const db = await connectToMongo()

    jwt.verify(token,process.env.JWT_SECRET,async(err,decoded)=>{
        try 
        {
            if(err)
            {
                return next(new AppError("Invalid or expired token",400))
            }

            const {_id} = decoded
            console.log(_id)

            const user = await db.collection('users').findOne({_id:ObjectId(_id)})

            console.log(user)

            if(!user)
            {
                return next(new AppError("user not found",404))
            }

            return res.status(200).json({
                message:"Token verification successful",
                user
            })
        } 
        catch (error) 
        {
            return next(new AppError("Invalid or expired token",400))
        }
        
    })

}