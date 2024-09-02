import { v2 as cloudinary } from "cloudinary"; //! Cloudinary is being required

export function cloudinaryConnect() {
	try {
		cloudinary.config({
			// Configuring the Cloudinary to Upload MEDIA
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET,
		});
		console.log("Cloudinary connection configured successfully");
	} catch (error) {
		console.log(error);
	}
}
