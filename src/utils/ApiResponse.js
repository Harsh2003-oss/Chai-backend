class ApiResponse {
    constructor(statusCode,data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode<400
    }
}

module.exports = ApiResponse;


// Takes 3 parameters:

// statusCode - HTTP status code (like 200, 201, 404)
// data - the actual data you want to send
// message = "Success" - optional message (defaults to "Success" if not provided)

// this.statusCode = stores the status code
// this.data = stores your data
// this.message = stores the message
// this.success = statusCode < 400 = Smart! Automatically sets success to:

// true if statusCode is less than 400 (like 200, 201, 300)
// false if statusCode is 400 or higher (like 404, 500)