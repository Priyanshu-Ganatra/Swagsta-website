import AboutUs from "../models/aboutUsModel.js";
import { uploadImageToCloudinary } from '../utils/uploadToCloudinary.js';

export const getData = async (req, res) => {
    try {
        const data = await AboutUs.findOne();
        res.status(200).json(data === null ? { message: "No data found" } : data);
    } catch (error) {
        console.log("Error in getData controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateData = async (req, res) => {
    try {
        let { text, socials, img, removeImg } = req.body;

        if (!text || !socials.length || !img) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        // if any social link is empty, remove it from socials
        socials = socials.filter(social => social.name && social.link);

        const data = await AboutUs.findOne();
        data.text = text;

        if (data.img && removeImg) {
            // console.log('removing image from db')
            data.img = '';
        }

        data.socials = socials;

        if (img) {
            // console.log('uploaded image', img);
            const image = await uploadImageToCloudinary(
                img,
                process.env.FOLDER_NAME,
                1000,
                1000
            )
            // console.log('image uploaded to cloudinary', image);
            data.img = image.secure_url;
        }

        await data.save();
        res.status(200).json({ message: "Data updated successfully", data });
    } catch (error) {
        console.log("Error in updateData controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const uploadData = async (req, res) => {
    try {
        let { text, socials } = req.body;
        socials = JSON.parse(socials);

        const data = await AboutUs.findOne();
        if (data) {
            return res.status(400).json({ message: "Data already exists. Use update route" });
        }

        if (req.files) {
            const { img } = req.files;
            // console.log('uploaded image', img);
            const image = await uploadImageToCloudinary(
                img,
                process.env.FOLDER_NAME,
                1000,
                1000
            )
            // console.log('image uploaded to cloudinary', image);
            const newData = new AboutUs({ text, socials, img: image.secure_url });
            await newData.save();
            return res.status(201).json({ message: "Data uploaded successfully", data: newData });
        }

        const newData = new AboutUs({ text, socials });
        await newData.save();
        res.status(201).json({ message: "Data uploaded successfully", data: newData });
    } catch (error) {
        console.log("Error in uploadData controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}