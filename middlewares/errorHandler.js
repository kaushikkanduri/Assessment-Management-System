
const {VALIDATION_ERROR, UNAUTHENTICATED_ERROR, FORBIDDEN_ERROR, NOTFOUND_ERROR,SERVER_ERROR} = require("../constants");
const errorHandler = (err,req,res,next)=>{
    let errorCode = res.statusCode ? res.statusCode:500

    if(errorCode === 200) errorCode=500;

    if(err.code === 11000){
        return res.json({
            title:"DUPLICATE_KEY_ERROR",
            field: err.keyValue,
            message:"Field already exists"
        })
    }

    if(errorCode)
    switch(errorCode){
        case VALIDATION_ERROR:
            return res.json({
                title:"VALIDATION_ERROR",
                message:err.message
            });

        case UNAUTHENTICATED_ERROR:
            return res.json({
                title:"UNAUTHENTICATED_ERROR",
                message:err.message
            });

        case FORBIDDEN_ERROR:
            return res.json({
                title:"FORBIDDEN_ERROR",
                message:err.message
            });

        case NOTFOUND_ERROR:
            return res.json({
                title:"NOTFOUND_ERROR",
                message:err.message
            });

        default: return res.json({
            title:"SERVER_ERROR",
            message:err.message,
            stackTrace:err.stackTrace
        });
    }
}

module.exports = errorHandler