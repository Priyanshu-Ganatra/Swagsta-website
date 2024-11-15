import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { deleteProject as deleteProjectApi } from "../src/apis/caseStudiesApi";

export default function useDeleteCaseStudyProject() {
    const [isDeletingCaseStudyProject, setIsDeletingCaseStudyProject] = useState(false)

    const deleteCaseStudyProject = async (id) => {
        setIsDeletingCaseStudyProject(true)
        try {
            return await deleteProjectApi(id)
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setIsDeletingCaseStudyProject(false)
        }
    }

    return { isDeletingCaseStudyProject, deleteCaseStudyProject }
}