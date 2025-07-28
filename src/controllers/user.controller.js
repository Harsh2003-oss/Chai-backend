const asyncHandler = require ('../utils/asyncHandler.js') 
const ApiError = require('../utils/Apierror.js');
const User = require('../models/user.model.js')
const  uploadOnCloudinary = require('../utils/cloudinary.js')
const ApiResponse = require('../utils/ApiResponse.js')

const registerUser = asyncHandler( async (req,res)=>{
//Steps to check for user registration


//get user details from frontend
//validation - not empty
//check if user already exists: username,email
//check for images, check for avatar
//upload the to cloudinary,avatar
//create user object - create entry in db
//remove password and refresh token field from response
//check for user creation
//return res


const {fullName,email,username,password} = req.body

//console.log("email: ", email);

//validation
if(
    [fullName,username,email,password].some((field)=> //generally some is used to return boolean values
    field?.trim()=== "") //Here if field is present then trim it otherwise if it is empty then throw error
){
    throw new ApiError(400,"All fields are required")
}

//Here we imported user form usermodel it will connect to database through mongoose
const existedUser = await User.findOne({
    $or: [{ username } , { email }] //This is a MongoDB operator that means "OR" - it will find a user if EITHER condition is true
})


if(existedUser){
    throw new ApiError(409,"User with email or username already exists")
}

const avatarLocalPath = req.files?.avatar[0]?.path;
// req.files - This contains all uploaded files from the form
// ?.avatar - Safely check if there's an "avatar" field in the files
// [0] - Get the first file (since avatar might have multiple files, we want the first one)
// ?.path - Safely get the path where the file is stored on the server

 
if(!avatarLocalPath){
    throw new ApiError(400,"Avataar file is required")
}

const avatar =await uploadOnCloudinary(avatarLocalPath)
if(!avatar){
    throw new ApiError(400,"Avataar file is required")
}


let coverImage = null;
const coverImageLocalPath = req.files?.coverImage?.[0]?.path;


if(coverImageLocalPath){
    coverImage = await uploadOnCloudinary(coverImageLocalPath);
}

 //Here we are creating user wiith these fields
const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
})

//Here we are checking the user by the find by ._id  by deselecting password and refresh token
const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
)

//Here we are checking if the user is not created throw these error
if(!createdUser){
    throw new ApiError(500,  "Something went wron gwhile registering  ")
}

//This sends a successful response back to the client after creating a user.
return res.status(201).json(
    new ApiResponse(200, createdUser , "User registerd successfully")
)

})


module.exports = registerUser;