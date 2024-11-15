/* eslint-disable react/prop-types */
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import ImageUpload from "./ImageUpload"
import useAddCaseStudyProject from "../../../../hooks/useAddCaseStudyProject"

export default function CaseStudyForm({ projects, setProjects }) {
    const { isAdding, addCaseStudyProject } = useAddCaseStudyProject()

    const [formData, setFormData] = useState({
        projectName: '',
        shortDescription: '',
        clientName: '',
        clientIntroduction: '',
        primaryImage: null,
        secondaryImage: null
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await addCaseStudyProject(formData)

        // Reset form after submission if successful
        if (data) {
            setFormData({
                projectName: '',
                shortDescription: '',
                clientName: '',
                clientIntroduction: '',
                primaryImage: null,
                secondaryImage: null
            })
        }

        if (data.addedProject)  {
            setProjects([...projects, data.addedProject])
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-6">
            <h1 className="text-2xl text-center mb-6">Add a project</h1>

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

            <Button type="submit" disabled={isAdding} className="w-full">
                {isAdding ? 'Adding Project...' : 'Add Project'}
            </Button>
        </form>
    )
}