import { v2 as cloudinary } from 'cloudinary';
import { response } from 'express';
import fs from 'fs';

// Cloudinary configuration
    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath){
            return null;
        }
        const response = await cloudinary.uploader.upload(localFilePath,{resource_type: "auto"});
    
    console.log("File uploaded successfully on cloudinary",response.url);
    return response;
    }
    catch (error) {
        fs.unlinkSync(localFilePath)//remove the locally saved temp file as the upload operation got failed
        console.error(error);
        return null;
    }

}

export {uploadOnCloudinary};

