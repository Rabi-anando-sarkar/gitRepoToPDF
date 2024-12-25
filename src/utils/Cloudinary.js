import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import path from 'path';
import { ApiError } from './ApiError.js';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;

        const files = await fs.promises.readdir(localFilePath);

        for(const file of files) {
            const filePath = path.join(localFilePath, file)

            const stats = await fs.promises.stat(filePath)

            if(stats.isFile()) {
                try {
                    const response = await cloudinary.uploader.upload(filePath, {
        
                        folder: process.env.CLOUDINARY_BASE_FOLDER
                    })
                    console.log(`:: Uploaded local PDF file ::`);
    
                    await fs.promises.unlink(filePath)
                    console.log(`:: Deleted local PDF file ::`);
            
                    return response
                } catch (error) {
                    throw new ApiError(
                        400,
                        `Error uploading or deleting file: ${filePath}`
                    )
                }
            }
        }
    } catch (error) {
        console.log(`Error ::=> ${error}`);
        
        return null
    }
}

export { uploadOnCloudinary }