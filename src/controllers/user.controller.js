import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'

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

    // if(fullName == "") {
    //     throw new ApiError(400, "fullname is required");
    // }

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

    User.create({
        fullName,
        avatar:avatar.url,
        coverImage: coverImage?.url || "",
    
     })
})


export {registerUser}