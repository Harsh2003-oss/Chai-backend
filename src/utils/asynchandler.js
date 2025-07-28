// What Problem Does This Solve?
// In Express.js, when you have async functions (functions that use await),
//  you need to handle errors properly. Without this utility, 
// you'd write a lot of repetitive try-catch blocks.


const asyncHandler = (requestHandler) => {
  return  (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch
        ((err) => next(err))
    }
}  

module.exports = asyncHandler;


// What happens if there's an error:

// Database connection fails, or user not found
// An error is thrown
// asyncHandler catches it automatically
// Passes it to Express error handler via next(err)
// Your error middleware handles it (shows 500 error, logs it, etc.)

// Think of it like this:
// asyncHandler is like a safety net that catches any errors in your async functions and properly hands them over to Express's error handling system.
// Without it, if an error occurs in an async function, your app might crash or hang because Express doesn't know how to handle unresolved promises automatically.
// This is a very common pattern in Express applications - you'll see it used everywhere!