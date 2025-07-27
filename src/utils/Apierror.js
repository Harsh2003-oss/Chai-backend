class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        error= [],
        statck=""
    ){
        super(message)
        this.statusCode=statusCode
        this.data = null
        this.message=false
        this.errors = errors
        
        if(statck){
            this.stack = stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}


module.exports = ApiError