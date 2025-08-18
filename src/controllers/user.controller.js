/*
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res)=>{
   // get user details from backend
   // validation - not empty
   // check if user already exits: username, email 
   // check for images, check for avtar
   // upload them to cloudinary, avatar
   // create user object - create antry in db
   // remove password and refresh token field from response
   // check for user creation 
   // return res


    const {fullName, email, username, password} = req.body
    console.log("email: ",email);


    if(
        [fullName, email, username, password].some((field)=>
        field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or:[{ username }, { email }]
    })
    if(existedUser){
        throw new ApiError(409, "User with email or username are already exists ")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocation = req.files?.coverImage[0]?.path;
  
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is reqired")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocation)

    if(!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    const User = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
     })

    const ceratedUser = await User.findById(username._id).select(
        "-password -refreshToken"
    )

    if(!ceratedUser){
        throw new ApiError (500, "Something went wrong while user registration ")
    }

    return res.status(201).json(
        new ApiResponse(200,ceratedUser, "User registered Successfully")
    )

    
})


export {registerUser}   
*/ 
// Above code is not for biginner ok 
//------------------------------Beginner-Friendly registerUser Code----------------------

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ================================
// REGISTER USER CONTROLLER
// ================================
const registerUser = asyncHandler(async (req, res) => {
    // 1. Get user details from request body
    const { fullName, email, username, password } = req.body;
    console.log("email: ", email);

    // 2. Check if any field is empty
    if (!fullName || !email || !username || !password) {
        throw new ApiError(400, "All fields (fullName, email, username, password) are required");
    }

    // 3. Check if user already exists (by email or username)
    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with this email or username already exists");
    }

    // 4. Get uploaded files (avatar is required, cover image optional)
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar image is required");
    }

    // 5. Upload images to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar upload failed");
    }

    // 6. Create new user in MongoDB
    const newUser = await User.create({
        fullName,
        email,
        username: username.toLowerCase(), // store username in lowercase
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || "" // optional
    });

    // 7. Remove sensitive data (password, refreshToken) before sending response
    const createdUser = await User.findById(newUser._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // 8. Send success response
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    );
});

export { registerUser };
