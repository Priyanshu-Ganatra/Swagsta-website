import CaseStudies from '../models/caseStudiesModel.js'
import { uploadImageToCloudinary } from '../utils/imageUploader.js';

export const getAllProjects = async (req, res) => {
    try {
        const projects = await CaseStudies.find()
        res.status(200).json(projects)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const addProject = async (req, res) => {
    const { projectName, shortDescription, clientName, clientIntroduction, primaryImage, secondaryImage } = req.body

    if (!projectName || !shortDescription || !clientName || !clientIntroduction || !primaryImage || !secondaryImage) {
        return res.status(400).json({ message: "Please fill all fields" })
    }

    try {
        const newProject = new CaseStudies({
            title: projectName,
            description: shortDescription,
            clientName,
            clientIntro: clientIntroduction,
        })

        const primaryImg = await uploadImageToCloudinary(
            primaryImage,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        newProject.primaryImg = primaryImg.secure_url

        const secondaryImg = await uploadImageToCloudinary(
            secondaryImage,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        newProject.secondaryImg = secondaryImg.secure_url

        await newProject.save()
        res.status(201).json({ message: "Project added" })
    } catch (error) {
        console.log("Error in addProject controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}