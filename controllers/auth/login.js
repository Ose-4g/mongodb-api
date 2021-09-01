const jwt = require('jsonwebtoken')
const AppError = require('../../error/appError')
const {connectToMongo} = require('../../utils/connectToMongo')


module.exports =  async(req,res,next)=>{
    
    const {email,password} = req.body

    if(!email || !password)
    {
        return next(new AppError("email and password are required",400))
    }

    const db = await connectToMongo()
    const user = await db.collection("users").findOne({email})
    
    if(!user)
    {
        return next(new AppError("User not found",404))
    }

    if(user.password !== password)
    {
        return next(new AppError("Incorrect email address or password",400))
    }

    const accessToken =  jwt.sign(
        {_id:String(user._id)},
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_EXPIRES
        }
    )

    res.status(200).json({
        message:"Logged in successfully",
        accessToken
    })
}