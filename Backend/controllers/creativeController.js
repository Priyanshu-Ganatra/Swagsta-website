import jwt from 'jsonwebtoken'; 
import Creative from "../models/creativeModel.js";
import CreativeComment from "../models/creativeCommentModel.js";
import { uploadImageToCloudinary, uploadVideoToCloudinary } from "../utils/uploadToCloudinary.js";

async function uploadMedia(mediaUrl) {
    // Extract the MIME type from the data URL
    const mimeType = mediaUrl.split(';')[0];

    // Check if it's a video
    if (mimeType.startsWith('data:video/')) {
        let video = await uploadVideoToCloudinary(
            mediaUrl,
            process.env.FOLDER_NAME
        )
        return video.secure_url;
    }
    else {
        let image = await uploadImageToCloudinary(
            mediaUrl,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        return image.secure_url;
    }
}

export const addCreative = async (req, res) => {
    try {
        let { name, profession, title, description, software, tags, profilePicture, coverImage, otherMedia } = req.body;

        if (tags.length === 0 || software.length === 0 || otherMedia.length === 0 || !name || !profession || !title || !description || !profilePicture || !coverImage) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // make each software lowercase
        for (let i = 0; i < software.length; i++) {
            software[i] = software[i].toLowerCase();
        }

        let creatorProfilePic
        let coverImg
        try {
            creatorProfilePic = await uploadMedia(profilePicture)
            coverImg = await uploadMedia(coverImage)

            for (let i = 0; i < otherMedia.length; i++) {
                otherMedia[i] = await uploadMedia(otherMedia[i]);
            }
        } catch (error) {
            console.log(error)
        }

        const newCreative = new Creative({
            creatorName: name,
            creatorProfession: profession,
            creatorProfilePic,
            title,
            description,
            softwareUsed: software,
            coverImg,
            otherMedia,
            tags
        });

        await newCreative.save();
        res.status(201).json({ message: "Creative added successfully", success: true });
    } catch (error) {
        console.log("Error in addCreative controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const likeCreative = async (req, res) => {
    try {

    } catch (error) {
        console.log("Error in likeCreative controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAllCreatives = async (req, res) => {
    try {
        const creatives = await Creative.find();
        res.status(200).json(creatives);
    } catch (error) {
        console.log("Error in getAllCreatives controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getCreative = async (req, res) => {
    try {
        const { id } = req.params;
        let creative = await Creative.findById(id).populate({
            path: "comments",
            populate: {
                path: "userId",
                model: "User",
            }
        });

        if (!creative) {
            return res.status(404).json({ message: "Creative not found" });
        }

        creative.views += 1;
        creative = await creative.save();
        res.status(200).json(creative);
    } catch (error) {
        console.log("Error in getCreative controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Please login to comment" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { uid } = decoded;

        const comment = {
            text,
            userId: uid,
            creativeId: id
        };

        // Create the comment
        const newComment = await CreativeComment.create(comment);

        // Update the Creative document to include the new comment
        await Creative.findByIdAndUpdate(
            id,
            { $push: { comments: newComment._id } },
            { new: true }
        );

        res.status(201).json({
            message: "Comment added successfully",
            success: true,
        });
    } catch (error) {
        console.log("Error in addComment controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateCreative = async (req, res) => {
    try {

    } catch (error) {
        console.log("Error in updateCreative controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteCreative = async (req, res) => {
    try {

    } catch (error) {
        console.log("Error in deleteCreative controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}