/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import ImageUpload from "./ImageUpload"
import useAddCaseStudyProject from "../../../../hooks/useAddCaseStudyProject"
import useUpdateCaseStudyProject from "../../../../hooks/useUpdateCaseStudyProject"


export default function CaseStudyForm({ projectToEdit, setProjectToUpdate, projects, setProjects }) {
    const { isAdding, addCaseStudyProject } = useAddCaseStudyProject()
    const { isUpdating, updateCaseStudyProject } = useUpdateCaseStudyProject()

    const [formData, setFormData] = useState({
        projectName: '',
        shortDescription: '',
        clientName: '',
        clientIntroduction: '',
        primaryImage: null,
        secondaryImage: null
    })

    useEffect(() => {
        if (projectToEdit) {
            // get the project to edit from the projects array
            const project = projects.find(project => project._id === projectToEdit)
            setFormData({
                projectName: project.title,
                shortDescription: project.description,
                clientName: project.clientName,
                clientIntroduction: project.clientIntro,
                primaryImage: project.primaryImg,
                secondaryImage: project.secondaryImg
            })
        }
    }, [projectToEdit, projects]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await addCaseStudyProject(formData)

        // Reset form after submission if successful
        if (res) {
            setFormData({
                projectName: '',
                shortDescription: '',
                clientName: '',
                clientIntroduction: '',
                primaryImage: null,
                secondaryImage: null
            })
        }

        if (res.addedProject) {
            setProjects([...projects, res.addedProject])
        }
    }
    
    const handleEdit = async (e) => {
        e.preventDefault()
        const res = await updateCaseStudyProject(projectToEdit, formData)
        console.log(res.updatedProject);
        
        if (res.updatedProject) {            
            setProjects(projects.map(project => project._id === projectToEdit ? res.updatedProject : project))
            setFormData({
                projectName: '',
                shortDescription: '',
                clientName: '',
                clientIntroduction: '',
                primaryImage: null,
                secondaryImage: null
            })
            setProjectToUpdate(null);
        }
    }

    const cancelEdit = (e) => {
        e.preventDefault()
        setProjectToUpdate(null)
        setFormData({
            projectName: '',
            shortDescription: '',
            clientName: '',
            clientIntroduction: '',
            primaryImage: null,
            secondaryImage: null
        })
    }

    return (
        <form onSubmit={handleSubmit} id="caseStudyForm" className="space-y-8 max-w-2xl mx-auto p-6">
            <h1 className="text-2xl text-center">{
                projectToEdit
                    ? 'Editing Project'
                    : 'Add New Project'
            }
            </h1>

            <div className="space-y-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                    id="projectName"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    placeholder="Enter project name"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Textarea
                    id="shortDescription"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    placeholder="Enter a short description"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                    id="clientName"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    placeholder="Enter client name"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="clientIntroduction">Client Introduction</Label>
                <Textarea
                    id="clientIntroduction"
                    name="clientIntroduction"
                    value={formData.clientIntroduction}
                    onChange={handleChange}
                    placeholder="Enter client introduction"
                />
            </div>

            <ImageUpload id="primaryImage" image={formData.primaryImage} setFormData={setFormData} />

            <ImageUpload id="secondaryImage" image={formData.secondaryImage} setFormData={setFormData} />

            {
                projectToEdit
                    ? <span className="flex flex-col gap-3">
                        <Button onClick={handleEdit} disabled={isUpdating} className="w-full disabled:cursor-not-allowed">
                            {isUpdating ? 'Updating Project...' : 'Update Project'}
                        </Button>
                        <Button onClick={cancelEdit} disabled={isUpdating} variant="outline" className="w-full disabled:cursor-not-allowed">
                            Cancel Edit
                        </Button>
                    </span>
                    : <Button type="submit" disabled={isAdding} className="w-full disabled:cursor-not-allowed">
                        {isAdding ? 'Adding Project...' : 'Add Project'}
                    </Button>
            }
        </form>
    )
}