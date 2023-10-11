import { v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

export async function uploadToCloudinary(file,options){
    try {
        const result = await cloudinary.uploader.upload(file,options)
        console.log('files uploaded successfully')
        return result.secure_url
    } catch (error) {
        console.log(error.message)
    }
}