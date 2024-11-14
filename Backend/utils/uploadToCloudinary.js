import { v2 as cloudinary } from "cloudinary"

export async function uploadImageToCloudinary(file, folder, height, quality) {
    const options = { folder }
    // console.log(file)
    if (height) {
        options.height = height
    }
    if (quality) {
        options.quality = quality
    }
    options.resource_type = "auto"
    return await cloudinary.uploader.upload(file, options)
}

export async function uploadVideoToCloudinary(file, folder) {
    const options = { folder }
    // console.log(file)
    options.resource_type = "auto"
    return await cloudinary.uploader.upload(file, options)
}