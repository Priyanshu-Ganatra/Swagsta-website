import jwt from 'jsonwebtoken'; 
import Project from "../models/projectModel.js";
import ProjectComment from "../models/projectCommentModel.js";
import { uploadImageToCloudinary } from "../utils/uploadToCloudinary.js";

const uploadImages = async (images, folderName, width, height) => {
    const uploadedImages = images.map(async (image) => await uploadImageToCloudinary(image, folderName, width, height));

    return Promise.all(uploadedImages);
}

export const addProject = async (req, res) => {
    try {
        const { title, technicalDetails, price, credits, storyline, category, isFeatured, coverImage, otherImages } = req.body;

        console.log(req.body);

        if (!title || !technicalDetails || !price || !credits.length || !storyline || !category) {
            return res.status(400).json({ message: "Please fill all fields", success: true });
        }

        if (!coverImage || !otherImages.length) {
            return res.status(400).json({ message: "Please upload all images", success: true });
        }

        const uploadedCoverImg = await uploadImageToCloudinary(
            coverImage,
            process.env.FOLDER_NAME,
            1000,
            1000
        );

        const uploadedOtherImages = await uploadImages(otherImages, process.env.FOLDER_NAME, 1000, 1000)

        const dataToStore = {
            title,
            techDetails: technicalDetails,
            price,
            credits,
            storyLine: storyline,
            featured: isFeatured,
            coverImg: uploadedCoverImg.secure_url,
            otherImages: uploadedOtherImages.map((image) => image.secure_url),
            category
        }

        const newProject = new Project(dataToStore);

        await newProject.save();

        res.status(201).json({ message: "Project added successfully", success: true });
    } catch (error) {
        console.log("Error in addProject controller", error.message);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

export const likeProject = async (req, res) => {
    try {
        const { userId, projectId } = req.body;

        if (!userId || !projectId) {
            return res.status(400).json({ message: "Please provide userId and projectId" });
        }

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const isLiked = project.likedBy.includes(userId);

        if (isLiked) {
            project.likedBy = project.likedBy.filter((id) => id.toString() !== userId);
        } else {
            project.likedBy.push(userId);
        }

        await project.save();

        res.status(200).json({ message: "Project liked successfully", project });
    } catch (error) {
        console.log("Error in likeProject controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();

        res.status(200).json(projects);
    } catch (error) {
        console.log("Error in getAllProjects controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findById(id).populate({
            path: "comments",
            populate: {
                path: "userId",
                model: "User",
            }
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json(project);
    }
    catch (error) {
        console.log("Error in getProject controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Please login to comment", success: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { uid } = decoded;

        const comment = {
            text,
            userId: uid,
            projectId: id
        };

        // Create the comment
        const newComment = await ProjectComment.create(comment);

        // Add the comment to the project
        await Project.findByIdAndUpdate(
            id,
            { $push: { comments: newComment._id } },
            { new: true }
        );

        res.status(201).json({ message: "Comment added successfully", success: true });
    } catch (error) {
        console.log("Error in addComment controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, likes, price, credits, techDetails, coverImg, category, featured, storyLine, otherImages } = req.body;

        const parsedOtherImages = JSON.parse(otherImages);
        const parsedCredits = JSON.parse(credits);

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ message: "project not found" });
        }

        project.title = title;
        project.likes = likes;
        project.price = price;
        project.credits = parsedCredits;
        project.techDetails = techDetails;
        project.coverImg = coverImg;
        project.category = category;
        project.featured = featured;
        project.storyLine = storyLine;
        project.otherImages = parsedOtherImages;

        await project.save();

        res.status(200).json({ message: "Project updated successfully" });
    } catch (error) {
        console.log("Error in updateProject controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        await project.remove();

        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        console.log("Error in deleteProject controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}