const environment = process.env.NODE_ENV

module.exports = (err,req,res,next)=>{
    const data = {
        status:"error",
        message: err.message,
    }
    if(environment==="development")
    {
        data.error = err.stack
    }
    res.status(err.statusCode).json(data)
}