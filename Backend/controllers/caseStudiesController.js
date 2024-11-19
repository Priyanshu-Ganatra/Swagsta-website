import CaseStudies from '../models/caseStudiesModel.js'
import { uploadImageToCloudinary } from '../utils/uploadToCloudinary.js';

export const getAllProjects = async (req, res) => {
    try {
        const projects = await CaseStudies.find()
        res.status(200).json(projects)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getProject = async (req, res) => {
    const { id } = req.params

    try {
        const project = await CaseStudies.findById(id)

        if (!project) {
            return res.status(404).json({ message: "Project not found" })
        }

        res.status(200).json(project)
    }
    catch (error) {
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

        const addedProject = await newProject.save()
        res.status(201).json({ message: "Project added", addedProject })
    } catch (error) {
        console.log("Error in addProject controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateProject = async (req, res) => {
    const { id } = req.params
    const { projectName, shortDescription, clientName, clientIntroduction, primaryImage, secondaryImage } = req.body

    if (!projectName || !shortDescription || !clientName || !clientIntroduction || !primaryImage || !secondaryImage) {
        return res.status(400).json({ message: "Please fill all fields" })
    }

    try {
        const project = await CaseStudies.findById(id)

        if (!project) {
            return res.status(404).json({ message: "Project not found" })
        }

        project.title = projectName
        project.description = shortDescription
        project.clientName = clientName
        project.clientIntro = clientIntroduction

        if (!primaryImage.includes("cloudinary")) {
            const primaryImg = await uploadImageToCloudinary(
                primaryImage,
                process.env.FOLDER_NAME,
                1000,
                1000
            )
            project.primaryImg = primaryImg.secure_url
        }

        if (!secondaryImage.includes("cloudinary")) {
            const secondaryImg = await uploadImageToCloudinary(
                secondaryImage,
                process.env.FOLDER_NAME,
                1000,
                1000
            )
            project.secondaryImg = secondaryImg.secure_url
        }

        const updatedProject = await project.save()
        
        res.status(200).json({ message: "Project updated", updatedProject: updatedProject })
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const deleteProject = async (req, res) => {
    const { id } = req.params

    try {
        if (!id) {
            return res.status(400).json({ message: "Please provide an id", success: false })
        }

        const deletedCaseStudyProject = await CaseStudies.findByIdAndDelete(id)
        if (!deletedCaseStudyProject) {
            return res.status(404).json({ message: "Project not found", success: false })
        }

        res.status(200).json({ message: "Project deleted", success: true })
    }
    catch (error) {
        res.status(404).json({ message: error.message, success: false })
    }
}