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
    // console.log("OPTIONS", options)
    return await cloudinary.uploader.upload(file, options)
}