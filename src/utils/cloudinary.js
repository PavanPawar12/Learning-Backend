// import {vs as cloudinary} from 'cloudinary'
// import fs from 'fs' // fs: file system 

// cloudinary.config({ 
//         cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
//         api_key: process.env.CLOUDINARY_API_KEY, 
//         api_secret:process.env.CLOUDINARY_API_SECRET 
//     });

// const uploadOnCloudinary = async (localFilePath) =>{
//     try {
//         if(!localFilePath) return null
//         // upload the file on cloudinary
//         const response = await cloudinary.uploader.upload(localFilePath,{
//             resource_type:"auto"
//         })
//         // file had been uploaded successfull
//         console.log("file is uploaded on cloudinary", response.url);
//         return response;
//     } catch (error) {
//         fs.unlinkSync(localFilePath)// remove the localy saved temporary file as the upload operation got gailed 
//     }
// }

// export {uploadOnCloudinary}

// import { v2 as cloudinary } from 'cloudinary';
// import fs from 'fs'; // fs: file system 

// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET 
// });

// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null;

//         // Upload the file on cloudinary
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"
//         });

//         console.log("File is uploaded on cloudinary:", response.url);
//         return response;

//     } catch (error) {
//         // Remove the locally saved temporary file if upload failed
//         fs.unlinkSync(localFilePath);
//         console.error("Cloudinary upload failed:", error);
//         return null;
//     }
// }

// export { uploadOnCloudinary };



// Import cloudinary library
import { v2 as cloudinary } from "cloudinary";
// Import file system (to delete files if needed)
import fs from "fs";

// Connect cloudinary with your account (using environment variables)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // your cloud name
  api_key: process.env.CLOUDINARY_API_KEY,        // your API key
  api_secret: process.env.CLOUDINARY_API_SECRET,  // your API secret
});

// Function to upload file on cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    // If no file path is provided, return nothing
    if (!localFilePath) {
      return null;
    }

    // Upload file to cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // auto = detects image, video, etc
    });

    console.log("✅ File uploaded to Cloudinary:", response.url);

    // return the full response from cloudinary (contains url, id, etc.)
    return response;

  } catch (error) {
    // If upload fails, delete the file from local storage
    fs.unlinkSync(localFilePath);

    console.error("❌ Upload failed:", error);
    return null;
  }
};

// Export the function so we can use it in other files
export { uploadOnCloudinary };
